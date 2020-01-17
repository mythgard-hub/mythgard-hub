drop function if exists mythgard.hotnessOrder;
create function mythgard.hotnessOrder(votes integer) returns integer as $$
  select log(2, greatest(votes + 1, 1))::int;
$$ language sql stable;

drop function if exists mythgard.hotness;
create function mythgard.hotness(votes integer, creation timestamp) returns double precision as $$

  select round(
    ((mythgard.hotnessSign(votes) * mythgard.hotnessOrder(votes))
      + (mythgard.hotnessSeconds(creation) / 5 / 45000))::numeric
  , 7)::double precision;

$$ language sql stable;
