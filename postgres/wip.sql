-- reddit's hotness algorithm, allegedly
-- def hot(ups, downs, date):
--     s = score(ups, downs)
--     order = log(max(abs(s), 1), 10)
--     sign = 1 if s > 0 else -1 if s < 0 else 0
--     seconds = epoch_seconds(date) - 1134028003
--     return round(sign * order + seconds / 45000, 7)
start transaction;
drop function if exists mythgard.epochSeconds;
create function mythgard.epochSeconds(timestamp) returns int as $$
  select extract(epoch from $1)::int;
$$ language sql;

drop function if exists mythgard.hotnessOrder;
create function mythgard.hotnessOrder(votes integer) returns integer as $$
  select greatest(votes, 1);
$$ language sql;

drop function if exists mythgard.hotnessSign;
create function mythgard.hotnessSign(votes integer) returns integer as $$
  select(case when votes > 0 then 1 else 0 end);
$$ language sql;

drop function if exists mythgard.hotnessSeconds;
create function mythgard.hotnessSeconds(creation timestamp) returns integer as $$
  select(mythgard.epochSeconds(creation) - 1134028003);
$$ language sql;

drop function if exists mythgard.hotness;
create function mythgard.hotness(votes integer, creation timestamp) returns double precision as $$

  select round(
    ((mythgard.hotnessSign(votes) * mythgard.hotnessOrder(votes))
      + (mythgard.hotnessSeconds(creation) / 185000))::numeric
  , 7)::double precision;

$$ language sql;

drop function if exists mythgard.deckHotness;
create function mythgard.deckHotness(deckId integer) returns double precision as $$

  select mythgard.hotness(mythgard.deck_votes(deckId), created)
  from mythgard.deck
  where deck.id = deckId;

$$ language sql;

select  mythgard.deckHotness(deck.id), mythgard.deck_votes(deck.id), created, name from mythgard.deck order by mythgard.deckHotness(deck.id) desc limit 20;

rollback;
