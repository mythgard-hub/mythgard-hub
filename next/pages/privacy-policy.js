/**
 * Note our OAuth consent settings reference the URL `/privacy-policy`
 *
 * If you change this page's filename please update our OAuth consent screen
 * settings in the Google Developer's Console.
 */

import Layout from '../components/layout';

function PrivacyPolicyPage() {
  return (
    <Layout
      title="Mythgard Hub | Privacy Policy"
      desc="The Mythgard Hub privacy policy"
    >
      <h1>Privacy Policy</h1>

      <h2>
        What personal information do we collect from the people that visit
        mythgardhub.com?
      </h2>

      <p>Google Analytics is used throughout Mythgardhub.com.</p>

      <h2>When and what information do we collect?</h2>

      <p>
        Because there is no native login system with Mythgard Hub we collect no
        personal data outside of that which is collected by Google Analytics,
        Google Service Login, or Facebook Login. 
      </p>

      <p>
        Your Mythgard Hub browsing and search history, upload, download, import,
        and export data is collected as you use the site for its intended
        purposes. 
      </p>

      <h2>How do we use your information?</h2>

      <p>
        Your account information is used to better enhance your experience on
        Mythgard Hub. By looking at the above information we can see what our
        most popular features are, and certain features will not work unless you
        are logged in.
      </p>

      <h2>Do we use cookies?</h2>

      <p>
        Yes. Cookies are small files that a site or its service provider
        transfers to your computer's hard drive through your Web browser (if you
        allow) that enables the site's or service provider's systems to
        recognize your browser and capture and remember certain information. For
        instance, we use cookies to help us remember and process the cards you
        search most, and the other users that you browse decks for. They are
        also used to help us understand your preferences based on previous or
        current site activity, which enables us to provide you with improved
        services. We also use cookies to help us compile aggregate data about
        site traffic and site interaction so that we can offer better site
        experiences and tools in the future.
      </p>

      <p>
        They're also used to understand and save user's preferences for future
        visits.
      </p>

      <p>
        You can choose to have your computer warn you each time a cookie is
        being sent, or you can choose to turn off all cookies. You do this
        through your browser settings. Because each browser is a little
        different, look at your browser's Help Menu to learn the correct way to
        modify your cookies.
      </p>

      <p>If you turn cookies off, some features will be disabled.</p>

      <h2>Third-party disclosure</h2>

      <p>
        We do not sell, trade, or otherwise transfer to outside parties your
        Personally Identifiable Information unless we provide users with advance
        notice. This does not include website hosting partners and other parties
        who assist us in operating our website, conducting our business, or
        serving our users, so long as those parties agree to keep this
        information confidential. We may also release information when it's
        release is appropriate to comply with the law, enforce our site
        policies, or protect ours or others' rights, property or safety.
      </p>

      <h2>Third-party links</h2>

      <p>
        Occasionally, at our discretion, we may include or offer third-party
        products or services on our website. These third-party sites have
        separate and independent privacy policies. We therefore have no
        responsibility or liability for the content and activities of these
        linked sites. Nonetheless, we seek to protect the integrity of our site
        and welcome any feedback about these sites.
      </p>

      <h2>Google</h2>

      <p>
        Google's advertising requirements can be summed up by Google's
        Advertising Principles. They are put in place to provide a positive
        experience for users.
        https://support.google.com/adwordspolicy/answer/1316548?hl=en
      </p>

      <h2>We use Google AdSense Advertising on our website.</h2>

      <p>
        Google, as a third-party vendor, uses cookies to serve ads on our site.
        Google's use of the DART cookie enables it to serve ads to our users
        based on previous visits to our site and other sites on the Internet.
        Users may opt-out of the use of the DART cookie by visiting the Google
        Ad and Content Network privacy policy.
      </p>

      <h2>Facebook</h2>

      <p>
        Facebook’s advertising requirements can be summed up by Facebook
        Newsroom. They are put in place to provide a positive experience for
        users who chose to log in through Facebook for our service.
        https://newsroom.fb.com/news/2017/11/our-advertising-principles/
      </p>
    </Layout>
  );
}

export default PrivacyPolicyPage;
