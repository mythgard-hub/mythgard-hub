import PropTypes from 'prop-types';
import { useCallback, useContext, useState } from 'react';
import favoriteDeckMutation from '../lib/mutations/deck-favorite';
import removeDeckFavoriteMutation from '../lib/mutations/deck-remove-favorite';
import UserContext from './user-context';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ErrorMessage from './error-message.js';
import { ThemeContext } from './theme-context';
import Router from 'next/router';

const deckFavoriteQuery = gql`
  query deckAccountFavorites($deckId: Int!, $accountId: Int!) {
    deckFavorites(
      filter: {
        deckId: { equalTo: $deckId }
        accountId: { equalTo: $accountId }
      }
    ) {
      nodes {
        id
        __typename
      }
      __typename
    }
  }
`;

const cacheFavorite = (cache, id, deckId, accountId) => {
  const nodes = id ? [{ id, __typename: 'DeckFavorite' }] : [];
  cache.writeQuery({
    query: deckFavoriteQuery,
    variables: { deckId, accountId },
    data: { deckFavorites: { nodes, __typename: 'DeckFavoritesConnection' } }
  });
};

const favoriteError = 'Error changing favorite status';
const iconUrl = `${process.env.MG_CDN}/icons/favorite.png`;

function DeckFavorite({ deck, className }) {
  const { user } = useContext(UserContext);
  const [favoriteDeck, favoriteDeckState] = useMutation(favoriteDeckMutation, {
    update(cache, { data }) {
      cacheFavorite(
        cache,
        data.createDeckFavorite.deckFavorite.id,
        deck.id,
        user.id
      );
    }
  });
  const [undoDeckFavorite, undoFavoriteDeckState] = useMutation(
    removeDeckFavoriteMutation,
    {
      update(cache) {
        cacheFavorite(cache, 0, deck.id, user.id);
      }
    }
  );
  const { data } = useQuery(deckFavoriteQuery, {
    variables: {
      deckId: deck.id,
      accountId: user && user.id
    }
  });
  const userMarkedDeckAsFavorite =
    data &&
    data.deckFavorites &&
    data.deckFavorites.nodes &&
    data.deckFavorites.nodes[0];
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFavorite = useCallback(async () => {
    if (!user) {
      Router.push(`/auth/google`);
      return;
    }
    let resp;
    try {
      resp = await favoriteDeck({
        variables: {
          deckId: deck.id,
          accountId: user.id
        }
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    }
    if (!resp) {
      setErrorMessage(favoriteError);
    }
  });

  const handleRemoveFavorite = useCallback(async () => {
    let resp;
    try {
      resp = await undoDeckFavorite({
        variables: { deckFavoriteId: userMarkedDeckAsFavorite.id }
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    }
    if (!resp) {
      setErrorMessage(favoriteError);
    }
  });

  const isAuthor = user && deck.author && user.id === deck.author.id;
  const favoriteDisabled =
    favoriteDeckState.loading || undoFavoriteDeckState.loading;
  const theme = useContext(ThemeContext);

  return (
    <div className={`deck-favorite-container ${className}`}>
      <style jsx>{`
        vertical-align: top;
        .favorite-button {
          padding: 0;
          border: none;
          margin: 0;
          display: inline-block;
          background-color: transparent;
          color: yellow;
          opacity: 0.5;
          outline: none;
          margin-top: -5px;
        }
        .favorite-button:hover {
          filter: ${theme.hoverGlow};
        }
        .favorite-button img {
          height: 35px;
          margin-top: 7px;
        }
        .marked-favorite {
          opacity: 1;
        }
      `}</style>
      {!isAuthor && (
        <button
          title={userMarkedDeckAsFavorite ? 'Remove favorite' : 'Favorite deck'}
          data-cy="favoriteDeckButton"
          disabled={favoriteDisabled}
          onClick={
            userMarkedDeckAsFavorite ? handleRemoveFavorite : handleFavorite
          }
          className={`favorite-button ${
            userMarkedDeckAsFavorite ? 'marked-favorite' : ''
          }`}
        >
          <img alt="Favorite Icon" src={iconUrl} />
        </button>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}

DeckFavorite.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired
};

export default DeckFavorite;
