CREATE TABLE mythgard.site_config (
  id SERIAL PRIMARY KEY,
  config jsonb
);

INSERT INTO mythgard.site_config (config) values ('{}');

UPDATE mythgard.site_config set config = $${"topMedia":[{"url":"https://store.steampowered.com/steamawards/nominations?l=english","date":"2019-11-27T17:24:18.280Z","title":"Nominate Mythgard for Steam's 2019 \"Most Innovative Gameplay\" Award","author":"Mythgard Hub","description":"The Steam Awards are a yearly digital award ceremony where the best games of the year are brought to light. If we can get enough support behind Mythgard, we can grow the community by showing them what we already know. Follow the link and nominate Mythgard today!"},{"url":"https://teamrankstar.com/article/player-agency-in-mythgard/","date":"2019-10-31T17:24:18.280Z","title":"Player Agency in Mythgard","author":"noahc92","description":"Today we’ll be discussing a term that is used often in game design and is really shown off well in Mythgard. Player Agency. What is it? What does it mean? Why does it matter?"},{"url":"https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-201-building-on-the-basics","date":"2019-10-25T17:24:18.280Z","title":"Deckbuilding 201 - Building on the Basics","author":"Minmaxer","description":"In my first series of deckbuilding articles we started by examining the different deck archetypes and what they look like in Mythgard.  From there, I took a tour through each of the five Paths..."},{"url":"https://teamrankstar.com/guide/getting-started-in-mythgards-2v2/","date":"2019-10-23T17:24:18.280Z","title":"Getting Started in Mythgard’s 2v2","author":"erobert","description":"Hey everyone, erobert here with a look at the mechanics and strategies of 2v2! The game mode itself is a raucous and chaotic shootout where you and your partner go head to head with another duo, and while this fun format operates with rules that are..."}]}$$;

ALTER TABLE mythgard.site_config ENABLE ROW LEVEL SECURITY;


GRANT SELECT ON TABLE mythgard.site_config TO admin, authd_user, anon_user;
GRANT UPDATE (config) ON TABLE mythgard.site_config TO authd_user;

CREATE POLICY update_site_config_if_moderator
  ON mythgard.site_config
  FOR UPDATE
  USING (exists(select * from mythgard.account_moderator
         where account_id = mythgard.current_user_id()));

CREATE POLICY site_config_all_view ON mythgard.site_config FOR SELECT USING (true);
