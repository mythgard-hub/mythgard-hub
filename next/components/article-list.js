import PropTypes from 'prop-types';
import Article from './article';

function ArticleList({ max }) {
  const list = [
    {
      title: '7 things I wish I knew when I was first starting out in Mythgard',
      url: 'https://mythgard-hub.github.io/7-things',
      description:
        'A detailed resource for new players that helps fill in the holes of the tutorial',
      date: new Date('2019-09-27T17:24:18.280Z')
    },
    {
      title: 'The Many Uses of Impel',
      url: 'https://teamdgn.net/2019/09/27/the-many-uses-of-impel/',
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
