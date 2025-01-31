import * as React from 'react';
import Button from '../components/Button';
import { CreditCardForm } from '../components/CreditCardForm';
import Layout from '../components/Layout';
import { CC_FORM_ENABLED, RECURRING_PAYMENT_ENABLED, HERO_IMG_URL, AMOUNT_OPTS } from '../constants';

const styles = {
  amtBtn: {
    margin: '0.5rem',
  },
};

const expireMonthOpts = Array(12).fill(1).map((_, i) => (i + 1).toString().padStart(2, '0'));
const expireYearOpts = Array(15).fill(1).map((_, i) => new Date().getFullYear() + i);

// markup
const DonatePage = () => {
  const amountOpts = AMOUNT_OPTS;
  const [amount, setAmount] = React.useState(amountOpts[0])
  const [customAmount, setCustomAmount] = React.useState(false)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [recurring, setRecurring] = React.useState(false)
  const [recurringTimes, setRecurringTimes] = React.useState(6)
  const [ccFormVisible, setCcFormVisible] = React.useState(false);

  const [ccHolder, setCcHolder] = React.useState('');
  const [ccNumber, setCcNumber] = React.useState('');
  const [ccExpireMonth, setCcExpireMonth] = React.useState(expireMonthOpts[0]);
  const [ccExpireYear, setCcExpireYear] = React.useState(expireYearOpts[0]);
  const [ccCVV, setCcCVV] = React.useState('');

  const handlePayment = async () => {
    const resd = await fetch('/api/payment-gw', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        name,
        recurring,
        recurringTimes,
        phone,
        notes,
        ccHolder,
        ccNumber: (ccNumber || '').replace(/-/ig, ''),
        ccExpireMonth,
        ccExpireYear,
        ccCVV,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (CC_FORM_ENABLED && !ccFormVisible) {
      setCcFormVisible(true);
      return;
    }
    handlePayment();
  }

  return (
    <Layout className="Donate">
      <title>Bağış Yap</title>
      <h1>Bağış</h1>

      <form onSubmit={handleSubmit}>
        {!ccFormVisible ? (
        <>
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
          {RECURRING_PAYMENT_ENABLED && (
            <>
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
            </>
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
        </>
        ): (
          <CreditCardForm
            ccHolder={ccHolder}
            setCcHolder={setCcHolder}
            ccNumber={ccNumber}
            setCcNumber={setCcNumber}
            ccExpireMonth={ccExpireMonth}
            setCcExpireMonth={setCcExpireMonth}
            ccExpireYear={ccExpireYear}
            setCcExpireYear={setCcExpireYear}
            expireMonthOpts={expireMonthOpts}
            expireYearOpts={expireYearOpts}
            ccCVV={ccCVV}
            setCcCVV={setCcCVV}
          />
        )}
        <div className="form-control md" style={{ marginTop: '3rem' }}>
          {ccFormVisible && (
            <Button type="button" onClick={() => setCcFormVisible(false)} style={{ marginRight: '0.5rem' }}>
              Geri
            </Button>  
          )}
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