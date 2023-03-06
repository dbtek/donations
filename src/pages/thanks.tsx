import { navigate } from 'gatsby';
import * as React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';


const ThanksPage = ({ location }) => {
  const search = new URLSearchParams(location ? location.search : '');
  const name = search.get('name');
  const amount = search.get('amount');
  const recurringTimes = search.get('recurringTimes');

  return (
    <Layout>
      <title>Donate</title>
      {name ? (
        <h1>Sn {name} bağışınız için teşekkür ederiz.</h1>
      ) : (
        <h1>Bağışınız için teşekkür ederiz.</h1>
      )}
      {amount ? (
        <p style={{ fontSize: '1.25rem' }}>
          Kartınızdan ₺{amount} tutarında ücret tahsil edildi.
          {recurringTimes && ` Düzenli bağış talimatı verdiniz. Aynı meblağ sonraki ${parseInt(recurringTimes) - 1} aylık eksterinize de yansıyacaktır.`}
        </p>
      ) : (
        <p style={{ fontSize: '1.25rem' }}>
          Bağışınız kartınızdan başarıyla tahsil edildi.
        </p>
      )}

      <Button primary onClick={() => navigate('/')}>
        Tekrar Bağış Yap
      </Button>
    </Layout>
  );
}

export default ThanksPage;