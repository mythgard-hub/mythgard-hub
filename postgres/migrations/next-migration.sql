ALTER TABLE deck
ADD COLUMN views integer default 0;

CREATE OR REPLACE FUNCTION mythgard.increase_deck_views (IN deckid INTEGER)
RETURNS INTEGER AS $$

  UPDATE mythgard.deck SET views = views + 1
  WHERE deck.id = deckid;

  SELECT views
  FROM mythgard.deck
  WHERE deck.id = deckid;
$$ language sql VOLATILE SECURITY DEFINER;