import Layout from '../components/layout';
import PageBanner from '../components/page-banner';
import { imagePathMedium as getImagePath } from '../lib/card.js';
import useConfig from '../lib/use-config.js';
export default function Spoilers() {
  const title = 'Spoilers | Mythgard Hub';
  const { config, error, loading } = useConfig();

  if (error) {
    return 'error loading spoilers...';
  }

  if (loading) {
    return 'loading config';
  }

  const spoilers = config.spoilers.map(({ name }) => {
    return {
      name,
      imagePath: getImagePath(name, 'spoilers')
    };
  });

  const spoilersGrid = (
    <>
      <style jsx>{`
        .spoilers {
          display: grid;
          margin: 0;
          padding: 20px 0;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          column-gap: 10px;
          row-gap: 10px;
        }
        .spoilers > li {
          display: block;
          list-style: none;
        }
        .spoilers > li > img {
          display: block;
          width: 100%;
        }
      `}</style>
      <ul className="spoilers">
        {spoilers.map(s => {
          return (
            <li key={s.name}>
              <img
                data-cy="spoilerImg"
                className="card-image"
                src={s.imagePath}
                alt={s.name}
              />
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <>
      <Layout title={title}>
        <PageBanner image={PageBanner.IMG_CARDS} url="/cards">
          Spoilers
        </PageBanner>
        {spoilers.length ? (
          spoilersGrid
        ) : (
          <p style={{ margin: '20px 0' }}>
            No spoilers right now, check back later!
          </p>
        )}
      </Layout>
    </>
  );
}
