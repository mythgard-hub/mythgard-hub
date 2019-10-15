start transaction;

ALTER TABLE mythgard.tournament_deck
ADD COLUMN pilot varchar(255);

UPDATE mythgard.tournament_deck SET pilot = 'Koveras' 
  WHERE id = 3;
UPDATE mythgard.tournament_deck SET pilot = 'Nowitsj' 
  WHERE id = 4;
UPDATE mythgard.tournament_deck SET pilot = 'nickn0me' 
  WHERE id = 5;
UPDATE mythgard.tournament_deck SET pilot = 'Malekith' 
  WHERE id = 6;
UPDATE mythgard.tournament_deck SET pilot = 'Fictional' 
  WHERE id = 7;
UPDATE mythgard.tournament_deck SET pilot = 'Ejecty' 
  WHERE id = 8;
UPDATE mythgard.tournament_deck SET pilot = 'Astronomika' 
  WHERE id = 9;
UPDATE mythgard.tournament_deck SET pilot = 'Oneiric' 
  WHERE id = 10;

commit;
