CREATE TYPE mythgard.deck_archetype as ENUM ('UNKNOWN', 'AGGRO', 'MIDRANGE', 'CONTROL', 'COMBO');

CREATE TYPE mythgard.deck_type as ENUM ('STANDARD', 'GAUNTLET', 'TOURNAMENT');

ALTER TABLE deck
ADD COLUMN archetype mythgard.deck_archetype[] NOT NULL DEFAULT ARRAY['UNKNOWN']::mythgard.deck_archetype[],
ADD COLUMN type mythgard.deck_type[] NOT NULL DEFAULT ARRAY['STANDARD']::mythgard.deck_type[];