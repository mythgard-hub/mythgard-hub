--  See import-cards.sh for usage of this script
--
-- Imports all cards in mgcards.csv into the mythgard.cards table.

CREATE TEMPORARY TABLE t (
  id INTEGER,
  name VARCHAR(255),
  facOne VARCHAR(255),
  facTwo VARCHAR(255),
  supertype VARCHAR(255),
  subtype VARCHAR(255),
  manaCost VARCHAR(255),
  gemCost VARCHAR(255),
  rarity VARCHAR(255),
  atk VARCHAR(255),
  def VARCHAR(255),
  rules TEXT,
  flavor VARCHAR(255),
  set INTEGER,
  owned BOOLEAN,
  artist VARCHAR(255),
  spawns VARCHAR(255));

-- postgres only cares about index, so these names don't need
-- to match the actual csv file's headers
\copy t(id, name, facOne, facTwo, supertype, subtype, manaCost, gemCost, rarity, atk, def, rules, flavor, set, owned, artist, spawns) FROM 'mgcards.csv' WITH CSV HEADER;

-- We use -1 to denote variable attack and defense values.
-- However, the csv uses X or * to denote this. A regex is
-- used to convert these to -1.
insert into mythgard.card (name, rules, supertype, subtype, atk, def)
select
  name,
  rules,
  string_to_array(upper(supertype), ',')::mythgard.cardType[],
  subtype,
  REGEXP_REPLACE(atk, '[^0-9]' ,'-1')::integer,
  REGEXP_REPLACE(def, '[^0-9]' ,'-1')::integer
  from t;

truncate table mythgard.spawns;
insert into mythgard.spawns (card_id, spawn_id)
  select id, unnest(string_to_array(spawns, ','))
    where spawns <> '';

DROP TABLE t;
