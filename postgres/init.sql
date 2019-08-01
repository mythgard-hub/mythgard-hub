CREATE SCHEMA mythgard;
CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  type varchar (255),
  atk integer,
  def integer
);

INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (1, 'Furball', 'rules', 'cat', '1', '2');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (2, 'Imp', 'rules', 'devil', '2', '1');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (3, 'Grizzly Bear', 'rules', 'bear', '2', '2');
INSERT INTO mythgard.card ("id", "name", "rules", "type", "atk", "def") VALUES (4, 'Dragon', 'flying', 'dragon', '5', '5');

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer
);
INSERT INTO mythgard.deck("name") VALUES ('dragons');
INSERT INTO mythgard.deck("name") VALUES ('cats');

CREATE TABLE mythgard.card_deck (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  card_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id),
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id)
);

INSERT INTO mythgard.card_deck("deck_id", "card_id") VALUES (1, 4);
INSERT INTO mythgard.card_deck("deck_id", "card_id") VALUES (2, 1);

-- Create the function named `search_decks` with a text argument named `title`.
-- This will expose `Query.searchDecks(name: String!, ...)` to GraphQL.
-- title is a bit of a hack but `name ilike name` doesn't work
create function mythgard.search_decks(title text)
  -- This function will return a set of decks from the `deck` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof mythgard.deck as $$
    -- Write our advanced query as a SQL query!
    select *
    from mythgard.deck
    where
      -- Use the `ILIKE` operator on both the `headline` and `body` columns. If
      -- either return true, return the post.
      name ilike ('%' || title || '%')
      -- or body ilike ('%' || search || '%')
  -- End the function declaring the language we used as SQL and add the
  -- `STABLE` marker so PostGraphile knows its a query and not a mutation.
  $$ language sql stable;

CREATE TABLE mythgard.deck_comment (
  id SERIAL PRIMARY KEY,
  body text,
  deck_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
);

INSERT INTO mythgard.deck_comment("deck_id", "body") VALUES (1, 'I made masters with this last week');
