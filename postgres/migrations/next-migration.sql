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
         account.account_type as account_type,
         account.profile_icon_id as profile_icon_id,
         mythgard.deck_hotness(deck.id)::int as hotness,
         deck_views.views::int as views,
         path.name as path_name,
         power.name as power_name
  FROM mythgard.deck
  LEFT JOIN mythgard.account
  ON mythgard.account.id = mythgard.deck.author_id
  LEFT JOIN mythgard.deck_views
  ON mythgard.deck_views.deck_id = mythgard.deck.id
  LEFT JOIN mythgard.path
  ON mythgard.path.id = mythgard.deck.path_id
  LEFT JOIN mythgard.power
  ON mythgard.power.id = mythgard.deck.power_id
;