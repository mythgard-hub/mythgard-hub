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
  text VARCHAR(255),
  flavor VARCHAR(255),
  set INTEGER,
  owned BOOLEAN);



\copy t(id, name, facOne, facTwo, type, subtype, manaCost, gemCost, rarity, atk, def, text, flavor, set, owned) FROM 'mgcards.csv' WITH CSV HEADER;

DROP TABLE t;
-- \copy mythgard.card(name, rules) To 'mgcards.csv' With CSV HEADER;
