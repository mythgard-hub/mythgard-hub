import PropTypes from 'prop-types';
import Article from './article';

function ArticleList({ max }) {
  const list = [
    {
      title: 'Player Agency in Mythgard',
      url: 'https://teamrankstar.com/article/player-agency-in-mythgard/',
      author: 'noahc92',
      description:
        'Today we’ll be discussing a term that is used often in game design and is really shown off well in Mythgard. Player Agency. What is it? What does it mean? Why does it matter?',
      date: new Date('2019-10-31T17:24:18.280Z')
    },
    {
      title: 'Deckbuilding 201 - Building on the Basics',
      url: 'https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-201-building-on-the-basics',
      author: 'Minmaxer',
      description:
        'In my first series of deckbuilding articles we started by examining the different deck archetypes and what they look like in Mythgard.  From there, I took a tour through each of the five Paths...',
      date: new Date('2019-10-25T17:24:18.280Z')
    },
    {
      title: 'Getting Started in Mythgard’s 2v2',
      url: 'https://teamrankstar.com/guide/getting-started-in-mythgards-2v2/',
      author: 'erobert',
      description:
        'Hey everyone, erobert here with a look at the mechanics and strategies of 2v2! The game mode itself is a raucous and chaotic shootout where you and your partner go head to head with another duo, and while this fun format operates with rules that are...',
      date: new Date('2019-10-23T17:24:18.280Z')
    },
    {
      title: 'Fast Lane: Thrift Shop',
      url: 'https://teamdgn.net/2019/10/02/fast-lane-thrift-shop/',
      author: '14ierophant',
      description:
        'Ever since middle school, I have been a die hard fan of control in CCGs. I love drawing cards, I love canceling and limiting my opponent’s options, and I love the slow burn of...',
      date: new Date('2019-10-02T17:24:18.280Z')
    },
    {
      title: '7 things I wish I knew when I was first starting out in Mythgard',
      url: '/7-things',
      author: 'AgitatedBadger',
      description:
        'A detailed resource for new players that helps fill in the holes of the tutorial',
      date: new Date('2019-10-01T17:24:18.280Z')
    },
    {
      title: 'Budget Decks for Mythgard - October 2019',
      url: 'https://teamrankstar.com/budget-decks-for-mythgard-october-2019/',
      author: 'noahc92',
      description:
        'October! What a fun month... trick-or-treaters, spoopy memes, budget decks... October truly has it all. Let’s sit down to enjoy some candy and talk about what this article is...',
      date: new Date('2019-09-29T17:24:18.280Z')
    },
    {
      title: "Lore Broker's Files: Chapter 1",
      url: 'https://teamrankstar.com/budget-decks-for-mythgard-october-2019/',
      author: 'The Mantid Man',
      description:
        'The first episode in a brand new series from Team Rankstar that covers the lore of Mythgard in short, easy to take in chunks.',
      date: new Date('2019-09-29T17:24:18.280Z')
    },
    {
      title: 'The Many Uses of Impel',
      url: 'https://teamdgn.net/2019/09/27/the-many-uses-of-impel/',
      author: 'NowayitsJ',
      description:
        'Why Should You Use Impel? Some of you may think, “Wow, Impel doesn’t give me immediate value or combat benefits, movement can’t have that much impact!”  Well in Mythgard...',
      date: new Date('2019-09-27T17:24:18.280Z')
    },
    {
      title: 'Budget Decks For Mythgard September 2019',
      url: 'https://teamrankstar.com/budget-decks-for-mythgard-september-2019/',
      author: 'noahc92',
      description:
        'Closed Beta is finally upon us in the land of Mythgard. With no more account wipe looming, it’s now more important than ever to be smart about building your collection...',
      date: new Date('2019-09-22T17:24:18.280Z')
    },
    {
      title: 'Yellow-Green Kolobok Ramp',
      url: 'https://teamrankstar.com/yellow-green-kolobok-ramp/',
      author: 'Tenchuu',
      description:
        'I was trapped in a loop. I wanted to play big powerful minions and I wanted to play Green...',
      date: new Date('2019-09-22T17:24:18.280Z')
    },
    {
      title: 'Advanced Lane Mechanics in Mythgard',
      url: 'https://teamrankstar.com/advanced-lane-mechanics-in-mythgard/',
      author: 'noahc92',
      description:
        'One of Mythgard’s most distinguishing features is its usage of lanes. This lane system leads to a very large number of nuanced decisions per game...',
      date: new Date('2019-09-22T17:24:18.280Z')
    },
    {
      title: 'Deckbuilding 105 - What about combo?',
      url:
        'https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-105-what-about-combo',
      author: 'Minmaxer',
      description:
        'The previous articles in this series examined the spectrum of Aggro, Midrange, and Control.  Combo sits outside the spectrum, and looks to play the game totally differently...',
      date: new Date('2019-09-22T17:24:18.280Z')
    },
    {
      title: 'Deckbuilding 104 - Control',
      url:
        'https://minmaxer.wixsite.com/mindfreak/post/deckbuilding-104-control',
      author: 'Minmaxer',
      description:
        'Control decks are in it for the long haul.  Traditionally, they play a patient, defensive game...',
      date: new Date('2019-09-22T17:24:18.280Z')
    }
  ];

  return (
    <div>
      {list.slice(0, max).map((item, ix) => (
        <Article
          key={ix}
          title={item.title}
          url={item.url}
          author={item.author}
          description={item.description}
          date={new Date(item.date)}
        />
      ))}
    </div>
  );
}

ArticleList.propTypes = {
  max: PropTypes.number
};

ArticleList.defaultProps = {
  max: Math.infinity
};

export default ArticleList;
