import * as React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { navigate } from 'gatsby';

const ThanksPage = ({ location }) => {
  const search = new URLSearchParams(location ? location.search : '');
  const name = search.get('name');
  const message = search.get('message');

  return (
    <Layout>
      <title>Üzgünüz bağış alınamadı</title>
      <h1>Sn {name} üzgünüz, kartınızdan tahsilat yapılamadı :(</h1>
      <p style={{ fontSize: '1.25rem' }}>
        Hata: {message}
      </p>
      <p>
        Şimdilik tüm bildiğimiz bu.
      </p>

      <Button primary onClick={() => navigate('/')}>
        Tekrar Dene
      </Button>
    </Layout>
  );
}

export default ThanksPage;