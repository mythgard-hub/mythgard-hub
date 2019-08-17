--  See import-cards.sh for usage of this script
--
-- Imports all cards in mgcards.csv into the mythgard.cards table.

-- to keep things sane, please keep this table's column names
-- the same as they are in the mythgard.cards table
CREATE TEMPORARY TABLE t (
  id INTEGER,
  name VARCHAR(255),
  facOne VARCHAR(255),
  facTwo VARCHAR(255),
  type VARCHAR(255),
  subtype VARCHAR(255),
  manaCost VARCHAR(255),
  gemCost VARCHAR(255),
  rarity VARCHAR(255),
  atk VARCHAR(255),
  def VARCHAR(255),
  rules TEXT,
  flavor VARCHAR(255),
  set INTEGER,
  owned BOOLEAN);

-- postgres only cares about index, so these names don't need
-- to match the actual csv file's headers
\copy t(id, name, facOne, facTwo, type, subtype, manaCost, gemCost, rarity, atk, def, rules, flavor, set, owned) FROM 'mgcards.csv' WITH CSV HEADER;

-- We use -1 to denote dynamic attack and defense values.
-- However, the csv uses X or * to denote this. A regex is
-- used to convert these to -1.
insert into mythgard.card (name, rules, type, atk, def)
select
  name,
  rules,
  type,
  REGEXP_REPLACE(atk, '[^0-9]' ,'-1')::integer,
  REGEXP_REPLACE(def, '[^0-9]' ,'-1')::integer
  from t;

DROP TABLE t;
-- \copy mythgard.card(name, rules) To 'mgcards.csv' With CSV HEADER;
