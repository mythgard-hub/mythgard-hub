import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import {
  deckFeaturedQuery,
  deleteFeaturedDeckMutation,
  addFeaturedDeckMutation
} from '../lib/deck-queries.js';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function moderatorFeaturedDecksEditor() {
  const { loading, error, data } = useQuery(deckFeaturedQuery);
  const [newFeaturedDeckId, setNewFeaturedDeckId] = useState(-1);
  const onChangeNewFeaturedDeckId = handleInputChangeHooks(
    setNewFeaturedDeckId
  );

  if (error) {
    return 'error loading top decks';
  }

  if (loading) {
    return 'loading...';
  }

  const deckFeatureds = data.deckFeatureds.nodes;

  const [deleteFeaturedDeck] = useMutation(deleteFeaturedDeckMutation, {
    update(cache, mutationResponse) {
      const { deckFeatured } = mutationResponse.data.deleteDeckFeatured;
      const {
        deckFeatureds: { nodes }
      } = cache.readQuery({ query: deckFeaturedQuery });
      const newNodes = nodes.filter(node => node.id !== deckFeatured.id);

      cache.writeQuery({
        query: deckFeaturedQuery,
        data: {
          deckFeatureds: {
            nodes: newNodes,
            __typename: 'DeckFeaturedsConnection'
          }
        }
      });
    },
    onError() {
      alert('Delete featured deck failed. Please check values and try again');
    }
  });

  const deleteDeckFeaturedById = id => {
    const variables = { id };
    deleteFeaturedDeck({ variables });
  };

  const [addFeaturedDeck] = useMutation(addFeaturedDeckMutation, {
    update(cache, mutationResponse) {
      const { deckFeatured } = mutationResponse.data.createDeckFeatured;
      const {
        deckFeatureds: { nodes }
      } = cache.readQuery({ query: deckFeaturedQuery });
      const newNodes = nodes.concat({
        ...deckFeatured,
        __typename: 'deckFeatured'
      });
      cache.writeQuery({
        query: deckFeaturedQuery,
        data: {
          deckFeatureds: {
            nodes: newNodes,
            __typename: 'DeckFeaturedsConnection'
          }
        }
      });
    },
    onError() {
      alert(
        'Add featured deck failed. Please check values and try again (must be integer, and not a duplicate)'
      );
    }
  });

  const addFeaturedDeckByDeckId = deckId => {
    const variables = { deckId: parseInt(deckId) };
    if (variables.deckId < 1 || isNaN(variables.deckId)) {
      alert('Please enter an integer for new featured deck id');
      return;
    }
    addFeaturedDeck({ variables });
  };

  return (
    <div>
      <h1>Edit Featured Decks</h1>

      {deckFeatureds.map((df, index) => {
        return (
          <div key={index}>
            <label>
              deck Id: {df.deckId}{' '}
              <button
                style={{ width: 100 }}
                onClick={() => deleteDeckFeaturedById(df.id)}
              >
                Delete
              </button>
            </label>
          </div>
        );
      })}
      <label>
        new deck Id:{' '}
        <input
          type="text"
          value={newFeaturedDeckId}
          onChange={onChangeNewFeaturedDeckId}
        />
        <button
          style={{ width: 100 }}
          onClick={() => addFeaturedDeckByDeckId(newFeaturedDeckId)}
        >
          Save
        </button>
      </label>
    </div>
  );
}

moderatorFeaturedDecksEditor.defaultProps = {};

moderatorFeaturedDecksEditor.propTypes = {};

export default moderatorFeaturedDecksEditor;
