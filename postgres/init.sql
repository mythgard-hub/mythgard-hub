DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;
CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  type varchar(255),
  atk integer,
  def integer,
  mana integer,
  gem integer,
  color varchar(10)
);

INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Furball', 'rules', 'cat', '1', '2', '3', '1', 'yellow');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Imp', 'rules', 'devil', '2', '1', '2', '2', 'orange');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Grizzly Bear', 'rules', 'bear', '2', '2', '2', '6', 'orange');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Dragon', 'flying', 'dragon', '5', '5', '1', '2', 'green');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Vampire', 'lifelink', 'vampire', '2', '2', '1', '2', 'red');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "color")
  VALUES ('Harmony Beast', 'friendly', 'beast', '3', '3', '1', '0', 'blue');

CREATE TABLE mythgard.path (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.path ("id", "name") VALUES (1, 'Way of the Black Lotus');
INSERT INTO mythgard.path ("id", "name") VALUES (2, 'Path to Redemption');
INSERT INTO mythgard.path ("id", "name") VALUES (1, 'Path Variable');

CREATE TABLE mythgard.power (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.power ("id", "name") VALUES (1, 'It''s over 9000!!');
INSERT INTO mythgard.power ("id", "name") VALUES (1, 'Power Rangers');
INSERT INTO mythgard.power ("id", "name") VALUES (1, 'Powerpuff Girls');

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer,
  path_id integer REFERENCES mythgard.path (id),
  power_id integer REFERENCES mythgard.power (id)
);
INSERT INTO mythgard.deck("name") VALUES ('dragons');
INSERT INTO mythgard.deck("name", "path_id", "power_id") VALUES ('cats', 1, 1);
INSERT INTO mythgard.deck("name") VALUES ('all_factions');

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
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (3, 1, 1), (3, 2, 1), (3, 3, 1), (3, 4, 1), (3, 5, 1), (3, 6, 1);

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
VALUES (1, 1, 1), (2, 1, 2);

CREATE TABLE mythgard.faction (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.faction("name") VALUES ('norden'), ('aztlan'), ('oberos'), ('dreni'), ('parsa'), ('harmony');

CREATE TABLE mythgard.card_faction (
  id SERIAL PRIMARY KEY,
  card_id integer,
  faction_id integer,
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id),
  FOREIGN KEY (faction_id)
    REFERENCES mythgard.faction (id)
);

INSERT INTO mythgard.card_faction("card_id","faction_id") VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6);
