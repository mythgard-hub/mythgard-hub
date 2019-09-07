-- see import-cards.sql for docs
CREATE TEMPORARY TABLE t (
  id INTEGER,
  name VARCHAR(255),
  rules TEXT);

\copy t(id, name, rules) FROM 'mgpaths.csv' WITH CSV HEADER;

insert into mythgard.path (name, rules)
select
  name,
  rules
  from t;

DROP TABLE t;
