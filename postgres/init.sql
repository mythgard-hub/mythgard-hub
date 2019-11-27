DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;

CREATE OR REPLACE FUNCTION mythgard.current_user_id()
RETURNS integer as $$
  SELECT nullif(current_setting('jwt.claims.userId', true), '')::integer;
$$ language sql stable;

CREATE TYPE mythgard.rarity AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'MYTHIC');

CREATE TYPE mythgard.cardType AS ENUM ('MINION', 'SPELL', 'ENCHANTMENT', 'ARTIFACT', 'ITEM', 'BRAND');

CREATE TYPE mythgard.deckArchetype as ENUM ('UNKNOWN', 'AGGRO', 'MIDRANGE', 'CONTROL', 'COMBO');

CREATE TYPE mythgard.deckType as ENUM ('STANDARD', 'GAUNTLET', 'ARENA', 'TOURNAMENT', 'TWOVTWO');

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
  gem varchar(10),
  rarity mythgard.rarity default 'COMMON'
);

INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Furball', 'rules', 'cat', '1', '2', '3', 'B', 'COMMON', '{MINION}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Imp', 'rules', 'devil', '2', '1', '2', 'R', 'UNCOMMON', '{SPELL}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Grizzly Bear', 'rules', 'bear', '2', '2', '2', 'O', 'RARE', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Dragon', 'flying', 'dragon', '5', '5', '1', 'G', 'MYTHIC', '{ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, supertype)
  VALUES ('Vampire', 'lifelink', 'vampire', '2', '2', '1', 'PP', '{MINION,ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem)
  VALUES ('Harmony Beast', 'friendly', 'beast', '3', '3', '1', 'YY');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Cairnhenge', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 1', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 2', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 3', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 4', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 5', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 6', 'rock', 'Earth Enchantment', '1', 'Y', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 7', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 8', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 9', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
  INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Ghul', 'rock', 'Earth Enchantment', '1', 'R', 'RARE', '{MINION}');

CREATE TABLE mythgard.card_spawn (
  card_id int CONSTRAINT spawner_card_id_fkey REFERENCES mythgard.card (id),
  spawn_id int CONSTRAINT spawnee_card_id_fkey REFERENCES mythgard.card (id),
  PRIMARY KEY (card_id, spawn_id)
);

INSERT INTO mythgard.card_spawn (card_id, spawn_id) VALUES (2, 6), (2,7);

CREATE TABLE mythgard.essence_costs (
  rarity Mythgard.rarity,
  essence integer
);

insert into mythgard.essence_costs (rarity, essence) values ('MYTHIC', 2400);
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
  username varchar(255) UNIQUE,
  registered timestamp default current_timestamp
);

INSERT INTO mythgard.account ("username") VALUES ('lsv');
INSERT INTO mythgard.account ("username") VALUES ('foo');
INSERT INTO mythgard.account ("username") VALUES ('bar');

-- separate table from account b/c it's rarely needed and makes row level security easy
CREATE TABLE mythgard.account_moderator (
  id SERIAL PRIMARY KEY,
  account_id integer,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE);

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer REFERENCES mythgard.account (id),
  path_id integer REFERENCES mythgard.path (id),
  power_id integer REFERENCES mythgard.power (id),
  modified timestamp default current_timestamp,
  created timestamp default current_timestamp,
  description varchar(20000), -- about 30 paragraphs
  archetype mythgard.deckArchetype[] default ARRAY['UNKNOWN']::mythgard.deckArchetype[],
  type mythgard.deckType[] default ARRAY['STANDARD']::mythgard.deckType[]
);
INSERT INTO mythgard.deck("name", "author_id")
  VALUES (
    'dragons', 
    1);
INSERT INTO mythgard.deck("name", "path_id", "power_id", "author_id", "archetype", "type")
  VALUES (
    'cats',
    1,
    1,
    1,
    '{MIDRANGE}'::mythgard.deckArchetype[],
    '{TOURNAMENT}'::mythgard.deckType[]);
INSERT INTO mythgard.deck("name", "modified", "type")
  VALUES (
    'all_factions',
    current_date - interval '1 month',
    '{GAUNTLET}'::mythgard.deckType[]);
INSERT INTO mythgard.deck("name", "modified", "archetype", "type")
  VALUES (
    'norden aztlan',
    current_date - interval '9 month',
    '{CONTROL, MIDRANGE}'::mythgard.deckArchetype[], 
    '{STANDARD}'::mythgard.deckType[]);

ALTER TABLE mythgard.deck ENABLE ROW LEVEL SECURITY;
-- Admin users can make any changes and read all rows
CREATE POLICY deck_admin_all ON mythgard.deck TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_all_view ON mythgard.deck FOR SELECT USING (true);
-- Only create a deck for yourself
CREATE POLICY deck_insert_if_author
  ON mythgard.deck
  FOR INSERT
  WITH CHECK ("author_id" = mythgard.current_user_id());
-- Rows can only be updated by their author or mods
CREATE POLICY deck_update_if_author_or_mod
  ON mythgard.deck
  FOR UPDATE
  USING (("author_id" = mythgard.current_user_id())
         OR
         (exists(select * from mythgard.account_moderator
                 where account_id = mythgard.current_user_id())));
-- Rows can only be deleted by their author
CREATE POLICY deck_delete_if_author
  ON mythgard.deck
  FOR DELETE
  USING ("author_id" = mythgard.current_user_id());

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

ALTER TABLE mythgard.card_deck ENABLE ROW LEVEL SECURITY;
-- Admin users can make any changes and read all rows
CREATE POLICY card_deck_admin_all ON mythgard.card_deck TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY card_deck_all_view ON mythgard.card_deck FOR SELECT USING (true);
-- Only create a card_deck for yourself
CREATE POLICY card_deck_insert_if_author
  ON mythgard.card_deck
  FOR INSERT
    -- make sure deck.author equals mythgard.current_user_id
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be updated by their author
CREATE POLICY card_deck_update_if_author
  ON mythgard.card_deck
  FOR UPDATE
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be deleted by their author
CREATE POLICY card_deck_delete_if_author
  ON mythgard.card_deck
  FOR DELETE
  USING (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));

CREATE OR REPLACE FUNCTION mythgard.update_deck_and_remove_cards (
  _id integer,
  _name varchar(255),
  _path_id integer,
  _power_id integer,
  _archetype mythgard.deckArchetype[],
  _type mythgard.deckType[]
)
RETURNS mythgard.deck as $$
  DELETE FROM mythgard.card_deck
    WHERE deck_id = _id;
  UPDATE mythgard.deck
    SET name = _name,
        path_id = _path_id,
        power_id = _power_id,
        archetype = _archetype,
        type = _type
    WHERE id = _id
    RETURNING *
$$ LANGUAGE sql VOLATILE;

CREATE TABLE mythgard.deck_vote (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  account_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE,
  UNIQUE(deck_id, account_id)
);

INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 1);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 2);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 3);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (2, 1);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (2, 2);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (3, 1);

CREATE TABLE mythgard.deck_featured (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE
);

INSERT INTO mythgard.deck_featured("deck_id") VALUES (1);

CREATE OR REPLACE FUNCTION mythgard.find_account_or_create_by_google
(
  _google_id varchar(255),
  _email varchar(255),
  _username varchar(255)
)
RETURNS mythgard.account as $$
  INSERT INTO mythgard.account (google_id, email, username) VALUES (_google_id, _email, _username)
    ON CONFLICT (google_id) DO UPDATE SET email = _email
    RETURNING *
$$ LANGUAGE sql VOLATILE;

ALTER TABLE mythgard.account ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY admin_all ON mythgard.account TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY all_view ON mythgard.account FOR SELECT USING (true);
-- Rows can only be updated by their owner
CREATE POLICY accountupdate_if_author
  ON mythgard.account
  FOR UPDATE
  USING ("id" = mythgard.current_user_id())
  WITH CHECK ("id" = mythgard.current_user_id());

ALTER TABLE mythgard.deck_vote ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY deck_vote_admin_all ON mythgard.deck_vote TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_vote_all_view ON mythgard.deck_vote FOR SELECT USING (true);
-- Rows can only be updated by their author
-- and users cannot create a row for their own decks
CREATE POLICY deck_vote_insert_if_author
  ON mythgard.deck_vote
  FOR INSERT
  WITH CHECK ((account_id = mythgard.current_user_id())
              AND
              NOT EXISTS(select * from mythgard.deck
                         where id = deck_vote.deck_id
                         and author_id = mythgard.current_user_id()));
CREATE POLICY deck_vote_delete_if_author
  ON mythgard.deck_vote
  FOR DELETE
  USING ("account_id" = mythgard.current_user_id());

CREATE TABLE mythgard.tournament (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  url text,
  organizer varchar(255),
  date date
);

INSERT INTO mythgard.tournament("name", "date", "url", "organizer")
VALUES ('The Battle of Deimos', '2019-07-26', 'http://www.mythgardhub.com', 'mgh'),
  ('The Iron Rain', '3000-01-01', 'http://www.mythgardhub.com', 'rhino games');

CREATE TABLE mythgard.tournament_deck (
  id SERIAL PRIMARY KEY,
  rank integer,
  pilot varchar(255),
  tournament_id integer,
  deck_id integer,
  FOREIGN KEY (tournament_id)
    REFERENCES mythgard.tournament (id)
    ON DELETE CASCADE,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE
);

INSERT INTO mythgard.tournament_deck("rank", "tournament_id", "deck_id", "pilot")
VALUES (1, 1, 1, 'lsv'), (2, 1, 2, 'pvdr');

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

INSERT INTO mythgard.card_faction("card_id","faction_id")
  VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 1),
    (8, 2),
    (9, 3),
    (10, 4),
    (11, 5),
    (12, 6),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1),
    (17, 2);

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

CREATE OR REPLACE FUNCTION mythgard.deck_essence_cost (IN deckId INTEGER)
RETURNS INTEGER AS $$
  DECLARE
    essence_cost INTEGER;
  BEGIN
    SELECT sum(essence_costs.essence * card_deck.quantity)::int into essence_cost
    FROM mythgard.deck
    JOIN mythgard.card_deck
      ON card_deck.deck_id = deck.id
    JOIN mythgard.card
      ON card_deck.card_id = card.id
    LEFT JOIN mythgard.essence_costs
      On essence_costs.rarity = card.rarity
    WHERE deck.id = $1
    GROUP BY deck.id;

    RETURN essence_cost;
  END;
  $$ language 'plpgsql';

CREATE OR REPLACE FUNCTION mythgard.deck_votes (IN deckId INTEGER)
RETURNS INTEGER AS $$
  DECLARE
    votes INTEGER;
  BEGIN
    SELECT count(DISTINCT deck_vote)::int into votes
    FROM mythgard.deck
   LEFT JOIN mythgard.deck_vote
     On deck_vote.deck_id = deck.id
   WHERE deck.id = $1
   GROUP BY deck.id;

    RETURN votes;

  END;
  $$ language 'plpgsql';

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes,
         deck.archetype as deck_archetype,
         deck.type as deck_type
  FROM mythgard.deck
  JOIN mythgard.card_deck
    ON card_deck.deck_id = deck.id
  JOIN mythgard.card
    ON card_deck.card_id = card.id
  LEFT JOIN mythgard.card_faction
    ON (card.id = card_faction.card_id and card_faction.faction_id is not null)
  LEFT JOIN mythgard.faction
    On faction.id = card_faction.faction_id
 GROUP BY deck.id
;

-- See https://www.graphile.org/postgraphile/smart-comments/#foreign-key
-- But basically is for postgraphile to see relation to deck
comment on view mythgard.deck_preview is E'@foreignKey (deck_id) references mythgard.deck';

CREATE TRIGGER update_deck_modtime
  BEFORE UPDATE ON mythgard.deck
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- INDEXES FOR QUERIES

CREATE INDEX deck_name_index ON mythgard.deck
    USING gin(to_tsvector('simple',deck.name));
CREATE INDEX author_name_index ON mythgard.account
    USING gin(to_tsvector('simple',account.username));

-- CUSTOM QUERIES FOR GRAPHQL

--                            search_decks
--         searches for decks (advanced search with several criteria)
-- RETURNS setof deck
-- PARAMS:
-- deckName    str or null - name of deck (prefix only, so finds dragons given drag but not given rag)
-- authorName  str or null - name of author (prefix only, so finds alex given al but not given lex)
-- deckModified str or null - modified on or after given date (e.g. "2019-07-11")
-- card1       int or null - id of card being searched for (search supports at most 5 cards)
-- card2       int or null - id of card being searched for (search supports at most 5 cards)
-- card3       int or null - id of card being searched for (search supports at most 5 cards)
-- card4       int or null - id of card being searched for (search supports at most 5 cards)
-- card5       int or null - id of card being searched for (search supports at most 5 cards)
-- faction1    int or null - id of a faction that deck must contain
-- faction2    int or null - id of a faction that deck must contain
-- faction3    int or null - id of a faction that deck must contain
-- faction4    int or null - id of a faction that deck must contain
-- faction5    int or null - id of a faction that deck must contain
-- faction6    int or null - id of a faction that deck must contain
-- numFactions int or null - number of specified factions. Omit to allow more factions than specifed.
-- archetype   mythgard.deckArchetype or null - array of archetypes to filter by
-- type        mythgard.deckType or null - array of types to filter by
create or replace function mythgard.search_decks_nosort(
  deckName varchar(255),
  authorName varchar(255),
  deckModified date,
  card1 integer,
  card2 Integer,
  card3 Integer,
  card4 Integer,
  card5 Integer,
  faction1 integer,
  faction2 integer,
  faction3 integer,
  faction4 integer,
  faction5 integer,
  faction6 integer,
  numFactions integer,
  archetypeFilter mythgard.deckArchetype[],
  typeFilter mythgard.deckType[])
  returns setof mythgard.deck as $$

    SELECT deck.* FROM mythgard.deck
      LEFT JOIN mythgard.card_deck ON (card_deck.deck_id = deck.id)
      LEFT JOIN mythgard.card ON (card.id = card_deck.card_id)
      LEFT JOIN mythgard.account ON (account.id = deck.author_id)

    -- deck name filter
    WHERE (deckName is NULL or trim(deckName) = '' or to_tsvector('simple', deck.name) @@ to_tsquery('simple', replace(regexp_replace(trim(deckName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- author name filter
    AND (authorName is NULL or trim(authorName) = '' or to_tsvector('simple', account.username) @@ to_tsquery('simple', replace(regexp_replace(trim(authorName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- modification date filter
    AND (deckModified is NULL or deck.modified >= deckModified)
    -- archetype filter
    AND (archetypeFilter is NULL or deck.archetype = archetypeFilter)
    -- type filter
    AND (typeFilter is NULL or deck.type = typeFilter)

    intersect

    -- cards filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card1 is null or card.id = card1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card2 is null or card.id = card2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card3 is null or card.id = card3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card4 is null or card.id = card4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card5 is null or card.id = card5

    intersect

    -- factions filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    group by deck.id
    having numFactions is NULL or numFactions = 0 or count(distinct faction.id) = numFactions
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction1 is null or faction.id = faction1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction2 is null or faction.id = faction2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction3 is null or faction.id = faction3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction4 is null or faction.id = faction4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction5 is null or faction.id = faction5
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction6 is null or faction.id = faction6

    GROUP BY deck.id
    LIMIT 2000;
  $$ language sql stable;

create or replace function mythgard.search_decks(
  deckName varchar(255),
  authorName varchar(255),
  deckModified date,
  card1 integer,
  card2 Integer,
  card3 Integer,
  card4 Integer,
  card5 Integer,
  faction1 integer,
  faction2 integer,
  faction3 integer,
  faction4 integer,
  faction5 integer,
  faction6 integer,
  numFactions integer,
  archetypeFilter mythgard.deckArchetype[],
  typeFilter mythgard.deckType[],
  sortBy text)
  returns setof mythgard.deck as $$

  BEGIN
       IF sortBy = 'essenceDesc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec desc nulls last) as bar;
       ELSIF sortBy = 'essenceAsc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec asc nulls last) as bar;
       ELSIF sortBy = 'ratingDesc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount desc nulls last;
       ELSIF sortBy = 'ratingAsc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount asc nulls first;
       ELSIF sortBy = 'nameAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) asc;
       ELSIF sortBy = 'nameDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) desc;
       ELSIF sortBy = 'dateDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created desc;
       ELSIF sortBy = 'dateAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created asc;
       ELSE
          RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter);
       END IF;
       RETURN;
   END

  $$ language plpgsql stable;

-- END QUERIES

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
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO authd_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO anon_user;

-- Set specific permissions for sensitive tables
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM authd_user;
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM anon_user;

GRANT SELECT ON TABLE mythgard.account TO authd_user;
GRANT UPDATE (username) ON TABLE mythgard.account TO authd_user;
GRANT SELECT (id, username) ON TABLE mythgard.account TO anon_user;

\echo 'Remember to update the postgraphile users pw with the production version in the kubernetes secrets file.';
