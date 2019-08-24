import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

const getErrorMessage = statusCode =>
  ({
    404: `We couldn't find the page you're looking for.`,
    500: `Our servers hit a little snag. Not a big one, just a little one.`
  }[statusCode] || `Well, that didn't work.`);

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const msg = getErrorMessage(statusCode);
    return (
      <Layout>
        <h1>Error {statusCode}</h1>
        <p>{msg}</p>
        <p>
          Looking for a page that'll definitely work? Try{' '}
          <Link href="/">
            <a>this one</a>
          </Link>
          .
        </p>
        <p>
          Contact{' '}
          <a href="mailto:support@mythgardhub.com">support@mythgardhub.com</a>
          with any questions or concerns.
        </p>
      </Layout>
    );
  }
}

export default Error;
