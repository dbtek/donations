import * as React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { HERO_IMG_URL } from '../constants';

const styles = {
  amtBtn: {
    margin: '0.5rem',
  },
};

// markup
const DonatePage = () => {
  const [amount, setAmount] = React.useState(50)
  const [customAmount, setCustomAmount] = React.useState(false)
  const amountOpts = [50, 100, 250];
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [recurring, setRecurring] = React.useState(false)
  const [recurringTimes, setRecurringTimes] = React.useState(6)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resd = await fetch('/api/payment-gw', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        name,
        recurring,
        recurringTimes,
        phone,
        notes,
      })
    }).then(r => r.json());
    const { endpoint, ...res } = resd;
    const $form = document.createElement('form');
    Object.entries(res).forEach(([n, v]) => {
      const $input = document.createElement('input');
      $input.name = n;
      $input.title = n;
      $input.value = v as string;
      $form.appendChild($input);
    });
    const $submit = document.createElement('button');
    $submit.innerText = 'submit';
    $form.appendChild($submit);
    $form.action = endpoint;
    $form.method = 'POST';
    document.body.appendChild($form);
    $form.submit();
  }

  return (
    <Layout className="Donate">
      <title>Bağış Yap</title>
      <h1>Bağış</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-control sm">
          <label htmlFor="amount">Miktar</label>
          {amountOpts.map(amt => (
            <Button
              type="button"
              key={`amt-${amt}`}
              primary={!customAmount && amt === amount}
              style={styles.amtBtn}
              onClick={() => {
                setAmount(amt);
                setCustomAmount(false);
              }}
            >
              ₺{amt}
            </Button>
          ))}
          <Button
            type="button"
            primary={customAmount}
            style={styles.amtBtn}
            onClick={e => setCustomAmount(!customAmount)}
          >
            Özel
          </Button>
        </div>
        {customAmount && (
          <div className="form-control sm">
            <label htmlFor="amount">
              Özel Miktar
            </label>
            <input
              name="amount"
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={e => setAmount(parseFloat(e.target.value))}
              required
            />
          </div>
        )}
        <div className="form-control sm">
          <label>
            <input name="recurring" type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
            {' '} Düzenli Bağış (Limit bloke etmeksizin aylık bağış)
          </label>
        </div>
        {recurring && (
          <div className="form-control sm">
            <label htmlFor="recurringTimes">
              Düzenli Bağış Süresi
            </label>
            <select name="recurringTimes" value={recurringTimes} onChange={e => setRecurringTimes(parseInt(e.target.value))}>
              {[1, 3, 6, 9, 12, 24, 36].map(m => (
                <option value={m}>{m} ay</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-control sm">
          <label htmlFor="name">İsminiz</label>
          <input name="name" id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div className="form-control sm">
          <label htmlFor="phone">Telefon numaranız</label>
          <input name="phone" id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>

        <div className="form-control md">
          <label htmlFor="notes">Bize iletmek istediğiniz bir not var mı?</label>
          <textarea name="notes" id="notes" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div className="form-control md" style={{ marginTop: '3rem' }}>
          <Button type="submit" primary>
            Bağış Yap
          </Button>
        </div>
      </form>

      {HERO_IMG_URL && (
        <div className="Donate-hero has-shadow--3">
          <img src={HERO_IMG_URL} />
        </div>
      )}
    </Layout>
  )
}


export default DonatePage