CREATE TEMPORARY TABLE t (
  id INTEGER,
  name VARCHAR(255),
  rules TEXT);

-- postgres only cares about index, so these names don't need
-- to match the actual csv file's headers
\copy t(id, name, rules) FROM 'mgpowers.csv' WITH CSV HEADER;

-- We use -1 to denote variable attack and defense values.
-- However, the csv uses X or * to denote this. A regex is
-- used to convert these to -1.
insert into mythgard.power (name, rules)
select
  name,
  rules
  from t;

DROP TABLE t;
