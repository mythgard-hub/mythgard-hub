CREATE TYPE mythgard.accountType as ENUM ('BASIC', 'COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'MYTHIC');

alter table mythgard.account add column accountType mythgard.accountType default 'BASIC';
