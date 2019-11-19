import { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import Router from 'next/router';

const ModeratorPage = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      Router.push('/error');
    }
  });

  return (
    <Layout>
      <h1>Mythgard moderators</h1>
    </Layout>
  );
};

export default ModeratorPage;
