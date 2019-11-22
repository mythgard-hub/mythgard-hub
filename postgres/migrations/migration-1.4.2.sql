-- migration 1.4.2 (edit me)
ALTER TABLE mythgard.deck
ADD COLUMN description varchar(6000);

CREATE TABLE mythgard.account_moderator (
  id SERIAL PRIMARY KEY,
  account_id integer,
  FOREIGN KEY (account_id)
    REFERENCES mythgard.account (id)
    ON DELETE CASCADE);


DROP POLICY deck_update_if_author on deck;
CREATE POLICY deck_update_if_author_or_mod
  ON mythgard.deck
  FOR UPDATE
  USING (("author_id" = mythgard.current_user_id())
         OR
         (exists(select * from mythgard.account_moderator
                 where account_id = mythgard.current_user_id())));
