import { useContext } from 'react';
import Layout from '../components/layout';
import { mgColors } from '../lib/theme.js';
import { ThemeContext } from '../components/theme-context';
import PageBanner from '../components/page-banner';

function NewPlayerGuide() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Layout
        title="Mythgard Hub | Articles | "
        desc="7 things I wish I knew when I was first starting out in Mythgard"
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
        <PageBanner image={PageBanner.IMG_ARTICLES}>Articles</PageBanner>

        <br />

        <div className="toc_column">
          This article by guest writer <strong>Skysong</strong> was orignally published on reddit

          <div className="article_title">7 things I wish I knew when I was first starting out in Mythgard</div>
          <span style={{ fontStyle: 'italic' }}>October 1, 2019 </span>
          by <span style={{ color: '#F1810B' }}>Skysong</span>

        </div>

        <div className="articles_column">

          <h2>
            A detailed resource for new players that helps fill in the holes of the tutorial.
          </h2>

          <p>
            Hello everyone! I am a relatively new player to Mythgard but I have fallen in love with the game. I use the tag Skysong, feel free to add me if you like. Also, sorry about the clickbaity title, I couldn't for the life of me think of a reasonable one.
          </p>

          <p>
            I have been having a great time enjoying the different modes of the game and exploring the depth that it has to offer. I would love to see the game flourish and pick up some new players. That said, there is a lot to learn when you are starting off. Since we are still in beta, the tutorial is lacking in some areas and I wanted to provide new players with some insight to help them have a more enjoyable experience. I do not have a platform for which to write articles, so this subreddit seemed as good a place as any.
          </p>

          <p>
            I'm not going to be explaining most the basic mechanics, as I feel the tutorial does a decent job of that. This is a place to kind of fill in what I consider to be some of the holes of the tutorial and provide people with the information that I wish I had known upon starting to play. I hope that the information provided in this post will help new players that are just finding out about the game. And if you are an experienced player that feels I have missed something important, let me know and I will edit it into the post and credit you.
          </p>

          <p>
          It's a long guide but I wanted to be thorough. I hope you all enjoy it!
          </p>

          <h2>
          Table of Contents:
          </h2>

          <ol>
            <li><a href="#1">Good Sportsmanship is Rewarded in this Game with Cards</a></li>

            <li><a href="#2">Stay Focused during your Opponent's Turn</a></li>

            <li><a href="#3">Pace your Turns Effectively</a></li>

            <li><a href="#4">An Explanation of Artifacts</a></li>

            <li><a href="#5">Why you Should Pay Attention to your Opponent's Burned Cards</a></li>

            <li><a href="#6">The Ins and Outs of the Different Paths</a></li>

            <li><a href="#7">The Benefits of Crafting Commons and Uncommons</a></li>
          </ol>

        <h2>
          <span id="1">1. Good Sportsmanship is Rewarded in this Game with Cards</span>
        </h2>

        <p>
          It's not exactly clear when you are starting off this game, but there is a reward system for good sportsmanship called the MAAT system. At the end of each game where you face a human opponent, there will be a button in the bottom right hand of the screen with a thumbs up icon on it. If both you and your opponent click on it, you will both be awarded with MAAT points. As you receive points, you will level up and there will be rewards available to you in the form of wild cards and boosters. They will go a a long way to building your collection.
        </p>

        <p>
          If only one of you hits the button, neither of you will get the points. So keep in mind that if you decide to BM with emotes, people are a lot less likely to hit the thumbs up and you will slow your own card acquisition.
        </p>

        <p>
          In order to collect the rewards, you need to go into your profile, and hit the right-most tab labeled 'MAAT', and hit the claim button for any level you have reached.
        </p>

        <h2>
          <span id="2">2. Stay Focused during your Opponent's Turn</span>
        </h2>

        <p>
          Due to the fact that you generally can't interact with anything during your opponent's turn, it can be easy to allow yourself to get distracted while you aren't on the play. But there is a LOT going on in Mythgard at any given time, and your opponent's turn is a vital time where you can analyze the state of the board while you are not under the gun to make any decisions. This is especially important as you are learning the game because some of the interactions are not always intuitive. Paying attention during your opponent's turn will help you to become a better player.
        </p>

        <p>
          During your opponent's turn you want to be re-reading their creatures, enchantments, artifacts and paths as well as doing a quick once over on your own board position and hand. It's important to constantly take inventory of things in this game because Mythgard is a game where one small incremental victory over your opponent can snowball into a win.
        </p>

        <p>
          For example, if your opponent is playing the Turn of Seasons path, noticing that your opponent is in Winter phase is very important because all of their minions will have have 'Fragile 1'. This can allow you to be extra aggressive and trade up with your units in a way you normally couldn't. Sometimes, your opponent will fail to acknowledge the fact that they are in Winter and place their units sub-optimally. In these instance, you can achieve a beneficial trade that will sometimes snowball into a victory. However, if you're only paying attention during your turn, it's easy to miss this type of detail.
        </p>

        <h2>
          <span id="3">3. Pace your Turns Effectively</span>
        </h2>

        <p>
          In Mythgard, it's important that you neither rush your turns nor allow them to drag on for too long. If you rush your turns, it's very likely that you may miss a vital piece of information that you did not take into consideration. However, if you take too long, you may end up in a race against the clock where it's possible that you will make an error in judgment or make a misclick.
        </p>

        <p>
          If you hover a unit over an intended trade, you can see the results of that trade. There will be a translucent number over each of the units representing the damage that each unit will take, or a skull if the unit is going to die in the trade. This can be important because there are a variety of factors modifiers in combat that are easy to miss that have a significant impact on combat (Armor, Slayer, Focused, Fragile, etc.)
        </p>

        <p>
          Additionally, if you are playing a deck with activated artifacts, get into the habit of looking at your artifacts and making sure that you use each one of them if possible. They are small icons located in the bottom corner of your screen so it's easy to miss them while you are caught up in planning which cards to play from your hand and how you want to trade your units.
        </p>

        <p>
          As I mentioned in my previous points, mistakes in this game have a tendency to snowball. This is partially because you cannot interact on your opponent's turn, and partially because of the fact that the RNG element to this card game is especially low so skill is emphasized in each match. You can't bank on your opponent to mana flood, as sometimes happens in Eternal and MTG. You also cannot bank on RNG gods being favorable to you with on board interactions like in Hearthstone. While there is some RNG in terms of the order in which you draw your cards, there is far less RNG than any other game I have played before (admittedly, I haven't played Gwent, which I've heard is also quite low on RNG).
        </p>

        <h2>
          <span id="4">4. An Explanation of Artifacts</span>
        </h2>

        <p>
          One thing that I felt the tutorial of this game really overlooked is the explanation to new players of how artifacts work. Artifacts are basically items that you can attach to your character that provide either a sustained effect or some form of activated ability. Each player has five slots in which they can fill with an artifact, but some artifacts have the keyword 'Stacking' which allows them to occupy the same slot as their duplicates.
        </p>

        <p>
          Artifacts can't be destroyed in by removal cards in the same way that creatures and enchantments can be. Instead, most artifacts have durability attached to them, and when the artifact's durability reaches zero, it will be destroyed. Durability is reduced by damage to its controller - so if your opponent plays a Ollama Ring (an artifact with a durability of 12), you can destroy it by dealing 12 damage to their face.
        </p>

        <p>
          Only the most recently filled artifact slot will lose durability from face damage. So if your Olama Ring has been reduced to 1 durability, and you play down a Helm of Conscription, your opponent will need to remove the entire Helm of Conscription before they can deal the last damage to the Olama Ring that will remove it.
        </p>

        <p>
          There are a few artifacts that do not have durability. These artifacts can not be destroyed by the opponents, but they have a pre-determine amount of uses before the controlling player has to sacrifice them. The text on each of these specific artifacts will explain the conditions in which the artifact self destructs.
        </p>

        <p>
          Because artifacts exist in the game, there are times where your best bet at achieving board control is to focus on dealing damage to the opponent's face until their artifact is destroyed and then focusing on dealing with their creatures.
        </p>

        <h2>
          <span id="5">5. Why you Should Pay Attention to your Opponent's Burned Cards</span>
        </h2>

        <p>
          It may seem inconsequential to pay attention to the cards your opponents are burning, but if you pay attention to it early on in the game, you can learn important information about your opponent's deck. You can often figure things out about their deck archetype, the bombs they are planning on using against you later, and the nature of your starting hand.
        </p>

        <p>
          For instance, if you see your opponent burn an Armageddon Angel, you are probably going to be against a more controlly archetype of orange than the pure swarm aggro version of orange, and consequentially you should be careful about how much you commit to the board (especially in later turns).
        </p>

        <p>
          If you see them burn a strong defensive two drop with double gem cost such as Yahui, you might be able to infer that they are relatively low in the yellow cards that they would need to burn and decide not to play around Misanthropia.
        </p>

        <p>
          And if you see them burn a Singing Stone, you can be cognizant of the fact that you are probably going against a deck that is pretty heavy in enchantments. Perhaps you may decide to hold onto that Rewind Hex that you were originally planning to burn.
        </p>

        <p>
          Obviously, a lot of these examples require knowledge about what cards exist in the game, so it's not the easiest thing for someone brand new. But as you are learning about the game, it's something you should try to keep in mind. It's free insight into what your opponent is planning on doing in the long haul and free information is always a good thing in CCGs.
        </p>

        <p>
          If you miss the card that your opponent burned, you can look in the top left hand corner of the screen at the game's history.
        </p>

        <h2>
          <span id="6">6. The Ins and Outs of the Different Paths</span>
        </h2>

        <p>
          There are five different paths that you can use when you build a deck and it is important to know what each one does, regardless of whether or not you are going to use that particular one. They can have a very large impact on how a game plays out, so you want to be aware of both your own and the opponents. Since there are only five, I'll try to go over each of them individually.
        </p>

        <p>
          A lot of people just think of <strong>Turn of Seasons</strong> as a free card every four turns. Yet in my opinion, three of the four seasons are pretty impactful and need to be played around. Fall nets the player a free card, Winter weakens their board, and Summer stabilizes their board - each of these can be capitalized on in their own way by either the player or their opponent. The only negligible one is Spring, but even that one can be relevant in determining a clock to lethal.
        </p>

        <p>
          <strong>Rainbow's End</strong> sometimes feels as though it just draws you an enchantment once in a while, but it also allows you a little bit of ramp in a pinch if you have an enchantment that is no longer useful. Additionally, if you need an enchantment in a very specific spot that is already occupied by an enchantment, you are able to replace an enchantment instead of placing it in a sub-optimal location.
        </p>

        <p>
          The most straight forward of the paths is <strong>Journey of Souls</strong> because it is a passive effect, but make sure that when you are making trades that you trade in the creatures you want to get back first. And if your opponent has a Journey of Souls path, make sure you kill their worst units first if possible so it takes longer for them to get back the good ones. Additionally, if you're using Journey of Souls and you receive a unit that you don't have any use for, keep in mind that you can burn it despite the fact that it's ephemeral. You won't see it again after you burn it, but a gem and a maximum power is probably better than a unit you don't need at all.
        </p>

        <p>
          <strong>Disk of Circadia</strong> is primarily used for the Discard feature in reanimator decks, but you're not using it to the fullest of it's ability if you aren't keeping in mind the other things that it does. During night, it's only you that gets the benefits of healing units that have not attacked, but at day time it's both you and your opponent that gains the benefits from Slayer. If you know you're going to be activating your ability during your turn, make sure you time it correctly. You may end up losing a unit you did not intend to lose if you activate your power at the wrong time.
        </p>

        <p>
          Last but not least is <strong>Fires of Creation</strong>. This one is IMO the weirdest of the five and the hardest one to use effectively, IMO it's only really usable in very specific artifact deck archetypes and even then it feels clunky. But when it shines, it's better than people give it credit for. The first forgling is pretty weak and is more or less just there to search for another artifact and restore some durability for your artifacts when you trade it in. But the second, fourth, fifth and sixth forgling are all actually quite strong in my opinion. Blast is a really powerful ability, and both armor and regen are pretty good on bigger units. I have yet to build a deck that make this path work very effectively, but I think that's more because I don't own the artifacts in order to make it do so. I did play a feature deck by Min Maxer that used it to good effect.
        </p>

        <p>
          Anyways, I hope this gives a bit of perspective of how much impact the paths can have and what they can offer a deck.
        </p>

        <h2>
          <span id="7">7. The Benefits of Crafting Commons and Uncommons</span>
        </h2>

        <p>
          Alright, so this one is going to be controversial because there are a lot of people who claim that the best way to use your essence is by saving it and using it exclusively on Mythics. But the game's economy really isn't fashioned in such a way that makes it beneficial to be so strict about your savings and you would be doing yourself a disservice to follow that advice. To understand why, we need to look at some numbers.
        </p>

        <p>
          The cost of crafting is as follows - 50 for a common, 100 for an uncommon, 500 for a rare, and 2400 for a mythic. But that isn't all, the amount of copies of a card that you can place in your deck is also determined by rarity. You can include a set of four commons for a price of 200 essence, three uncommons for 300 essence, two rares for 1000 essence, or one mythic for 2400.
        </p>

        <p>
          Also worth noting, is that there are some really good commons and uncommons in this game. I have recently built a Yellow Blue enchantment deck that has some great mythic bombs in it. But I would never be able to stave off aggro and make it to the late game if it wasn't for my 4 Meso Libres at the common slot or 3 Yahui uncommons. On average, those cards do much more work throughout my games than any individual mythic.
        </p>

        <p>
          And Mythics, while very strong, do not instantly win you games - the game is well balanced enough that all of them can be played around. Bragi Runesinger is a fantastic card creature with warded and great abilities attached to it, but it can still be Muttonmorphesized or Led Astray. Sapo the Devourer is a beast of a unit with warded but it can still be banished with Seal of Exile. And any mythic creature that was cheated into play with Hopeless Necromantic is susceptible to bounce from cards like Deported or Valkyrie Enforcer. Mythic artifacts and enchantments still powerful are generally more resilient, but mythic artifacts rely upon being defended by creatures and mythic enchantments usually require a minion to be occupying them to generate their effect. Mythics are strong but not 'I win' buttons all on their own.
        </p>

        <p>
          If you want to make a deck that can sometimes pull off great swings or do something very niche and specific, mythics are great for that. But these are not build around cards because you cannot guarantee that you will see them. Mythgard has some good deck manipulation tools but is very light in terms of tutors and the ones that exist are narrow - as far as I'm aware, it's pretty much just Bragi who relies on being on the board for four turns before he can tutor enchantments, and Pseudonomicon but only for finding previously burned cards.
        </p>

        <p>
          So what am I getting at here? Mythics are great and can definitely help to clinch wins, but you can only have one copy per deck and there's no guarantee that you'll see them in a match. If you're neglecting to craft commons because you are saving for mythics, you probably aren't going to have the appropriate shell for the mythic to slot into when you finally do get it and you'll have to craft some of those cards anyways before you can use the mythic to full effect.
        </p>

        <p>
          It's also important to consider how fast you are earning booster packs. You earn them at a significantly faster rate when you're using a solid, consistent deck. It's hard to do that without the necessary commons and uncommons for the goal that your deck is trying to achieve. That means that you are essentially paying an opportunity cost with your time if you decide to save all of your essence instead of investing some of it into the quality of your deck. In a sense, the commons and uncommons that you invest in early on will pay for themselves.
        </p>

        <p>
          Finally, it's important to remember that the game rewards you with Wild Mythic cards. There are two that will be guaranteed to you early on as long as you complete the missions as they pop up. These two can be used for any colour. There are also six colour specific that will be awarded to you through the Maats system (these take significantly longer to obtain).
        </p>

        <p>
          TLDR: Don't spend your essence flippantly on commons and uncommons that you do not intend to use, but if you need some for your deck then do not be afraid to craft them.
        </p>

        <h2>
          Conclusion
        </h2>

        <p>
          Well, that was a little longer then I expected it to be. Once again, if you feel I missed anything important that new players need to know, let me know and I will edit it into the post (and give you credit). Also, if you notice that I have any misinformation in here please let me know and I will do my best to fix it.
        </p>

        <p>
          Cheers, and hope to see you all in game at some point!
        </p>

        </div>

      </Layout>
    </>
  );
}

export default NewPlayerGuide;
