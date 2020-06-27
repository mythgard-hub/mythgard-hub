CREATE TYPE mythgard.accountType as ENUM ('BASIC', 'COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'MYTHIC');

alter table mythgard.account add column account_type mythgard.accountType default 'BASIC';
