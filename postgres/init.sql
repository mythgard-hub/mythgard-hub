DROP SCHEMA IF EXISTS mythgard CASCADE;

CREATE SCHEMA mythgard;

CREATE OR REPLACE FUNCTION mythgard.current_user_id()
RETURNS integer as $$
  SELECT nullif(current_setting('jwt.claims.userId', true), '')::integer;
$$ language sql stable;

CREATE TYPE mythgard.rarity AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'MYTHIC');

CREATE TYPE mythgard.cardType AS ENUM ('MINION', 'SPELL', 'ENCHANTMENT', 'ARTIFACT', 'ITEM', 'BRAND');

CREATE TYPE mythgard.deckArchetype as ENUM ('UNKNOWN', 'AGGRO', 'MIDRANGE', 'CONTROL', 'COMBO');

CREATE TYPE mythgard.deckType as ENUM ('STANDARD', 'GAUNTLET', 'ARENA', 'TOURNAMENT', 'TWOVTWO');

CREATE ROLE admin;
CREATE ROLE authd_user;
CREATE ROLE anon_user;

CREATE TABLE mythgard.card (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT,
  supertype mythgard.cardType[] default '{MINION}',
  subtype varchar(255),
  atk integer,
  def integer,
  mana integer,
  gem varchar(10),
  rarity mythgard.rarity default 'COMMON'
);

INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Furball', 'rules', 'cat', '1', '2', '3', 'B', 'COMMON', '{MINION}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Imp', 'rules', 'devil', '2', '1', '2', 'R', 'UNCOMMON', '{SPELL}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Grizzly Bear', 'rules', 'bear', '2', '2', '2', 'O', 'RARE', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, rarity, supertype)
  VALUES ('Dragon', 'flying', 'dragon', '5', '5', '1', 'G', 'MYTHIC', '{ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem, supertype)
  VALUES ('Vampire', 'lifelink', 'vampire', '2', '2', '1', 'PP', '{MINION,ARTIFACT}');
INSERT INTO mythgard.card (name, rules, subtype, atk, def, mana, gem)
  VALUES ('Harmony Beast', 'friendly', 'beast', '3', '3', '1', 'YY');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Cairnhenge', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 1', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 2', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 3', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 4', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 5', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 6', 'rock', 'Earth Enchantment', '1', 'Y', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 7', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 8', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Common 9 with a really long name', 'rock', 'Earth Enchantment', '1', 'B', 'COMMON', '{ENCHANTMENT}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('Ghul', 'rock', 'Earth Enchantment', '1', 'R', 'RARE', '{MINION}');
INSERT INTO mythgard.card (name, rules, subtype, mana, gem, rarity, supertype)
  VALUES ('X Cost', 'lifelink', 'vampire', '-1', 'G', 'MYTHIC', '{MINION, ENCHANTMENT}');

CREATE TABLE mythgard.card_spawn (
  card_id int CONSTRAINT spawner_card_id_fkey REFERENCES mythgard.card (id),
  spawn_id int CONSTRAINT spawnee_card_id_fkey REFERENCES mythgard.card (id),
  PRIMARY KEY (card_id, spawn_id)
);

INSERT INTO mythgard.card_spawn (card_id, spawn_id) VALUES (2, 6), (2,7);

CREATE TABLE mythgard.essence_costs (
  rarity Mythgard.rarity,
  essence integer
);

insert into mythgard.essence_costs (rarity, essence) values ('MYTHIC', 2400);
insert into mythgard.essence_costs (rarity, essence) values ('RARE', 500);
insert into mythgard.essence_costs (rarity, essence) values ('UNCOMMON', 100);
insert into mythgard.essence_costs (rarity, essence) values ('COMMON', 50);

CREATE TABLE mythgard.path (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT
);

INSERT INTO mythgard.path ("name", "rules") VALUES ('Way of the Black Lotus', 'lorems');
INSERT INTO mythgard.path ("name", "rules") VALUES ('Path to Redemption', 'lorems');
INSERT INTO mythgard.path ("name", "rules") VALUES ('Path Variable', 'lorems');

CREATE TABLE mythgard.power (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  rules TEXT
);

INSERT INTO mythgard.power ("name", "rules") VALUES ('It''s over 9000!!', 'lorems');
INSERT INTO mythgard.power ("name", "rules") VALUES ('Power Rangers', 'lorems');
INSERT INTO mythgard.power ("name", "rules") VALUES ('Powerpuff Girls', 'lorems');

-- In PostgreSQL, user is a keyword
CREATE TABLE mythgard.account (
  id SERIAL PRIMARY KEY,
  google_id varchar(255) UNIQUE,
  email varchar(255) UNIQUE,
  username varchar(255) UNIQUE,
  registered timestamp default current_timestamp
);

INSERT INTO mythgard.account ("username") VALUES ('lsv');
INSERT INTO mythgard.account ("username") VALUES ('foo');
INSERT INTO mythgard.account ("username") VALUES ('bar');

-- separate table from account b/c it's rarely needed and makes row level security easy
CREATE TABLE mythgard.account_moderator (
  id SERIAL PRIMARY KEY,
  account_id integer,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE);

CREATE TABLE mythgard.deck (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  author_id integer REFERENCES mythgard.account (id),
  path_id integer REFERENCES mythgard.path (id),
  power_id integer REFERENCES mythgard.power (id),
  modified timestamp default current_timestamp,
  created timestamp default current_timestamp,
  description varchar(20000), -- about 30 paragraphs
  archetype mythgard.deckArchetype[] default ARRAY['UNKNOWN']::mythgard.deckArchetype[],
  type mythgard.deckType[] default ARRAY['STANDARD']::mythgard.deckType[]
);
INSERT INTO mythgard.deck("name", "author_id")
  VALUES (
    'dragons', 
    1);
INSERT INTO mythgard.deck("name", "path_id", "power_id", "author_id", "archetype", "type")
  VALUES (
    'cats',
    1,
    1,
    1,
    '{MIDRANGE}'::mythgard.deckArchetype[],
    '{TOURNAMENT}'::mythgard.deckType[]);
INSERT INTO mythgard.deck("name", "modified", "type")
  VALUES (
    'all_factions',
    current_date - interval '1 month',
    '{GAUNTLET}'::mythgard.deckType[]);
INSERT INTO mythgard.deck("name", "modified", "archetype", "type")
  VALUES (
    'norden aztlan',
    current_date - interval '9 month',
    '{CONTROL, MIDRANGE}'::mythgard.deckArchetype[], 
    '{STANDARD}'::mythgard.deckType[]);

ALTER TABLE mythgard.deck ENABLE ROW LEVEL SECURITY;
-- Admin users can make any changes and read all rows
CREATE POLICY deck_admin_all ON mythgard.deck TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_all_view ON mythgard.deck FOR SELECT USING (true);
-- Only create a deck for yourself
CREATE POLICY deck_insert_if_author
  ON mythgard.deck
  FOR INSERT
  WITH CHECK ("author_id" = mythgard.current_user_id());
-- Rows can only be updated by their author or mods
CREATE POLICY deck_update_if_author_or_mod
  ON mythgard.deck
  FOR UPDATE
  USING (("author_id" = mythgard.current_user_id())
         OR
         (exists(select * from mythgard.account_moderator
                 where account_id = mythgard.current_user_id())));
-- Rows can only be deleted by their author
CREATE POLICY deck_delete_if_author
  ON mythgard.deck
  FOR DELETE
  USING ("author_id" = mythgard.current_user_id());

CREATE TABLE mythgard.card_deck (
  id SERIAL PRIMARY KEY,
  quantity integer,
  deck_id integer,
  card_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE,
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id),
  UNIQUE(deck_id, card_id)
);

INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (1, 4, 2);
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (2, 1, 1);
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity")
  VALUES (3, 1, 1), (3, 2, 1), (3, 3, 1), (3, 4, 1), (3, 5, 1), (3, 6, 1), (3, 18, 4);
INSERT INTO mythgard.card_deck("deck_id", "card_id", "quantity") VALUES (4, 1, 1), (4, 2, 1);

ALTER TABLE mythgard.card_deck ENABLE ROW LEVEL SECURITY;
-- Admin users can make any changes and read all rows
CREATE POLICY card_deck_admin_all ON mythgard.card_deck TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY card_deck_all_view ON mythgard.card_deck FOR SELECT USING (true);
-- Only create a card_deck for yourself
CREATE POLICY card_deck_insert_if_author
  ON mythgard.card_deck
  FOR INSERT
    -- make sure deck.author equals mythgard.current_user_id
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be updated by their author
CREATE POLICY card_deck_update_if_author
  ON mythgard.card_deck
  FOR UPDATE
  WITH CHECK (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));
-- Rows can only be deleted by their author
CREATE POLICY card_deck_delete_if_author
  ON mythgard.card_deck
  FOR DELETE
  USING (exists(select deck.author_id, deck.id from mythgard.deck
                     where deck.author_id = mythgard.current_user_id()
                     AND "deck_id" = deck.id));

CREATE OR REPLACE FUNCTION mythgard.update_deck_and_remove_cards (
  _id integer,
  _name varchar(255),
  _path_id integer,
  _power_id integer,
  _archetype mythgard.deckArchetype[],
  _type mythgard.deckType[]
)
RETURNS mythgard.deck as $$
  DELETE FROM mythgard.card_deck
    WHERE deck_id = _id;
  UPDATE mythgard.deck
    SET name = _name,
        path_id = _path_id,
        power_id = _power_id,
        archetype = _archetype,
        type = _type
    WHERE id = _id
    RETURNING *
$$ LANGUAGE sql VOLATILE;

CREATE TABLE mythgard.deck_vote (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  account_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE,
  UNIQUE(deck_id, account_id)
);

INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 1);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 2);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (1, 3);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (2, 1);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (2, 2);
INSERT INTO mythgard.deck_vote("deck_id", "account_id") VALUES (3, 1);

CREATE TABLE mythgard.deck_featured (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE
);

INSERT INTO mythgard.deck_featured("deck_id") VALUES (1);

CREATE OR REPLACE FUNCTION mythgard.find_account_or_create_by_google
(
  _google_id varchar(255),
  _email varchar(255),
  _username varchar(255)
)
RETURNS mythgard.account as $$
  INSERT INTO mythgard.account (google_id, email, username) VALUES (_google_id, _email, _username)
    ON CONFLICT (google_id) DO UPDATE SET email = _email
    RETURNING *
$$ LANGUAGE sql VOLATILE;

ALTER TABLE mythgard.account ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY admin_all ON mythgard.account TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY all_view ON mythgard.account FOR SELECT USING (true);
-- Rows can only be updated by their owner
CREATE POLICY accountupdate_if_author
  ON mythgard.account
  FOR UPDATE
  USING ("id" = mythgard.current_user_id())
  WITH CHECK ("id" = mythgard.current_user_id());

ALTER TABLE mythgard.deck_vote ENABLE ROW LEVEL SECURITY;

-- Admin users can make any changes and read all rows
CREATE POLICY deck_vote_admin_all ON mythgard.deck_vote TO admin USING (true) WITH CHECK (true);
-- Non-admins can read all rows
CREATE POLICY deck_vote_all_view ON mythgard.deck_vote FOR SELECT USING (true);
-- Rows can only be updated by their author
-- and users cannot create a row for their own decks
CREATE POLICY deck_vote_insert_if_author
  ON mythgard.deck_vote
  FOR INSERT
  WITH CHECK ((account_id = mythgard.current_user_id())
              AND
              NOT EXISTS(select * from mythgard.deck
                         where id = deck_vote.deck_id
                         and author_id = mythgard.current_user_id()));
CREATE POLICY deck_vote_delete_if_author
  ON mythgard.deck_vote
  FOR DELETE
  USING ("account_id" = mythgard.current_user_id());

CREATE TABLE mythgard.tournament (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  url text,
  organizer varchar(255),
  date date
);

INSERT INTO mythgard.tournament("name", "date", "url", "organizer")
VALUES ('The Battle of Deimos', '2019-07-26', 'http://www.mythgardhub.com', 'mgh'),
  ('The Iron Rain', '3000-01-01', 'http://www.mythgardhub.com', 'rhino games');

CREATE TABLE mythgard.tournament_deck (
  id SERIAL PRIMARY KEY,
  rank integer,
  pilot varchar(255),
  tournament_id integer,
  deck_id integer,
  FOREIGN KEY (tournament_id)
    REFERENCES mythgard.tournament (id)
    ON DELETE CASCADE,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE
);

INSERT INTO mythgard.tournament_deck("rank", "tournament_id", "deck_id", "pilot")
VALUES (1, 1, 1, 'lsv'), (2, 1, 2, 'pvdr');

CREATE TABLE mythgard.faction (
  id SERIAL PRIMARY KEY,
  name varchar(255)
);

INSERT INTO mythgard.faction("name") VALUES ('norden'), ('aztlan'), ('oberos'), ('dreni'), ('parsa'), ('harmony');

CREATE TABLE mythgard.card_faction (
  id SERIAL PRIMARY KEY,
  card_id integer,
  faction_id integer,
  FOREIGN KEY (card_id)
    REFERENCES mythgard.card (id),
  FOREIGN KEY (faction_id)
    REFERENCES mythgard.faction (id)
);

INSERT INTO mythgard.card_faction("card_id","faction_id")
  VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 1),
    (8, 2),
    (9, 3),
    (10, 4),
    (11, 5),
    (12, 6),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1),
    (17, 2),
    (18, 6);

CREATE TABLE mythgard.site_config (
  id SERIAL PRIMARY KEY,
  config jsonb
);

INSERT INTO mythgard.site_config (config) values ('{}');

UPDATE mythgard.site_config set config = $${"topMedia":[{"title":"Nominate Mythgard for Steam's 2019 \"Most Innovative Gameplay\" Award","url":"https://store.steampowered.com/steamawards/nominations?l=english","author":"Mythgard Hub","description":"The Steam Awards are a yearly digital award ceremony where the best games of the year are brought to light. If we can get enough support behind Mythgard, we can grow the community by showing them what we already know. Follow the link and nominate Mythgard today!","date":"2019-11-27T17:24:18.280Z"},{"title":"Player Agency in Mythgard","url":"https://teamrankstar.com/article/player-agency-in-mythgard/","author":"noahc92","description":"Today we’ll be discussing a term that is used often in game design and is really shown off well in Mythgard. Player Agency. What is it? What does it mean? Why does it matter?","date":"2019-10-31T17:24:18.280Z"},{"title":"Deckbuilding 201 - Building on the Basics","url":"https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-201-building-on-the-basics","author":"Minmaxer","description":"In my first series of deckbuilding articles we started by examining the different deck archetypes and what they look like in Mythgard.  From there, I took a tour through each of the five Paths...","date":"2019-10-25T17:24:18.280Z"},{"title":"Getting Started in Mythgard’s 2v2","url":"https://teamrankstar.com/guide/getting-started-in-mythgards-2v2/","author":"erobert","description":"Hey everyone, erobert here with a look at the mechanics and strategies of 2v2! The game mode itself is a raucous and chaotic shootout where you and your partner go head to head with another duo, and while this fun format operates with rules that are...","date":"2019-10-23T17:24:18.280Z"},{"title":"Fast Lane: Thrift Shop","url":"https://teamdgn.net/2019/10/02/fast-lane-thrift-shop/","author":"14ierophant","description":"Ever since middle school, I have been a die hard fan of control in CCGs. I love drawing cards, I love canceling and limiting my opponent’s options, and I love the slow burn of...","date":"2019-10-02T17:24:18.280Z"},{"title":"7 things I wish I knew when I was first starting out in Mythgard","url":"/7-things","author":"AgitatedBadger","description":"A detailed resource for new players that helps fill in the holes of the tutorial","date":"2019-10-01T17:24:18.280Z"},{"title":"Budget Decks for Mythgard - October 2019","url":"https://teamrankstar.com/budget-decks-for-mythgard-october-2019/","author":"noahc92","description":"October! What a fun month... trick-or-treaters, spoopy memes, budget decks... October truly has it all. Let’s sit down to enjoy some candy and talk about what this article is...","date":"2019-09-29T17:24:18.280Z"},{"title":"Lore Broker's Files: Chapter 1","url":"https://teamrankstar.com/budget-decks-for-mythgard-october-2019/","author":"The Mantid Man","description":"The first episode in a brand new series from Team Rankstar that covers the lore of Mythgard in short, easy to take in chunks.","date":"2019-09-29T17:24:18.280Z"},{"title":"The Many Uses of Impel","url":"https://teamdgn.net/2019/09/27/the-many-uses-of-impel/","author":"NowayitsJ","description":"Why Should You Use Impel? Some of you may think, “Wow, Impel doesn’t give me immediate value or combat benefits, movement can’t have that much impact!”  Well in Mythgard...","date":"2019-09-27T17:24:18.280Z"},{"title":"Budget Decks For Mythgard September 2019","url":"https://teamrankstar.com/budget-decks-for-mythgard-september-2019/","author":"noahc92","description":"Closed Beta is finally upon us in the land of Mythgard. With no more account wipe looming, it’s now more important than ever to be smart about building your collection...","date":"2019-09-22T17:24:18.280Z"},{"title":"Yellow-Green Kolobok Ramp","url":"https://teamrankstar.com/yellow-green-kolobok-ramp/","author":"Tenchuu","description":"I was trapped in a loop. I wanted to play big powerful minions and I wanted to play Green...","date":"2019-09-22T17:24:18.280Z"},{"title":"Advanced Lane Mechanics in Mythgard","url":"https://teamrankstar.com/advanced-lane-mechanics-in-mythgard/","author":"noahc92","description":"One of Mythgard’s most distinguishing features is its usage of lanes. This lane system leads to a very large number of nuanced decisions per game...","date":"2019-09-22T17:24:18.280Z"},{"title":"Deckbuilding 105 - What about combo?","url":"https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-105-what-about-combo","author":"Minmaxer","description":"The previous articles in this series examined the spectrum of Aggro, Midrange, and Control.  Combo sits outside the spectrum, and looks to play the game totally differently...","date":"2019-09-22T17:24:18.280Z"},{"title":"Deckbuilding 104 - Control","url":"https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-104-control","author":"Minmaxer","description":"Control decks are in it for the long haul.  Traditionally, they play a patient, defensive game...","date":"2019-09-22T17:24:18.280Z"}]}$$;

ALTER TABLE mythgard.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_config_all_view ON mythgard.site_config FOR SELECT USING (true);

CREATE POLICY update_site_config_if_moderator
  ON mythgard.site_config
  FOR UPDATE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

-- Save deck modification time so decks can be searched by last update time
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
      NEW.modified = now();
      RETURN NEW;
   ELSE
      RETURN OLD;
   END IF;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION mythgard.deck_essence_cost (IN deckId INTEGER)
RETURNS INTEGER AS $$
  DECLARE
    essence_cost INTEGER;
  BEGIN
    SELECT sum(essence_costs.essence * card_deck.quantity)::int into essence_cost
    FROM mythgard.deck
    JOIN mythgard.card_deck
      ON card_deck.deck_id = deck.id
    JOIN mythgard.card
      ON card_deck.card_id = card.id
    LEFT JOIN mythgard.essence_costs
      On essence_costs.rarity = card.rarity
    WHERE deck.id = $1
    GROUP BY deck.id;

    RETURN essence_cost;
  END;
  $$ language 'plpgsql';

CREATE OR REPLACE FUNCTION mythgard.deck_votes (IN deckId INTEGER)
RETURNS INTEGER AS $$
  DECLARE
    votes INTEGER;
  BEGIN
    SELECT count(DISTINCT deck_vote)::int into votes
    FROM mythgard.deck
   LEFT JOIN mythgard.deck_vote
     On deck_vote.deck_id = deck.id
   WHERE deck.id = $1
   GROUP BY deck.id;

    RETURN votes;

  END;
  $$ language 'plpgsql';

-- reddit's hotness algorithm, allegedly
-- https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
-- def hot(ups, downs, date):
--     s = score(ups, downs) // This is ups - downs for reddit, but we don't have downvotes
--     order = log(max(abs(s), 1), 10)
--     sign = 1 if s > 0 else -1 if s < 0 else 0
--     seconds = epoch_seconds(date) - 1134028003
--     return round(sign * order + seconds / 45000, 7)
create function mythgard.epochSeconds(timestamp) returns int as $$
  select extract(epoch from $1)::int;
$$ language sql stable;

-- we do log2(n+1) instead of log10(n) since we get fewer votes than reddit
create function mythgard.hotnessOrder(votes integer) returns numeric as $$
  select log(2, greatest(votes + 1, 1));
$$ language sql stable;

create function mythgard.hotnessSign(votes integer) returns integer as $$
  select(case when votes > 0 then 1 else 0 end);
$$ language sql stable;

create function mythgard.hotnessSeconds(creation timestamp) returns integer as $$
  select(mythgard.epochSeconds(creation) - 1134028003);
$$ language sql stable;

-- We inflate hotnessSeconds divisor by a lot. Reddit's is 45000. We want good decks
-- to stay on the front page for several days
create function mythgard.hotness(votes integer, creation timestamp) returns double precision as $$

  select round(
    ((mythgard.hotnessSign(votes) * mythgard.hotnessOrder(votes))
      + (mythgard.hotnessSeconds(creation) / 5 / 45000))::numeric
  , 7)::double precision;

$$ language sql stable;

create function mythgard.deck_hotness(deckId integer) returns double precision as $$

  select mythgard.hotness(mythgard.deck_votes(deckId), created)
  from mythgard.deck
  where deck.id = deckId;

$$ language sql stable;

-- useful function to run on production for evaluating results
-- select mythgard.deck_hotness(deck.id), mythgard.deck_votes(deck.id), created, name from mythgard.deck order by mythgard.deckHotness(deck.id) desc limit 20;

create or replace function mythgard.deck_factions(deckId integer) returns  character varying[] as $$
  select(array_agg(distinct faction.name))
  from mythgard.deck
  left join mythgard.card_deck on card_deck.deck_id = deck.id
  left join mythgard.card on card.id = card_deck.card_id
  left join mythgard.card_faction on card_faction.card_id = card.id
  left join mythgard.faction on faction.id = card_faction.faction_id
  where mythgard.deck.id = deckId
  and faction.name is not null;
$$ language sql stable;

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         mythgard.deck_factions(deck.id) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes,
         deck.archetype as deck_archetype,
         deck.type as deck_type,
         deck.modified as deck_modified,
         account.id as account_id,
         account.username as username,
         mythgard.deck_hotness(deck.id)::int as hotness
  FROM mythgard.deck
  LEFT JOIN mythgard.account
  ON mythgard.account.id = mythgard.deck.author_id
;

-- See https://www.graphile.org/postgraphile/smart-comments/#foreign-key
-- But basically is for postgraphile to see relation to deck
comment on view mythgard.deck_preview is E'@foreignKey (deck_id) references mythgard.deck';

CREATE TRIGGER update_deck_modtime
  BEFORE UPDATE ON mythgard.deck
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- INDEXES FOR QUERIES

CREATE INDEX deck_name_index ON mythgard.deck
    USING gin(to_tsvector('simple',deck.name));
CREATE INDEX author_name_index ON mythgard.account
    USING gin(to_tsvector('simple',account.username));

-- CUSTOM QUERIES FOR GRAPHQL

--                            search_decks
--         searches for decks (advanced search with several criteria)
-- RETURNS setof deck
-- PARAMS:
-- deckName    str or null - name of deck (prefix only, so finds dragons given drag but not given rag)
-- authorName  str or null - name of author (prefix only, so finds alex given al but not given lex)
-- deckModified str or null - modified on or after given date (e.g. "2019-07-11")
-- card1       int or null - id of card being searched for (search supports at most 5 cards)
-- card2       int or null - id of card being searched for (search supports at most 5 cards)
-- card3       int or null - id of card being searched for (search supports at most 5 cards)
-- card4       int or null - id of card being searched for (search supports at most 5 cards)
-- card5       int or null - id of card being searched for (search supports at most 5 cards)
-- faction1    int or null - id of a faction that deck must contain
-- faction2    int or null - id of a faction that deck must contain
-- faction3    int or null - id of a faction that deck must contain
-- faction4    int or null - id of a faction that deck must contain
-- faction5    int or null - id of a faction that deck must contain
-- faction6    int or null - id of a faction that deck must contain
-- numFactions int or null - number of specified factions. Omit to allow more factions than specifed.
-- archetype   mythgard.deckArchetype or null - array of archetypes to filter by
-- type        mythgard.deckType or null - array of types to filter by
create or replace function mythgard.search_decks_nosort(
  deckName varchar(255),
  authorName varchar(255),
  deckModified date,
  card1 integer,
  card2 Integer,
  card3 Integer,
  card4 Integer,
  card5 Integer,
  faction1 integer,
  faction2 integer,
  faction3 integer,
  faction4 integer,
  faction5 integer,
  faction6 integer,
  numFactions integer,
  archetypeFilter mythgard.deckArchetype[],
  typeFilter mythgard.deckType[])
  returns setof mythgard.deck as $$

    SELECT deck.* FROM mythgard.deck
      LEFT JOIN mythgard.card_deck ON (card_deck.deck_id = deck.id)
      LEFT JOIN mythgard.card ON (card.id = card_deck.card_id)
      LEFT JOIN mythgard.account ON (account.id = deck.author_id)

    -- deck name filter
    WHERE (deckName is NULL or trim(deckName) = '' or to_tsvector('simple', deck.name) @@ to_tsquery('simple', replace(regexp_replace(trim(deckName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- author name filter
    AND (authorName is NULL or trim(authorName) = '' or to_tsvector('simple', account.username) @@ to_tsquery('simple', replace(regexp_replace(trim(authorName), '\s+', ' ', 'g'), ' ', ':* & ') || ':*'))
    -- modification date filter
    AND (deckModified is NULL or deck.modified >= deckModified)
    -- archetype filter
    AND (archetypeFilter is NULL or deck.archetype = archetypeFilter)
    -- type filter
    AND (typeFilter is NULL or deck.type = typeFilter)

    intersect

    -- cards filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card1 is null or card.id = card1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card2 is null or card.id = card2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card3 is null or card.id = card3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card4 is null or card.id = card4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id)
    where card5 is null or card.id = card5

    intersect

    -- factions filter
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    group by deck.id
    having numFactions is NULL or numFactions = 0 or count(distinct faction.id) = numFactions
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction1 is null or faction.id = faction1
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction2 is null or faction.id = faction2
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction3 is null or faction.id = faction3
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction4 is null or faction.id = faction4
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction5 is null or faction.id = faction5
    intersect
    SELECT deck.* from mythgard.deck left join mythgard.card_deck on (deck.id = card_deck.deck_id) left join mythgard.card on (card.id = card_deck.card_id) left join mythgard.card_faction on (card.id = card_faction.card_id) left join mythgard.faction on (faction.id = card_faction.faction_id)
    where faction6 is null or faction.id = faction6

    GROUP BY deck.id
    LIMIT 2000;
  $$ language sql stable;

create or replace function mythgard.search_decks(
  deckName varchar(255),
  authorName varchar(255),
  deckModified date,
  card1 integer,
  card2 Integer,
  card3 Integer,
  card4 Integer,
  card5 Integer,
  faction1 integer,
  faction2 integer,
  faction3 integer,
  faction4 integer,
  faction5 integer,
  faction6 integer,
  numFactions integer,
  archetypeFilter mythgard.deckArchetype[],
  typeFilter mythgard.deckType[],
  sortBy text)
  returns setof mythgard.deck as $$

  BEGIN
       IF sortBy = 'essenceDesc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec desc nulls last) as bar;
       ELSIF sortBy = 'essenceAsc' THEN
        RETURN QUERY select id, name, author_id, path_id, power_id, modified, created, description, archetype, type
          from ( select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as foo,
                  mythgard.deck_essence_cost(foo.id) as dec
                  order by dec asc nulls last) as bar;
       ELSIF sortBy = 'ratingDesc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount desc nulls last;
       ELSIF sortBy = 'ratingAsc' THEN
        RETURN QUERY select deck.* from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) as deck
          LEFT JOIN
          (SELECT count(*) as voteCount, deck_id from mythgard.deck_vote group by deck_id) as deckVotes
          on deckVotes.deck_id = deck.id
          where deck.id is not null
          order by voteCount asc nulls first;
       ELSIF sortBy = 'nameAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) asc;
       ELSIF sortBy = 'nameDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by lower(name) desc;
       ELSIF sortBy = 'dateDesc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created desc;
       ELSIF sortBy = 'dateAsc' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by created asc;
       ELSIF sortBy = 'hot' THEN
         RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter) order by mythgard.deck_hotness(id) desc;
       ELSE
          RETURN QUERY select * from mythgard.search_decks_nosort(deckName, authorName, deckModified, card1,
                  card2, card3, card4, card5, faction1, faction2, faction3, faction4, faction5,
                  faction6, numFactions, archetypeFilter, typeFilter);
       END IF;
       RETURN;
   END

  $$ language plpgsql stable;

-- END QUERIES

CREATE USER postgraphile WITH password 'bears4life';
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO postgraphile;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO postgraphile;

-- The Postgraphile user needs privileges to set role for itself
GRANT authd_user TO postgraphile;
GRANT anon_user TO postgraphile;

GRANT ALL PRIVILEGES ON SCHEMA mythgard TO admin;
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON SCHEMA mythgard TO anon_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO authd_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA mythgard TO anon_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO authd_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA mythgard TO anon_user;

-- Set specific permissions for sensitive tables
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM authd_user;
REVOKE ALL PRIVILEGES ON TABLE mythgard.account FROM anon_user;

GRANT SELECT ON TABLE mythgard.account TO authd_user;
GRANT UPDATE (username) ON TABLE mythgard.account TO authd_user;
GRANT SELECT (id, username) ON TABLE mythgard.account TO anon_user;

\echo 'Remember to update the postgraphile users pw with the production version in the kubernetes secrets file.';
