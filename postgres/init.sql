DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;

CREATE TYPE mythgard.rarity AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'MYTHIC');

CREATE TYPE mythgard.cardType AS ENUM ('MINION', 'SPELL', 'ENCHANTMENT', 'ARTIFACT', 'ITEM', 'BRAND');

CREATE ROLE admin;
CREATE ROLE authd_user;
CREATE ROLE anon_user;

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

CREATE TABLE mythgard.essence_costs (
  rarity Mythgard.rarity,
  essence integer
);

insert into mythgard.essence_costs (rarity, essence) values ('MYTHIC', 1000);
insert into mythgard.essence_costs (rarity, essence) values ('RARE', 500);
insert into mythgard.essence_costs (rarity, essence) values ('UNCOMMON', 100);
insert into mythgard.essence_costs (rarity, essence) values ('COMMON', 50);

CREATE TABLE mythgard.path (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT
);

INSERT INTO mythgard.path ("name", "rules") VALUES ('Way of the Black Lotus', 'lorems');
INSERT INTO mythgard.path ("name", "rules") VALUES ('Path to Redemption', 'lorems');
INSERT INTO mythgard.path ("name", "rules") VALUES ('Path Variable', 'lorems');

CREATE TABLE mythgard.power (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT
);

INSERT INTO mythgard.power ("name", "rules") VALUES ('It''s over 9000!!', 'lorems');
INSERT INTO mythgard.power ("name", "rules") VALUES ('Power Rangers', 'lorems');
INSERT INTO mythgard.power ("name", "rules") VALUES ('Powerpuff Girls', 'lorems');

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
  modified timestamp default current_timestamp,
  created timestamp default current_timestamp
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
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE,
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
    ON DELETE CASCADE
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

CREATE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         sum(essence_costs.essence)::int as essence_cost
  FROM mythgard.deck
  JOIN mythgard.card_deck
    ON card_deck.deck_id = deck.id
  JOIN mythgard.card
    ON card_deck.card_id = card.id
  JOIN mythgard.card_faction
    ON card.id = card_faction.id
  JOIN mythgard.faction
    On faction.id = card_faction.id
  JOIN mythgard.essence_costs
    On essence_costs.rarity = card.rarity
 GROUP BY deck.id
;
-- See https://www.graphile.org/postgraphile/smart-comments/#foreign-key
-- But basically is for postgraphile to see relation to deck
comment on view mythgard.deck_preview is E'@foreignKey (deck_id) references mythgard.deck';

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

GRANT ALL PRIVILEGES ON SCHEMA mythgard TO admin;
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO anon_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO anon_user;

-- Set specific permissions for sensitive tables
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM authd_user;
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM anon_user;

GRANT SELECT ON TABLE mythgard.account TO authd_user;
GRANT UPDATE (username) ON TABLE mythgard.account TO authd_user;
GRANT SELECT (id, username) ON TABLE mythgard.account TO anon_user;
