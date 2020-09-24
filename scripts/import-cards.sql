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
  set VARCHAR(255),
  owned BOOLEAN,
  artist VARCHAR(255),
  spawns VARCHAR(255)
);

-- postgres only cares about index, so these names don't need
-- to match the actual csv file's headers
\copy t(id, name, facOne, facTwo, supertype, subtype, manaCost, gemCost, rarity, atk, def, rules, flavor, set, owned, artist, spawns) FROM 'mgcards.csv' WITH CSV HEADER;

-- We use -1 to denote variable attack and defense values.
-- However, the csv uses X or * to denote this. A regex is
-- used to convert these to -1.
insert into mythgard.card (id, name, rules, supertype, subtype, atk, def, mana, gem, rarity)
select
  id
  ,trim(name)
  ,trim(rules)
  ,string_to_array(trim(upper(supertype)), ',')::mythgard.cardType[]
  ,trim(subtype)
  ,REGEXP_REPLACE(atk, '[^0-9]' ,'-1')::integer
  ,REGEXP_REPLACE(def, '[^0-9]' ,'-1')::integer
  ,REGEXP_REPLACE(manaCost, '[^0-9]' ,'-1')::integer
  ,trim(gemCost)
  ,UPPER(trim(rarity))::mythgard.rarity
  ,trim(set)
  from t
ON CONFLICT (id) DO UPDATE
SET name = excluded.name
    ,rules = excluded.rules
    ,supertype = excluded.supertype
    ,subtype = excluded.subtype
    ,atk = excluded.atk
    ,def = excluded.def
    ,mana = excluded.mana
    ,gem = excluded.gem
    ,rarity = excluded.rarity
    ,cardset = excluded.set
;

truncate table mythgard.card_faction;
insert into mythgard.card_faction (card_id, faction_id)
  select t.id, faction.id
    from t
    left join mythgard.faction on lower(faction.name) = lower(t.facOne);
insert into mythgard.card_faction (card_id, faction_id)
  select t.id, faction.id
    from t
    left join mythgard.faction on lower(faction.name) = lower(t.facTwo);

truncate table mythgard.card_spawn;
insert into mythgard.card_spawn (card_id, spawn_id)
  select id, CAST(unnest(string_to_array(spawns, ',')) AS INTEGER)
    from t
    where spawns <> '';

DROP TABLE t;
