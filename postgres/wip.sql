-- def hot(ups, downs, date):
--     s = score(ups, downs)
--     order = log(max(abs(s), 1), 10)
--     sign = 1 if s > 0 else -1 if s < 0 else 0
--     seconds = epoch_seconds(date) - 1134028003
--     return round(sign * order + seconds / 45000, 7)


drop function if exists mythgard.epochSeconds;
create function mythgard.epochSeconds(timestamp) returns int as $$
  select extract(epoch from $1)::int;
$$ language sql;

drop function if exists mythgard.hotness;
create function mythgard.hotness(ups integer, creation timestamp) returns int as $$

  select mythgard.epochSeconds(creation);

$$ language sql;

drop function if exists mythgard.deckHotness;
create function mythgard.deckHotness(deckId integer) returns int as $$

  select mythgard.hotness(mythgard.deck_votes(deckId), created)
  from mythgard.deck
  where deck.id = deckId;

$$ language sql;

select * FROM mythgard.deckHotness(1);
