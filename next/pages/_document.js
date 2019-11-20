import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID, USE_GOOGLE_ANALYTICS } from '../lib/gtag';

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          {USE_GOOGLE_ANALYTICS && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}');
            `
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
