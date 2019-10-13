start transaction;

ALTER TABLE mythgard.tournament
ADD COLUMN url text;

ALTER TABLE mythgard.tournament
ADD COLUMN organizer varchar(255);

alter table mythgard.tournament_deck
drop constraint tournament_deck_tournament_id_fkey,
add constraint tournament_deck_tournament_id_fkey
   foreign key (tournament_id)
   references mythgard.tournament(id)
   on delete cascade;

commit;
