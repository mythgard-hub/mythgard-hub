-- see import-cards.sql for docs
CREATE TEMPORARY TABLE t (
  id INTEGER,
  name VARCHAR(255),
  rules TEXT);

\copy t(id, name, rules) FROM 'mgpowers.csv' WITH CSV HEADER;

insert into mythgard.power (id, name, rules)
select
  id,
  trim(name),
  trim(rules)
  from t
ON CONFLICT (id) DO UPDATE
SET name = excluded.name
    ,rules = excluded.rules
;

DROP TABLE t;
