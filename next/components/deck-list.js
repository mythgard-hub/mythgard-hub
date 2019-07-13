import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Link from 'next/link';

export const allDecksQuery = gql`
  query allDecks {
    allDecks {
      nodes {
        id
        name
      }
    }
  }
`;

export default function DecksList() {
  return (
    <Query query={allDecksQuery}>
      {({ loading, error, data: { allDecks } }) => {
        if (error) return <ErrorMessage message="Error loading decks." />;
        if (loading) return <div>Loading</div>;

        return (
          <section>
            <ul>
              {allDecks.nodes.map((card, index) => (
                <li key={card.id}>
                  <Link href={`/post?title=${card.id}`} key={index}>
                    <a>
                      {index + 1}. name: {card.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );
}
