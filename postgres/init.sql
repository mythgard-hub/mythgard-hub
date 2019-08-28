DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;

CREATE TYPE mythgard.rarity AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'MYTHIC');

CREATE TYPE mythgard.cardType AS ENUM ('MINION', 'SPELL', 'ENCHANTMENT', 'ARTIFACT', 'ITEM', 'BRAND');

CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  supertype mythgard.cardType[] default '{MINION}',
  subtype varchar(255),
  atk integer,
  def integer,
  mana integer,
  gem integer,
  rarity mythgard.rarity default 'COMMON'
);

INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Furball', 'rules', 'cat', '1', '2', '3', '1', 'COMMON', '{MINION}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Imp', 'rules', 'devil', '2', '1', '2', '2', 'UNCOMMON', '{SPELL}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Grizzly Bear', 'rules', 'bear', '2', '2', '2', '6', 'RARE', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Dragon', 'flying', 'dragon', '5', '5', '1', '2', 'MYTHIC', '{ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, supertype)
  VALUES ('Vampire', 'lifelink', 'vampire', '2', '2', '1', '2', '{MINION,ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem)
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

-- In PostgreSQL, user is a keyword
CREATE TABLE mythgard.account (
  id SERIAL PRIMARY KEY,
  google_id varchar(255) UNIQUE,
  email varchar(255) UNIQUE,
  username varchar(255) UNIQUE
);

INSERT INTO mythgard.account ("username") VALUES ('lsv');

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer REFERENCES mythgard.account (id),
  path_id integer REFERENCES mythgard.path (id),
  power_id integer REFERENCES mythgard.power (id),
  modified timestamp default current_timestamp
);
INSERT INTO mythgard.deck("name", "author_id") VALUES ('dragons', 1);
INSERT INTO mythgard.deck("name", "path_id", "power_id", "author_id") VALUES ('cats', 1, 1, 1);
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
