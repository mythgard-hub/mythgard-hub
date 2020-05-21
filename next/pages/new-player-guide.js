import { useContext } from 'react';
import Layout from '../components/layout';
import { mgColors } from '../lib/theme.js';
import { ThemeContext } from '../components/theme-context';
import PageBanner from '../components/page-banner';
import { DECK_SIZES } from '../constants/deck';

function NewPlayerGuide() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Layout
        title="Mythgard Hub | New Player Guide"
        desc="Mythgard New Player Guide"
      >
        <style jsx>{`
          a {
            color: ${mgColors.orange};
          }

          a:hover {
            color: ${theme.fontColorSelected};
          }

          ul {
            margin-top: 0;
            padding: 0;
            list-style-type: none;
            margin-left: 25px;
          }

          figure {
            margin: 0;
          }

          table.npg {
            padding: 10px;
            text-align: center;
            font-size: 0.8em;
            margin: auto;
            border-collapse: collapse;
          }

          td.path {
            padding: 10px;
          }
        `}</style>
        <PageBanner image={PageBanner.IMG_ARTICLES}>Media</PageBanner>
        <br />
        <div className="toc_column">
          This article was produced in collaboration with{' '}
          <a
            href="https://teamrankstar.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Team Rankstar
          </a>
          <div className="article_title">Mythgard New Player Guide</div>
          <span style={{ fontStyle: 'italic' }}>September 19, 2019 </span>
          by <span style={{ color: '#F1810B' }}>noahc92</span>
          <table className="toc">
            <tr>
              <td>
                <ul className="toc">
                  <li>
                    <a href="#Table_of_Contents" title="Table of Contents">
                      1. Table of Contents
                    </a>
                  </li>
                  <li>
                    <a href="#Introduction" title="Introduction">
                      2. Introduction
                    </a>
                    <ul>
                      <li>
                        <a href="#Where_To_Play" title="Where To Play">
                          2.1 Where To Play
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#Game_Overview" title="Game Overview">
                      3. Game Overview
                    </a>
                    <ul>
                      <li>
                        <a href="#How_To_Play" title="How To Play">
                          3.1. How To Play
                        </a>
                        <ul>
                          <li>
                            <a href="#Card_Types" title="Card Types">
                              3.1.1. Card Types
                            </a>
                          </li>
                          <li>
                            <a href="#Card_Anatomy" title="Card Anatomy">
                              3.1.2. Card Anatomy
                            </a>
                          </li>
                          <li>
                            <a href="#Resource_System" title="Resource System">
                              3.1.3. Resource System
                            </a>
                          </li>
                          <li>
                            <a href="#Card_Burning" title="Card Burning">
                              3.1.4. Card Burning
                            </a>
                          </li>
                          <li>
                            <a href="#Playable_Cards" title="Playable Cards">
                              3.1.5. Playable Cards
                            </a>
                          </li>
                          <li>
                            <a href="#Playing_Cards" title="Playing Cards">
                              3.1.6. Playing Cards
                            </a>
                          </li>
                          <li>
                            <a
                              href="#Area_of_Influence"
                              title="Area of Influence"
                            >
                              3.1.7. Area of Influence
                            </a>
                          </li>
                          <li>
                            <a href="#Attacking" title="Attacking">
                              3.1.8. Attacking
                            </a>
                          </li>
                          <li>
                            <a href="#Moving" title="Moving">
                              3.1.9. Moving
                            </a>
                          </li>
                          <li>
                            <a href="#Combat" title="Combat">
                              3.1.10. Combat
                            </a>
                          </li>
                          <li>
                            <a href="#Abilities" title="Abilities">
                              3.1.11. Abilities
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="#Action_Breakdown"
                                  title="Action Breakdown"
                                >
                                  3.1.11.1 Action Breakdown
                                </a>
                              </li>
                              <li>
                                <a href="#Misc_Keywords" title="Misc. Keywords">
                                  3.1.11.2 Misc. Keywords
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#Card_Rarity" title="Card Rarity">
                          3.2. Card Rarity
                        </a>
                      </li>
                      <li>
                        <a href="#Paths" title="Paths">
                          3.3. Paths
                        </a>
                        <ul>
                          <li>
                            <a
                              href="#Disk_of_Circadia"
                              title="Disk of Circadia"
                            >
                              3.3.1 Disk of Circadia
                            </a>
                          </li>
                          <li>
                            <a
                              href="#Fires_of_Creation"
                              title="Fires of Creation"
                            >
                              3.3.2 Fires of Creation
                            </a>
                          </li>
                          <li>
                            <a
                              href="#Journey_of_Souls"
                              title="Journey of Souls"
                            >
                              3.3.3 Journey of Souls
                            </a>
                          </li>
                          <li>
                            <a href="#Rainbows_End" title="Rainbow&#8217;s End">
                              3.3.4 Rainbow&#8217;s End
                            </a>
                          </li>
                          <li>
                            <a href="#Turn_of_Seasons" title="Turn of Seasons">
                              3.3.5 Turn of Seasons
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>

              <td>
                <ul className="toc">
                  <li>
                    <a href="#Powers" title="Powers">
                      3.4. Powers
                    </a>
                    <ul>
                      <li>
                        <a href="#Foresight" title="Foresight">
                          3.4.1 Foresight
                        </a>
                      </li>
                      <li>
                        <a href="#Impel" title="Impel">
                          3.4.2 Impel
                        </a>
                      </li>
                      <li>
                        <a href="#Infuse" title="Infuse">
                          3.4.3 Infuse
                        </a>
                      </li>
                      <li>
                        <a href="#Mend" title="Mend">
                          3.4.4 Mend
                        </a>
                      </li>
                      <li>
                        <a href="#Reconstruct" title="Reconstruct">
                          3.4.5 Reconstruct
                        </a>
                      </li>
                      <li>
                        <a href="#Smite" title="Smite">
                          3.4.6 Smite
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="#Deck_Building" title="Deck Building">
                      3.5. Deck Building
                    </a>
                    <ul>
                      <li>
                        <a
                          href="#Number_of_Cards_per_Rarity"
                          title="Number of Cards per Rarity"
                        >
                          3.5.1 Number of Cards per Rarity
                        </a>
                      </li>
                      <li>
                        <a href="#Essence_Values" title="Essence Values">
                          3.5.2 Essence Values
                        </a>
                      </li>
                      <li>
                        <a href="#Wildcards" title="Wildcards">
                          3.5.3 Wildcards
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="#Game_Economy" title="Game Economy">
                      4. Game Economy
                    </a>
                    <ul>
                      <li>
                        <a href="#Coins" title="Coins">
                          4.1 Coins
                        </a>
                      </li>
                      <li>
                        <a href="#Mythril" title="Mythril">
                          4.2 Mythril
                        </a>
                      </li>
                      <li>
                        <a href="#Maat" title="Maat">
                          4.3 Maat
                        </a>
                      </li>
                      <li>
                        <a href="#Coin_Acquisition" title="Coin Acquisition">
                          4.4 Coin Acquisition
                        </a>
                        <ul>
                          <li>
                            <a href="#Missions" title="Missions">
                              4.4.1. Missions
                            </a>
                          </li>
                          <li>
                            <a href="#Achievements" title="Achievements">
                              4.4.2. Achievements
                            </a>
                          </li>
                          <li>
                            <a href="#Game_Rewards" title="Game Rewards">
                              4.4.3. Game Rewards
                            </a>
                          </li>
                          <li>
                            <a href="#Weekly_Chest" title="Weekly Chest">
                              4.4.4. Weekly Chest
                            </a>
                          </li>
                          <li>
                            <a
                              href="#Level_Up_Rewards"
                              title="Level Up Rewards"
                            >
                              {' '}
                              4.4.5. Level Up Rewards
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#Coin_Spending" title="Coin Spending">
                          4.5 Coin Spending
                        </a>
                        <ul>
                          <li>
                            <a href="#Packs" title="Packs">
                              4.5.1 Packs
                            </a>
                          </li>
                          <li>
                            <a href="#Arena" title="Arena">
                              4.5.2 Arena
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>

              <td>
                <ul className="toc">
                  <li>
                    <a href="#Game_Modes" title="Game Modes">
                      5. Game Modes
                    </a>
                    <ul>
                      <li>
                        <a href="#Story_Mode" title="Story Mode">
                          5.1 Story Mode
                        </a>
                      </li>
                      <li>
                        <a href="#Casual" title="Casual">
                          5.2 Casual
                        </a>
                      </li>
                      <li>
                        <a href="#Ranked" title="Ranked">
                          5.3 Ranked
                        </a>
                      </li>
                      <li>
                        <a href="#Melee_2v2" title="Melee (2v2)">
                          5.4 Melee (2v2)
                        </a>
                      </li>
                      <li>
                        <a href="#Brawl_vs_AI" title="Brawl (vs AI)">
                          5.5 Brawl (vs AI)
                        </a>
                      </li>
                      <li>
                        <a href="#Puzzle" title="Puzzle">
                          5.6 Puzzle
                        </a>
                      </li>
                      <li>
                        <a href="#Gauntlet" title="Gauntlet">
                          5.7 Gauntlet
                        </a>
                      </li>
                      <li>
                        <a href="#Arena-2" title="Arena">
                          5.8 Arena
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#First_Hours" title="First Hours">
                      6.0 First Hours
                    </a>
                    <ul>
                      <li>
                        <a
                          href="#Story_Mode_Completion"
                          title="Story Mode Completion"
                        >
                          6.1 Story Mode Completion
                        </a>
                      </li>
                      <li>
                        <a
                          href="#Puzzle_Mode_Completion"
                          title="Puzzle Mode Completion"
                        >
                          6.2 Puzzle Mode Completion
                        </a>
                      </li>
                      <li>
                        <a
                          href="#Gauntlet_Mode_Leveling"
                          title="Gauntlet Mode Leveling"
                        >
                          6.3 Gauntlet Mode Leveling
                        </a>
                      </li>
                      <li>
                        <a href="#Starting_Missions" title="Starting Missions">
                          6.4 Starting Missions
                        </a>
                      </li>
                      <li>
                        <a href="#Faction_Missions" title="Faction Missions">
                          6.5 Faction Missions
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#Important_Links" title="Important Links">
                      7.0 Important Links
                    </a>
                    <ul>
                      <li>
                        <a href="#Official_Sources" title="Official Sources">
                          7.1 Official Sources
                        </a>
                      </li>
                      <li>
                        <a
                          href="#Deck_BuildersTournament_Sites"
                          title="Deck Builders/Tournament Sites"
                        >
                          7.2 Deck Builders/Tournament Sites
                        </a>
                      </li>
                      <li>
                        <a href="#Written_Articles" title="Written Articles">
                          7.3 Written Articles
                        </a>
                      </li>
                      <li>
                        <a href="#Live_Streams" title="Live Streams">
                          7.4 Live Streams
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
        <div className="articles_column">
          <br />
          <br />

          <h1>
            <span id="Introduction">Introduction</span>
          </h1>

          <p>
            Mythgard is a new CCG from Rhino Games that is freshly in Open Beta!
            It is an original property from a dedicated team of industry
            veterans passionate about making the CCG they always wanted to play
            themselves! Players will be able to immerse themselves in the lush
            artwork and story, following motorcycle riding Valkyries of Norden
            and Ved’ma witches of Dreni!{' '}
          </p>

          <h2>
            <span id="Where_To_Play">Where To Play</span>
          </h2>

          <p>
            Mythgard is currently available on{' '}
            <a
              rel="noreferrer noopener"
              aria-label="Steam (opens in a new tab)"
              href="https://store.steampowered.com/app/839910/Mythgard/"
              target="_blank"
            >
              Steam
            </a>
            ,{' '}
            <a
              rel="noreferrer noopener"
              aria-label="iOS (opens in a new tab)"
              href="https://apps.apple.com/us/app/mythgard/id1404458505"
              target="_blank"
            >
              iOS
            </a>
            ,{' '}
            <a
              rel="noreferrer noopener"
              aria-label="Android (opens in a new tab)"
              href="https://play.google.com/store/apps/details?id=com.rhinogamesinc.mythgard"
              target="_blank"
            >
              Android
            </a>
            , and can be played in your{' '}
            <a
              rel="noreferrer noopener"
              aria-label="browser. (opens in a new tab)"
              href="https://www.mythgardgame.com/"
              target="_blank"
            >
              browser
            </a>
            . Rhino Games is currently focusing all efforts on rolling out Open
            Beta, but localization is on the roadmap for some point in the
            future and as the game grows, it may also expand to consoles!
          </p>

          <h1>
            <span id="Game_Overview">Game Overview</span>
          </h1>

          <p>
            While many parts of Mythgard will feel familiar to experienced card
            game players, two features in particular deserve attention in
            getting started with the game: The resource system and the Game
            Board itself. Cards are sorted into one of six colors—Blue, Yellow,
            Red, Green, Orange, and Purple—and will have a cost represented with
            both Gems and Mana. Cards in hand can also be “burned” giving you
            one additional Mana and one additional Gem to spend each turn.
            Because of this flexible resource system, there are no dedicated
            resource cards and gameplay and deck design can more fluidly and
            smoothly evolve without having to worry about balancing resource
            cards. Cards can only be burned once and a burned card can be
            identified by the right-hand gem being broken. Upon being burned, a
            card is reinserted into the deck.. Mana can also be used to activate
            player Powers. Some Minions and Artifacts also have abilities that
            can be activated by paying a cost of Gems, Mana, or both.{' '}
          </p>
        </div>
        <img
          className="article"
          src="https://cdn.mythgardhub.com/articles/guide1.png"
        />
        <div className="article_caption">
          Your Gem Bar shows the Gems you have available and your Mana Circle
          shows your available Mana
        </div>
        <div className="articles_column">
          <p>
            The Game Board itself functions like the Battlefield in Magic, a
            place where Minions are summoned and combat takes place. What is
            specific to this zone in Mythgard blocking is determined by position
            rather than keywords or phases of combat. The board itself is
            divided into 7 Lanes for each player, and minions must be played
            into one of these Lanes. Minions may attack into any of the three
            opposing lanes but may be required to first dispatch opposing
            minions before directly attacking the opponent. These Lanes can also
            host Enchantments, providing a variety of useful effects to minions
            which occupy the lane or the board itself. Effect on Minions range
            from simple bonuses to health or attack to granting special
            abilities to minions, and the Enchantments can nullify abilities on
            opposing minions or return Minions to play after being destroyed!
            The destruction of an occupying Minion does not remove Enchantments,
            so they can be used again by future Minions, though there are spells
            and effects which can destroy Enchantments.
          </p>

          <h2>
            <span id="How_To_Play">How To Play</span>
          </h2>

          <p>This section will go over the basics of gameplay.</p>

          <h3>
            <span id="Card_Types">Card Types</span>
          </h3>

          <p>The cards in your collection fit into four categories:</p>

          <p>
            <strong>Minions:</strong> Summons a Minion into one of your
            unoccupied lanes. Minions have a value for Strength and Health, and
            some have Awaken effects which trigger when they enter play or
            Demise effects which trigger when they enter the Boneyard. Strength
            value determines damage dealt in combat with other minions and the
            opponent. When a Minion’s Health is reduced to zero, it is sent to
            the Boneyard.
          </p>

          <p>
            <strong>Spells:</strong> A one-time effect which may generate a
            variety of effects, possibly targeting Cards, Players, or Lanes.
          </p>

          <p>
            <strong>Enchantments:</strong> A permanent effect which targets one
            of your seven lanes, providing bonuses to the occupying minion or
            imposing penalties on opposing minions.
          </p>

          <p>
            <strong>Artifacts:</strong> Cards which can provide both continuous
            and activated bonuses and effects for a Player while they are in
            play. A player may only have five Artifacts in play at one time.
            Many artifacts also have Durability, similar to a Minion’s Health.
            For each point of damage dealt directly to a player, the most
            recently played Artifact’s Durability is decreased by one. Artifacts
            with Durability reduced to zero are placed in the Boneyard.{' '}
          </p>

          <p>
            Cards are divided into six colors, each corresponding with a Faction
            within the Mythgard universe:{' '}
          </p>

          <p>
            Blue – <strong>Norden</strong>
            <br />
            Yellow – <strong>Aztlan</strong>
            <br />
            Red – <strong>Oberos</strong>
            <br />
            Green – <strong>Dreni</strong>
            <br />
            Orange – <strong>Parsa</strong>
            <br />
            Purple – <strong>Harmony</strong>
          </p>

          <p>
            A card’s color determines which color gem it produces when burned.
            There are no restrictions on colors in deck construction, but
            because cards can only be burned once per game, decks frequently
            maintain concentrated color identities.
          </p>

          <h3>
            <span id="Card_Anatomy">Card Anatomy</span>
          </h3>
        </div>
        <img
          className="article"
          src="https://cdn.mythgardhub.com/articles/image-33.png"
          style={{ width: '877px' }}
        />
        <div className="article_caption">Image Courtesy of Rhino Games</div>
        <div className="articles_column">
          <p>
            Some card types, Artifacts for example, will also have additional
            properties such as Durability. Check the in-game guide for more info
            on these additional properties.
          </p>

          <h3>
            <span id="Resource_System">Resource System</span>
          </h3>

          <p>
            In Mythgard you play with two different resources: Gems and Mana.
            Cards will have both a Mana and a Gem cost and some special
            abilities of cards will also cost Mana and Gems or sometimes both.
            At the bottom of your screen during a match you will find your
            resource bar, this will show your maximum and current mana on the
            left as well as your current Gems. Used gems will appear greyed out.
            Resources are spent automatically as you choose to play cards and
            abilities, and any used resources will be restored at the start of
            your turn. You gain both Gems and Mana by burning cards in your
            hand.
          </p>

          <h3>
            <span id="Card_Burning">Card Burning</span>
          </h3>

          <p>
            You can Burn a card once per turn by dragging it from your hand to
            the bottom of your resource bar during your turn. Burned cards are
            reinserted randomly into your deck, but are never placed directly on
            top. Burning a card will grant you 1 maximum Mana and 1 Gem of the
            card’s Faction. Faction is displayed on the colored strip which run
            through the middle of the card and Gem on the card’s right side. The
            ring around the mana cost in the upper-left corner also indicates a
            card’s Faction. Each card can only be burned once, once a card has
            been burned it will show the ring in the top left being broken as
            well as have a burned look around the edge of the card.
          </p>
        </div>
        <img
          className="article"
          src="https://cdn.mythgardhub.com/articles/image-34-768x524.png"
          style={{ width: '66%' }}
        />
        <div className="article_caption">An example of a Burned card</div>
        <div className="articles_column">
          <h3>
            <span id="Playable_Cards">Playable Cards</span>
          </h3>

          <p>
            During your turn, any card you are currently able to play will
            appear in your hand with a blue border around it. This indicates
            that you have enough Mana and/or Gems to play that card.{' '}
          </p>
        </div>
        <img
          className="article"
          src="https://cdn.mythgardhub.com/articles/guide2.png"
        />
        <div className="article_caption">
          An example of playable and unplayable cards in hand.
        </div>
        <div className="articles_column">
          <h3>
            <span id="Playing_Cards">Playing Cards</span>
          </h3>

          <p>
            To play a card, simply drag it onto the Game Board. If the card
            you’re playing, such as a Minion or Enchantment, goes into a Lane,
            you can drag it into the desired Lane. Alternatively, you can drag
            it to the center of the Game Board and target a Lane. Some cards
            such as Artifacts and untargeted Spells can simply be dragged onto
            the center of the Game Board. Any cards dragged to the center of the
            Game Board will highlight potential Lanes, Minions, Artifacts, or
            Players which can be targeted.
          </p>

          <h3>
            <span id="Area_of_Influence">Area of Influence</span>
          </h3>

          <p>
            {' '}
            Minions have an area of influence on the Game Board. A minion
            threatens 3 Lanes at a time, the Lane directly opposite it and the 2
            adjacent lanes.
          </p>
        </div>
        <img
          className="article"
          src="https://cdn.mythgardhub.com/articles/guide3.png"
        />
        <div className="article_caption">
          An example of each minion’s area of influence.
        </div>
        <div className="articles_column">
          <h3>
            <span id="Attacking">Attacking</span>
          </h3>

          <p>
            To attack with a Minion, simply click and drag from the Minion you
            want to attack with and available Lanes will be highlighted in red.
            Minions can only attack Lanes within their area of influence and
            normally must attack Minions before being able to attack an empty
            Lane. Several keywords can alter the way this area of influence
            works.{' '}
          </p>

          <p>
            <strong>Agile:</strong>{' '}
            <em>
              “Can attack any of the three opposing lanes, ignoring attacking
              and blocking restrictions.”
            </em>
            <br />
            <br />
            Agile can allow you to circumvent normal attacking rules to attack
            your opponent directly, even while blocked by another minion. Agile
            also ignores blocking restrictions such as Defender and Lurker.
            <br />
            <br />
            <strong>Defender:</strong>{' '}
            <em>
              “Cannot attack. Enemies must attack a Defender before other
              blocking minions.”
            </em>
            <br />
            <br />
            <strong>Lurker:</strong>{' '}
            <em>
              “Enemies must attack other blocking minions before a Lurker.”
            </em>
          </p>

          <h3>
            <span id="Moving">Moving</span>
          </h3>

          <p>
            Not only can your Minions attack, but they can also move around the
            Game Board once played. To move a Minion, click and drag from the
            Minion the same way you would attack with it. Lanes the Minion can
            move to will be highlighted in green. Minions cannot normally attack
            and move in the same turn and are normally bound to moving 1 Lane to
            either side. Several keywords can alter how movement works.
          </p>

          <p>
            <strong>Immobile:</strong> <em>“Cannot move voluntarily.”</em>
            <br />
            <br />
            <strong>Swift:</strong>{' '}
            <em>
              “Gets an additional move action each turn. Each Minion can use
              only one swift move per turn. Swift moves are used before other
              move actions.”
            </em>
            <br />
            <br />
            <strong>Teleport:</strong> <em>“Can move to any lane.”</em>
          </p>

          <h3>
            <span id="Combat">Combat</span>
          </h3>

          <p>
            Minions deal their Strength value to an opposing minion’s health.
            When a minion’s health is 0, it is placed in the Boneyard. If you’re
            unsure of the result of an attack, simply hover the attack without
            letting go of the attacker to be given a damage resolution preview.
            There are several keywords with can alter damage calculation in
            combat.
          </p>

          <p>
            <strong>Slayer X:</strong>{' '}
            <em>“Deals X extra damage in combat with minions.”</em>
            <br />
            <strong>Fragile X:</strong> <em>“Increases damage taken by X.”</em>
            <br />
            <strong>Focused X:</strong>{' '}
            <em>“Deals X extra damage in combat with the opposite lane.”</em>
            <br />
            <strong>Blast X:</strong>{' '}
            <em>
              “Deals X non-combat damage to adjacent enemy minions after
              striking.”
            </em>
            <br />
            <strong>Armor X:</strong> <em>“Reduces damage taken by X.”</em>
            <br />
            <strong>Piercing:</strong>{' '}
            <em>“Damage dealing cards with Piercing ignore Armor.”</em>
            <br />
            <strong>Alpha Strike:</strong>{' '}
            <em>
              “Minions with Alpha Strike deal combat damage before minions
              without it. If the Alpha Strike minion deals enough damage to kill
              a minion without Alpha Strike, the opposing minion will not get to
              strike in retaliation.”
            </em>
            <br />
            <strong>Overrun:</strong>{' '}
            <em>
              “When attacking a minion, excess damage carries over to the
              defending player.”
            </em>
            <br />
            <strong>Frenzy:</strong>{' '}
            <em>
              “Frenzy grants one Frenzy Attack after the minion uses a Standard
              Action or a Rush Action to attack. Only one Frenzy Attack can be
              used per turn.”
            </em>
            <br />
            <strong>Deadly:</strong>{' '}
            <em>
              “Destroys minions when dealing any amount of combat damage to
              them.”
            </em>
            <br />
            <strong>Life Tap:</strong>{' '}
            <em>
              “The controlling player gains life equal to combat damage dealt.”
            </em>
            <br />
            <strong>Breach:</strong>{' '}
            <em>“Triggers when dealing combat damage to a player.”</em>
          </p>

          <h3>
            <span id="Abilities">Abilities</span>
          </h3>

          <p>
            Many cards have additional abilities available to them, whether
            through additional actions or other miscellaneous keywords.
          </p>

          <h4>
            <span id="Action_Breakdown">Action Breakdown</span>
          </h4>

          <p>
            <strong>Standard Action:</strong>{' '}
            <em>
              “Can be used to attack, move, or activate an ability. Usually,
              minions don’t have one the turn they are summoned. Minions gain
              one standard action at the start of their turn.”
            </em>
            <br />
            <strong>Rush Action:</strong>{' '}
            <em>
              “Rush actions are like standard actions and are granted by Rush.
              Only one can be used per turn and they are used before standard
              actions.”
            </em>
            <br />
            <strong>Move Action:</strong>{' '}
            <em>
              “Can only be used to move and are used before Standard Actions.”
            </em>
            <br />
            <strong>Swift Move:</strong>{' '}
            <em>
              “Can only be used to move and are granted by Swift. Only one can
              be used per turn, and they are used before move actions.”
            </em>
            <br />
            <strong>Frenzy Attack:</strong>{' '}
            <em>
              “Frenzy grants one Frenzy Attack after the minion uses a Standard
              Action or Rush Action to attack. Only one Frenzy Attack can be
              used per turn.”
            </em>
            <br />
            <strong>Utility Action:</strong>{' '}
            <em>
              “Can be used to activate abilities requiring Utility Actions.
              Actions that require energy are always Utility Actions. Usually,
              Minions, Artifacts and Brands get one Utility Action per Turn
              including the turn they come under your control.”
            </em>
          </p>

          <h4>
            <span id="Misc_Keywords">Misc. Keywords</span>
          </h4>

          <p>
            In addition to the above mentioned abilities there are numerous
            others that don’t fit into the previous categories.
          </p>

          <p>
            <strong>Warded:</strong>{' '}
            <em>“Cannot be damaged or destroyed outside of combat.”</em>
            <br />
            <strong>Immortal:</strong>{' '}
            <em>“Cannot be damaged and immuned to destroy effects.”</em>
            <br />
            <strong>Awaken:</strong>{' '}
            <em>“An ability that triggers when entering play.”</em>
            <br />
            <strong>Demise:</strong>{' '}
            <em>“An ability that triggers when destroyed.”</em>
            <br />
            <strong>Banish:</strong>{' '}
            <em>
              “Removed from the game without triggering Demise effects or going
              to the boneyard.”
            </em>
            <br />
            <strong>Blight X:</strong>{' '}
            <em>“At the start of its turn, gets -X/-X.”</em>
            <br />
            <strong>Regen X:</strong>{' '}
            <em>“At the end of its turn, restores X health.”</em>
            <br />
            <strong>Sacrifice:</strong>{' '}
            <em>
              “Sent to the boneyard. Demise effects are triggered. Abilities
              that prevent destroy effects do not prevent sacrifice effects.”
            </em>
            <br />
            <strong>Sap:</strong>{' '}
            <em>
              “Spend an amount of current and maximum health to activate an
              ability.”
            </em>
            <br />
            <strong>Divination X:</strong>{' '}
            <em>
              “Look at the top X cards of your deck. Pick one to put on top;
              shuffle the rest into your deck below it.”
            </em>
            <br />
            <strong>Stealth:</strong>{' '}
            <em>
              “Identity is hidden from opponents and blocks like a regular
              minion until it is dealt damage, is destroyed, interacts with
              others, uses an ability (including Awaken abilities), or takes a
              non-move action. Spell Previews are turned off if any minion in
              stealth is in play.”
            </em>
            <br />
            <strong>Stunned:</strong>{' '}
            <em>“Cannot attack, move, or activate abilities.”</em>
            <br />
            <strong>Empower:</strong>{' '}
            <em>“Can be activated or triggered once to improve a minion.”</em>
            <br />
            <strong>Energy:</strong> “
            <em>
              Minions, artifacts, and paths with energy have abilities that
              generate and consume it. Using energy with an action requires a
              utility action.”
            </em>
            <br />
            <strong>Suppressed:</strong>{' '}
            <em>
              “Nullifies all special abilities, buffs and debuffs. Abilities,
              buffs, and debuffs gaained while suppressed are also nullified
              until the suppression effect wears off.”
            </em>
            <br />
            <strong>Unsuppressable:</strong> <em>“Cannot be Suppressed.”</em>
            <br />
            <strong>Ephemeral:</strong>{' '}
            <em>
              “Removed from the game when leaving play, going to a boneyard, or
              returning to a deck.”
            </em>
            <br />
            <strong>Pursuit:</strong>{' '}
            <em>
              “An ability that applies when you go second in the starting turn
              order.”
            </em>
          </p>

          <h2>
            <span id="Card_Rarity">Card Rarity</span>
          </h2>

          <p>
            Cards come in 4 rarities. You can find the rarity of a card by
            looking at the medallion in the top right corner of the card. Rarity
            will dicated how often you find cards in packs and in Gauntlet/Arena
            game modes. There are deck building restrictions and crafting costs
            based on rarity as well, which we will cover in the Deck Building
            Rules section later.
          </p>

          <p>
            Bronze: <strong>Common</strong>
            <br />
            Silver: <strong>Uncommon</strong>
            <br />
            Gold: <strong>Rare</strong>
            <br />
            Diamond: <strong>Mythic</strong>
          </p>

          <h2>
            <span id="Paths">Paths</span>
          </h2>

          <p>
            When building a deck, you will choose a path to either complement
            your play style or even potentially build your deck around.
          </p>
        </div>
        <table className="npg">
          <tr>
            <td className="path">
              <h3>
                <span id="Disk_of_Circadia">Disk of Circadia</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Disk_Of_Circadia.png"
                    alt=""
                    className="wp-image-16387"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">
              <h3>
                <span id="Fires_of_Creation">Fires of Creation</span>
              </h3>

              <div className="wp-block-image">
                <figure className="alignrcenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Fires_Of_Creation.png"
                    alt=""
                    className="wp-image-16388"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>
          </tr>

          <tr>
            <td className="path">
              <h3>
                <span id="Journey_of_Souls">Journey of Souls</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Journey_Of_Souls.png"
                    alt=""
                    className="wp-image-16389"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">
              <h3>
                <span id="Rainbows_End">Rainbow’s End</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Rainbows_End.png"
                    alt=""
                    className="wp-image-16390"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>
          </tr>

          <tr>
            <td className="path">
              <h3>
                <span id="Turn_of_Seasons">Turn of Seasons</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Turn_Of_Seasons.png"
                    alt=""
                    className="wp-image-16391"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">&nbsp;</td>
          </tr>
        </table>
        <div className="articles_column">
          <h2>
            <span id="Powers">Powers</span>
          </h2>

          <p>
            When building a deck, you will also choose a Power, which can be
            activated once per turn for a cost.
          </p>
        </div>
        <table className="npg">
          <tr>
            <td className="path">
              <h3>
                <span id="Foresight">Foresight</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Foresight.png"
                    alt=""
                    className="wp-image-16392"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">
              <h3>
                <span id="Impel">Impel</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Impel.png"
                    alt=""
                    className="wp-image-16393"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>
          </tr>

          <tr>
            <td className="path">
              <h3>
                <span id="Infuse">Infuse</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Infuse.png"
                    alt=""
                    className="wp-image-16394"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">
              <h3>
                <span id="Mend">Mend</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Mend.png"
                    alt=""
                    className="wp-image-16395"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>
          </tr>

          <tr>
            <td className="path">
              <h3>
                <span id="Reconstruct">Reconstruct</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Reanimate.png"
                    alt=""
                    className="wp-image-16396"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>

            <td className="path">
              <h3>
                <span id="Smite">Smite</span>
              </h3>

              <div className="wp-block-image">
                <figure className="aligncenter is-resized">
                  <img
                    src="https://cards.mythgardhub.com/core/m/Smite.png"
                    alt=""
                    className="wp-image-16397"
                    width="373"
                    height="267"
                  />
                </figure>
              </div>
            </td>
          </tr>
        </table>
        <div className="articles_column">
          <h2>
            <span id="Deck_Building">Deck Building</span>
          </h2>

          <p>
            In the deck editor you can create/edit/copy/delete your decks as
            well as view/copy your current featured decks. A deck must contain a
            minimum of {DECK_SIZES.MIN} cards and can not contain more than{' '}
            {DECK_SIZES.MAX}.
          </p>

          <h3>
            <span id="Number_of_Cards_per_Rarity">
              Number of Cards per Rarity
            </span>
          </h3>

          <p>
            In Mythgard, the rarity of a card limits the number of copies of
            that card you may put in your deck. They are as follows:
          </p>

          <p>
            <strong>Common:</strong> 4x
            <br />
            <strong>Uncommon:</strong> 3x
            <br />
            <strong>Rare:</strong> 2x
            <br />
            <strong>Mythic:</strong> 1x
          </p>

          <h3>
            <span id="Essence_Values">Essence Values</span>
          </h3>

          <p>
            Essence is the crafting currency of Mythgard. Essence can be gained
            by unmaking cards you own and can be used to make cards you do not
            own. Cards of different rarities have different essence values
            associated with them. They are as follows:
          </p>

          <p>
            Commons: <strong>Unmake</strong> for <strong>10</strong> essence and
            cost <strong>50</strong> essence to <strong>make.</strong>
            <br />
            Uncommons: <strong>Unmake</strong> for <strong>20</strong> essence
            and cost <strong>100</strong> essence to <strong>make.</strong>
            <br />
            Rares: <strong>Unmake</strong> for <strong>100</strong> essence and
            cost <strong>500</strong> essence to <strong>make.</strong>
            <br />
            Mythics: <strong>Unmake</strong> for <strong>600</strong> essence
            and cost <strong>2400</strong> essence to <strong>make.</strong>
          </p>

          <h3>
            <span id="Wildcards">Wildcards</span>
          </h3>

          <p>
            Wildcards are a crafting resource that can be opened in packs or
            earned as Maat Rewards. Wild Cards have a specific rarity, card set
            and Faction associated with them. A Wildcard can be used to craft a
            card of the corresponding rarity, Faction and set instead of its
            essence cost. They can also be unmade for essence at double the
            standard rate of their corresponding rarity.
          </p>

          <p>
            After you have completed the start of your journey through Mythgard,
            you will also be given 3 special missions. These missions reward you
            with a total of 2 Mythic and 2 Rare wildcards that aren’t locked to
            any specific Faction, allowing you to create any card of those
            rarities you wish.
          </p>

          <h1>
            <span id="Game_Economy">Game Economy</span>
          </h1>

          <h2>
            <span id="Coins">Coins</span>
          </h2>

          <p>
            Coins are Mythgard’s in-game currency and can be earned in a large
            variety of ways simply by playing the game. The main use of Coins is
            buying packs of cards and entry into the Arena.
          </p>

          <h2>
            <span id="Mythril">Mythril</span>
          </h2>

          <p>
            Mythril is Mythgard’s premium currency that you can purchase with
            real money in the game’s store. Mythril can be spent in-game on card
            packs, Arena entry and for upgrading cards you own into their
            Prestige versions.{' '}
          </p>

          <h2>
            <span id="Maat">Maat</span>
          </h2>

          <p>
            Maat is a special reward that you get if all players of a PvP game
            click the thumbs up button in the bottom right corner of the screen
            following the conclusion of a match. Maat rewards you with Wildcards
            and is a very important part of the economy. Remember to thumbs up
            for Maat if you had a good game against your opponent.
          </p>

          <h2>
            <span id="Coin_Acquisition">Coin Acquisition</span>
          </h2>

          <h3>
            <span id="Missions">Missions</span>
          </h3>

          <p>
            You can earn coins through missions that are granted to you daily. Be sure to check the Missions tab in-game to see your current missions. Mission coin values are not static and vary from 600 to 900.
          </p>

          <h3>
            <span id="Achievements">Achievements</span>
          </h3>

          <p>
            You can earn coins for completing achievements as you advance through Mythgard. Be sure to check the Missions tab in-game to see your current achievement progress.
          </p>

          <h3>
            <span id="Game_Rewards">Game Rewards</span>
          </h3>

          <p>
            Different game modes off differing amounts of coin as rewards. Note
            that winning games also gets you 1 card per win for your first 3
            wins per day.
          </p>

          <p>
            1v1 vs Players up to 120 coins
            <br />
            1v1 vs Ai up to 50 coins
            <br />
            2v2 vs Players up to 180{' '}
          </p>

          <h3>
            <span id="Weekly_Chest">Weekly Chest</span>
          </h3>

          <p>
            The Weekly Chest can be unlocked once every seven days and can be
            found under the Missions tab. In order to unlock the Chest, you will
            need 5 Seals. Seals are a rare reward for winning any match. You can
            also earn a guaranteed seal for a perfect Gauntlet run. The Chest
            contains large sums of Coins, the average amount is around 2,400 but
            can go as high as 12,000.
          </p>

          <p>
            The chance to get a Seal varies for each of the different game
            modes:
            <br />
            <strong>25%</strong> chance to get a Seal for 1v1 PVP wins
            <br />
            <strong>38%</strong> chance to get a Seal for 2v2 PVP wins
            <br />
            <strong>10%</strong> chance to get a Seal for 1v1 PvE wins
            <br />
            <strong>100%</strong> chance to get a Seal for perfect gauntlet wins
          </p>

          <h3>
            <span id="Level_Up_Rewards">Level Up Rewards</span>
          </h3>

          <p>
            As you gain experience in game you will level up. Each level comes
            with its own rewards, ranging from essence to entire card packs. A
            list of all the level up rewards can be found under your profile
            in-game.{' '}
          </p>

          <h2>
            <span id="Coin_Spending">Coin Spending</span>
          </h2>

          <h3>
            <span id="Packs">Packs</span>
          </h3>

          <p>
            A pack of cards costs 1200 Coins and will normally contain 3
            Commons, 2 Uncommons and 1 Rare. Each rare has approximately a 10%
            chance to upgrade to a Mythic. The longer you go without a Mythic
            after 10 packs, the higher than upgrade percentage becomes.
          </p>

          <p>
            You cannot open a copy of a Mythic you already own unless you
            already own all Mythics but you can open additional copies of cards
            of other rarities.
          </p>

          <p>
            In addition to Mythics, you also have a small chance to replace any
            card in the pack with a Wildcard of the corresponding rarity or a
            Prestige card. Just over 14% of packs will upgrade one or more cards
            to Wildcards and the same is true of Prestige cards as well.
          </p>

          <h3>
            <span id="Arena">Arena</span>
          </h3>

          <p>
            While the primary entry into Arena is free with a cooldown, more on
            that below, you can always skip the cooldown period by paying 1800
            coins and starting a new Arena run. The coins are deposited in
            “escrow” which can be won by opponents or won from opponents in
            addition to the normal Arena rewards.
          </p>

          <h1>
            <span id="Game_Modes">Game Modes</span>
          </h1>

          <h2>
            <span id="Story_Mode">Story Mode</span>
          </h2>

          <p>
            Follow the adventures of Percy, Fen, Ariel, and many more! Story
            mode features comic-book style artwork leading to PvE combat with
            themed enemies. Chapter One also contains the Tutorial which yields
            more coins than average and guarantees enough XP to unlock all other
            game modes!
          </p>

          <h2>
            <span id="Casual">Casual</span>
          </h2>

          <p>
            Constructed play that matches you with other players outside of the
            Ranked ladder. Fun and weird decks are always welcome and it’s a
            great place to test and practice without worrying about losing any
            Ranked Points (RP).
          </p>

          <h2>
            <span id="Ranked">Ranked</span>
          </h2>

          <p>
            Competitive constructed ladder player in which you can climb from
            the very bottom of the Bronze ladder all the way up to Mythril and
            beyond! Wins and losses add and subtract RP. Every 100 RP within
            each Ladder–Bronze, Silver, Gold, and Mythril–brings you to the next
            division (i.e. Bronze 01 to Bronze 02). These divisions provide a
            soft floor within the ladder, first taking you to 0 RP in that
            division before moving down to the previous division. There are 10
            divisions per Ladder.
          </p>

          <h2>
            <span id="Melee_2v2">Melee (2v2)</span>
          </h2>

          <p>
            Just what it says on the tin! Two teams of two face off in a chaotic
            and exciting action-packed format. Players each have six Lanes of
            their own but share the middle Lane, allowing them to pass Minions
            back and forth. Players can similarly target the opponent directly
            opposite them or diagonal from them, or even target friendly minions
            on their partner’s Lanes.
          </p>

          <h2>
            <span id="Brawl_vs_AI">Brawl (vs AI)</span>
          </h2>

          <p>
            Casual constructed gameplay against AI opponents with no turn timer
            and the ability to suspend games and return to them later. Brawl
            games can be played while you are waiting to match with opponents in
            any of the other game mode’s queues, but like any matches against
            AI, award less XP than PvP games.
          </p>

          <h2>
            <span id="Puzzle">Puzzle</span>
          </h2>

          <p>
            The first set of puzzles provides a tutorial experience,
            highlighting interesting mechanics of Mythgard. Later puzzles, those
            which award 100 coins instead of 30, feature fiendishly clever board
            states which have lethal solutions for the most creative and crafty
            players!
          </p>

          <h2>
            <span id="Gauntlet">Gauntlet</span>
          </h2>

          <p>
            Draft a deck from simulated packs and test your creative skills
            against the AI’s own drafted concoctions! The packs simulate
            signalling in booster drafts, and allow you determine the colors you
            are building around and entry is completely free. AI opponents
            become increasingly challenging as you work your way through
            gauntlets of 5, 7, and finally 9 matches, only advancing if you win.
            While the prizes are the same as other PvE matches, completing
            gauntlets guarantee seals for unlocking the weekly chest and are
            guaranteed to unlock a Path or Power!
          </p>

          <h2>
            <span id="Arena">Arena</span>
          </h2>

          <p>
            Same limited format as Gauntlet, but you are competing with your
            fellow Mythgardians! PvP limited also comes in 9 match runs, which
            are free to enter with a 9 day cooldown which is reduced for each
            game played. If you want to end your run early, you can pay a fee in
            coins to re-enter, at which point winning 5 of your 9 matches will
            return your invested coin. Unlike Gauntlet, you will play all 9
            matches every time and for every two matches you lose, you will be
            given a bonus draft to shore up your deck.
          </p>

          <h1>
            <span id="First_Hours">First Hours</span>
          </h1>

          <h2>
            <span id="Story_Mode_Completion">Story Mode Completion</span>
          </h2>

          <p>
            Playing through the Story, as mentioned above, no only gives you a
            game tutorial and a fun look at the world of Mythgard, but also
            guarantees certain cards will be added to your collection, including
            some handy rares like Misanthropia. The XP gain from the Story is
            exactly the amount needed to get you to level 6, at which point all
            game modes are unlocked, so it is a good way to invest some time
            early on.
          </p>

          <h2>
            <span id="Puzzle_Mode_Completion">Puzzle Mode Completion</span>
          </h2>

          <p>
            After finishing Story mode, you should try your chops at the Puzzle
            mode as a good way to earn some extra coin.
          </p>

          <h2>
            <span id="Gauntlet_Mode_Leveling">Gauntlet Mode Leveling</span>
          </h2>

          <p>
            As mentioned above, because each complete Gauntlet run guarantees an
            unlocked Path or Power, this is by FAR the fastest method for
            unlocking all of the various elements of deck building. The
            completely free format is fun, though the AI doesn’t have quite the
            same killer instinct as human opponents. This is also a great way to
            get more familiar with cards in the Core Set, as you will be able to
            see many of them as you go through drafts and get to test drive many
            different decks as you fill out your collection of Paths and Powers!{' '}
          </p>

          <h2>
            <span id="Starting_Missions">Starting Missions</span>
          </h2>

          <p>
            When you start playing, you will notice in the Missions screen that
            you have access to a fourth mission on the far left. These start
            with preliminary missions to earn coins for trying out various game
            modes or performing simple tasks in game. After you have clear these
            out, you will have access to special missions in blue which grant
            big one-time bonuses. The missions–win seven matches, destroy 88
            opposing minions, win a match with 1 HP–grant 2 special mythic
            wildcards and 2 special rare wildcards. Unlike other wildcards,
            these can be used to craft cards of any color. With these wildcards
            you can likely fill in any gaps in your collection and get straight
            to making a decent version of your dream deck!
          </p>

          <h2>
            <span id="Faction_Missions">Factions Missions</span>
          </h2>

          <p>
            Another tab absolutely worth investigating early in Missions are
            “Factions”. Pick your favorite color, notice the gorgeous new
            animated background, and start plugging away at missions specific to
            each color’s specific mechanics–using Lifetap for Red, sending
            minions to the Boneyard in Green, etc. There are nine levels for
            each color, each granting 600 coins and some cards and wildcards.
            The first six give two common cards and two wildcards, alternating
            common and uncommon rarity, all in color and missions seven and
            eight give a rare card and wildcard in color. For the final mission
            you are awarded a Mythic Wildcard in color! These mission are
            probably not something that you can grind out right away, but being
            sure to set your faction mission track to the color you want to work
            on, as you can only select one at a time. This is not only a
            fantastic way to build your collection, but a great introduction to
            themes in each color!
          </p>

          <h1>
            <span id="Important_Links">Important Links</span>
          </h1>

          <h2>
            <span id="Official_Sources">Official Sources</span>
          </h2>

          <p>
            Reddit:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://www.reddit.com/r/mythgard/ (opens in a new tab)"
              href="https://www.reddit.com/r/mythgard/"
              target="_blank"
            >
              https://www.reddit.com/r/mythgard/
            </a>{' '}
            <br />
            YouTube:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://www.youtube.com/channel/UC42nE4hmYzB8FOwFmcRBqMA (opens in a new tab)"
              href="https://www.youtube.com/channel/UC42nE4hmYzB8FOwFmcRBqMA"
              target="_blank"
            >
              https://www.youtube.com/channel/UC42nE4hmYzB8FOwFmcRBqMA
            </a>{' '}
            <br />
            Discord:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="discord.gg/mythgardgame (opens in a new tab)"
              href="https://discord.gg/mythgardgame"
              target="_blank"
            >
              discord.gg/mythgardgame
            </a>
            <br />
            Twitter:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://twitter.com/mythgardgame (opens in a new tab)"
              href="https://twitter.com/mythgardgame"
              target="_blank"
            >
              https://twitter.com/mythgardgame
            </a>
            <br />
            Facebook:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://www.facebook.com/MythgardGame/  (opens in a new tab)"
              href="https://www.facebook.com/MythgardGame/"
              target="_blank"
            >
              https://www.facebook.com/MythgardGame
            </a>
            <br />
            Instagram:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://www.instagram.com/mythgardgame  (opens in a new tab)"
              href="https://www.instagram.com/mythgardgame"
              target="_blank"
            >
              https://www.instagram.com/mythgardgame
            </a>


          </p>

          <h2>
            <span id="Deck_BuildersTournament_Sites">
              Deck Builders/Tournament Sites
            </span>
          </h2>

          <p>
            Mythgard Hub:{' '}
            <a
              rel="noreferrer noopener"
              aria-label=" (opens in a new tab)"
              href="https://mythgardhub.com/"
              target="_blank"
            >
              https://mythgardhub.com/
            </a>{' '}

          </p>

          <h2>
            <span id="Written_Articles">Written Articles</span>
          </h2>

          <p>
            Kryptic Gaming:{' '}
            <a
              rel="noreferrer noopener"
              aria-label=" (opens in a new tab)"
              href="https://kryptikgaming.wixsite.com/mythgard/articles"
              target="_blank"
            >
              https://kryptikgaming.wixsite.com/mythgard/articles
            </a>{' '}
            <br />
            MinMaxer’s Blog:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://minmaxer.wixsite.com/mindfreak  (opens in a new tab)"
              href="https://minmaxer.wixsite.com/mindfreak"
              target="_blank"
            >
              https://minmaxer.wixsite.com/mindfreak{' '}
            </a>
            <br />
            NephilimGG:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://nephilimgg.wixsite.com/nephilimgg/blog/categories/mythgard  (opens in a new tab)"
              href="https://nephilimgg.wixsite.com/nephilimgg/blog/categories/mythgard"
              target="_blank"
            >
              https://nephilimgg.wixsite.com/nephilimgg/blog/categories/mythgard{' '}
            </a>
          </p>

          <h2>
            <span id="Live_Streams">Live Streams</span>
          </h2>

          <p>
            Twitch Directory:{' '}
            <a
              rel="noreferrer noopener"
              aria-label="https://www.twitch.tv/directory/game/Mythgard  (opens in a new tab)"
              href="https://www.twitch.tv/directory/game/Mythgard"
              target="_blank"
            >
              https://www.twitch.tv/directory/game/Mythgard{' '}
            </a>
            <br />
            Mixer Directory:{' '}
            <a
              href="https://mixer.com/browse/games/566418/mythgard"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="https://mixer.com/browse/games/566418/mythgard  (opens in a new tab)"
            >
              https://mixer.com/browse/games/566418/mythgard{' '}
            </a>
          </p>
        </div>
      </Layout>
    </>
  );
}

export default NewPlayerGuide;
