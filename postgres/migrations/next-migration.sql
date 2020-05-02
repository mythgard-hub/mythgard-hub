CREATE TABLE mythgard.deck_views (
  id SERIAL PRIMARY KEY,
  deck_id integer,
  views integer,
  FOREIGN KEY (deck_id)
    REFERENCES mythgard.deck (id)
    ON DELETE CASCADE
);

ALTER TABLE mythgard.deck_views ADD CONSTRAINT deckIdUniqVote UNIQUE (deck_id);

CREATE OR REPLACE FUNCTION mythgard.increase_deck_views (IN deckid INTEGER)
RETURNS INTEGER AS $$
  INSERT INTO mythgard.deck_views(deck_id, views) VALUES (deckid, 1)
  ON CONFLICT (deck_id)
  DO UPDATE SET views = 1 + (
    SELECT views
    FROM mythgard.deck_views
    WHERE deck_views.deck_id = deckid
  );

  SELECT views
  FROM mythgard.deck_views
  WHERE deck_views.deck_id = deckid;
$$ language sql VOLATILE SECURITY DEFINER;

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
         mythgard.deck_hotness(deck.id)::int as hotness,
         deck_views.views::int as views
  FROM mythgard.deck
  LEFT JOIN mythgard.account
  ON mythgard.account.id = mythgard.deck.author_id
  LEFT JOIN mythgard.deck_views
  ON mythgard.deck_views.deck_id = mythgard.deck.id
;