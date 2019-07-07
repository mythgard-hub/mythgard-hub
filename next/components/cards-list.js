import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

export const allCardsQuery = gql`
  query allCards {
    allCards {
      nodes {
        id
        atk
        def
      }
    }
  }
`;

export default function CardsList() {
  return (
    <Query query={allCardsQuery}>
      {({ loading, error, data: { allCards } }) => {
        if (error) return <ErrorMessage message="Error loading posts." />;
        if (loading) return <div>Loading</div>;

        return (
          <section>
            <ul>
              {allCards.nodes.map((card, index) => (
                <li key={card.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <span>attack: {card.atk}</span>
                    <span>defence: {card.def}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );
}
