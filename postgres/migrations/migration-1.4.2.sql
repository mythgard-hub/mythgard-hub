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

CREATE OR REPLACE VIEW mythgard.deck_preview as
  SELECT deck.id as deck_id,
         deck.name as deck_name,
         deck.created as deck_created,
         array_agg(DISTINCT faction.name) as factions,
         mythgard.deck_essence_cost(deck.id)::int as essence_cost,
         mythgard.deck_votes(deck.id)::int as votes
  FROM mythgard.deck
  JOIN mythgard.card_deck
    ON card_deck.deck_id = deck.id
  JOIN mythgard.card
    ON card_deck.card_id = card.id
  LEFT JOIN mythgard.card_faction
    ON (card.id = card_faction.card_id and card_faction.faction_id is not null)
  LEFT JOIN mythgard.faction
    On faction.id = card_faction.faction_id
 GROUP BY deck.id
;

create or replace function mythgard.search_decks_nosort(deckName varchar(255), authorName varchar(255), deckModified date, card1 integer, card2 Integer, card3 Integer, card4 Integer, card5 Integer, faction1 integer, faction2 integer, faction3 integer, faction4 integer, faction5 integer, faction6 integer, numFactions integer)
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
