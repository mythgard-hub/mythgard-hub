import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { imagePathMedium as getImagePath } from '../lib/card.js';
export default function Spoilers() {
  const title = 'Spoilers | Mythgard Hub';
  const spoilers = [
    {
      id: '1234',
      name: 'A Mind Of Its Own',
      imagePath: getImagePath('A Mind Of Its Own', 'spoilers')
    },
    {
      id: '1235',
      name: 'Academy Analyst',
      imagePath: getImagePath('Academy Analyst', 'spoilers')
    }
  ];

  const spoilersHtml = spoilers.map(s => {
    return (
      <li key={s.id}>
        <img className="card-image" src={s.imagePath} alt={s.name} />
      </li>
    );
  });

  return (
    <Layout title={title}>
      <PageBanner image={PageBanner.IMG_CARDS} url="/cards">
        Spoilers
      </PageBanner>
      {spoilersHtml}
    </Layout>
  );
}
