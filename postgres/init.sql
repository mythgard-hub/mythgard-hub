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
  quantity integer,
  deck_id integer,
  card_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id),
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id),
  UNIQUE(deck_id, card_id)
);

INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (1, 4, 2);
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (2, 1, 1);

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

-- In PostgreSQL, user is a keyword
CREATE TABLE mythgard.account (
  id SERIAL PRIMARY KEY,
  google_id varchar(255) UNIQUE,
  email varchar(255) UNIQUE
);

CREATE OR REPLACE FUNCTION mythgard.find_account_or_create_by_google
(
  _google_id varchar(255),
  _email varchar(255)
)
RETURNS mythgard.account as $$
  INSERT INTO mythgard.account (google_id, email) VALUES (_google_id, _email)
    ON CONFLICT (google_id) DO UPDATE SET email = _email
    RETURNING *
$$ LANGUAGE sql VOLATILE;

CREATE TABLE mythgard.tournament (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  date date
);

INSERT INTO mythgard.tournament("id", "name", "date")
VALUES (1, 'The Battle of Deimos', '2019-07-26'),
  (2, 'The Iron Rain', '3000-01-01');

CREATE TABLE mythgard.tournament_deck (
  id SERIAL PRIMARY KEY,
  rank integer,
  tournament_id integer,
  deck_id integer,
  FOREIGN KEY (tournament_id)
    REFERENCES mythgard.tournament (id),
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
);

INSERT INTO mythgard.tournament_deck("rank", "tournament_id", "deck_id")
VALUES (1, 1, 1), (2, 1, 2)
