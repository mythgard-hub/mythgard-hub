drop function if exists mythgard.epochSeconds;
create function mythgard.epochSeconds(timestamp) returns int as $$
  select extract(epoch from $1)::int;
$$ language sql;

drop function if exists mythgard.deckCreatedEpochSeconds;
create function mythgard.deckCreatedEpochSeconds(deckid integer) returns int as $$

  select mythgard.epochSeconds(max(deck.created)) from mythgard.deck where deck.id = deckid;

$$ language sql;

drop function if exists mythgard.hotness;

create function mythgard.hotness(deckid integer) returns int as $$
  select mythgard.deckCreatedEpochSeconds(deckid);
$$ language sql;

select * FROM mythgard.hotness(1);
