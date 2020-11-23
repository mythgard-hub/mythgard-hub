ALTER TABLE mythgard.card
ADD COLUMN cardset varchar(255) default 'Core';

ALTER TABLE mythgard.card
ADD COLUMN spawnonly boolean default FALSE;
