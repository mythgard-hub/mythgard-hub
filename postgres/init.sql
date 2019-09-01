DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;

CREATE TYPE mythgard.rarity AS ENUM ('common', 'uncommon', 'rare', 'mythic');

CREATE ROLE admin;
CREATE ROLE authd_user;
CREATE ROLE anon_user;

CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  type varchar(255),
  atk integer,
  def integer,
  mana integer,
  gem integer,
  rarity mythgard.rarity default 'common'
);

INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "rarity")
  VALUES ('Furball', 'rules', 'cat', '1', '2', '3', '1', 'common');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "rarity")
  VALUES ('Imp', 'rules', 'devil', '2', '1', '2', '2', 'uncommon');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "rarity")
  VALUES ('Grizzly Bear', 'rules', 'bear', '2', '2', '2', '6', 'rare');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem", "rarity")
  VALUES ('Dragon', 'flying', 'dragon', '5', '5', '1', '2', 'mythic');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem")
  VALUES ('Vampire', 'lifelink', 'vampire', '2', '2', '1', '2');
INSERT INTO mythgard.card ("name", "rules", "type", "atk", "def", "mana", "gem")
  VALUES ('Harmony Beast', 'friendly', 'beast', '3', '3', '1', '0');

CREATE TABLE mythgard.path (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.path ("id", "name") VALUES (1, 'Way of the Black Lotus');
INSERT INTO mythgard.path ("id", "name") VALUES (2, 'Path to Redemption');
INSERT INTO mythgard.path ("id", "name") VALUES (3, 'Path Variable');

CREATE TABLE mythgard.power (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.power ("id", "name") VALUES (1, 'It''s over 9000!!');
INSERT INTO mythgard.power ("id", "name") VALUES (2, 'Power Rangers');
INSERT INTO mythgard.power ("id", "name") VALUES (3, 'Powerpuff Girls');

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer,
  path_id integer REFERENCES mythgard.path (id),
  power_id integer REFERENCES mythgard.power (id),
  modified timestamp default current_timestamp
);
INSERT INTO mythgard.deck("name") VALUES ('dragons');
INSERT INTO mythgard.deck("name", "path_id", "power_id") VALUES ('cats', 1, 1);
INSERT INTO mythgard.deck("name", "modified") VALUES ('all_factions', '2019-05-1 00:00:00');
INSERT INTO mythgard.deck("name", "modified") VALUES ('norden aztlan', '2019-01-1 00:00:00');

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
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (4, 1, 1), (4, 2, 1);

-- In PostgreSQL, user is a keyword
CREATE TABLE mythgard.account (
  id SERIAL PRIMARY KEY,
  google_id varchar(255) UNIQUE,
  email varchar(255) UNIQUE,
  username varchar(255) UNIQUE
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

CREATE OR REPLACE FUNCTION mythgard.current_user_id()
RETURNS integer as $$
  SELECT nullif(current_setting('jwt.claims.userId', true), '')::integer;
$$ language sql stable;

ALTER TABLE mythgard.account ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY admin_all ON mythgard.account TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY all_view ON mythgard.account FOR SELECT USING (true);
-- Rows can only be updated by their author
CREATE POLICY accountupdate_if_author
  ON mythgard.account
  FOR UPDATE
  USING ("id" = mythgard.current_user_id())
  WITH CHECK ("id" = mythgard.current_user_id());

GRANT SELECT (id, email, username) on mythgard.account TO authd_user;

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

-- Save deck modification time so decks can be searched by last update time
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
      NEW.modified = now();
      RETURN NEW;
   ELSE
      RETURN OLD;
   END IF;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_deck_modtime
  BEFORE UPDATE ON mythgard.deck
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Create a user for Postgraphile to connect as which has permissions
-- to the mythgard schema

CREATE USER postgraphile WITH password 'bears4life';
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO postgraphile;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO postgraphile;

-- The Postgraphile user needs privileges to set role for itself
GRANT authd_user TO postgraphile;
GRANT anon_user TO postgraphile;

GRANT ALL PRIVILEGES ON SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO anon_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO anon_user;