-- see import-cards.sql for docs
CREATE TEMPORARY TABLE t (
  rank INTEGER,
  pilot VARCHAR(255),
  tournament_id integer,
  deck_id integer);

\copy t(rank, pilot, deck_id, tournament_id) FROM 'results.csv' WITH CSV HEADER;

insert into mythgard.tournament_deck (rank, pilot, deck_id, tournament_id)
select
  rank,
  trim(pilot),
  deck_id,
  tournament_id
  from t
;

DROP TABLE t;
