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

\copy t(id, name, facOne, facTwo, type, subtype, manaCost, gemCost, rarity, atk, def, rules, flavor, set, owned) FROM 'mgcards.csv' WITH CSV HEADER;

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
