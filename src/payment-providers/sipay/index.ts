import { nanoid } from 'nanoid';
import { PAYMENT_FAIL_URL, PAYMENT_SUCCESS_URL } from '../../constants';
import { TPaymentProvider } from '../types';
import fetch from 'node-fetch';

async function getToken() {
  const res = await fetch(`${SIPAY.host}/ccpayment/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'app_id': SIPAY.appId,
      'app_secret': SIPAY.appSecret,
    }),
  });
  const result = await res.json();
  return result.data.token;
}

async function getPosList({ cardNumber, amount, currency, token }: {
  cardNumber: string;
  amount: string;
  currency: string;
  token: string;
}): Promise<{
  'pos_id': number;
  'allocation_id': number;
  'campaign_id': number;
  'currency_code': string;
  'currency_id': number;
  'payable_amount': string;
}[]> {
  const res = await fetch(`${SIPAY.host}/ccpayment/api/getpos`, {
    method: 'POST',
    body: JSON.stringify({
      'merchant_key': SIPAY.merchantKey,
      'credit_card': cardNumber,
      'amount': amount,
      'currency_code': currency
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result.data;
}

const SipayProvider: TPaymentProvider = {
  getPaymentFormItems: async function getPaymentFormItems(input) {
    const successUrl = PAYMENT_SUCCESS_URL;
    const failUrl = PAYMENT_FAIL_URL;

    const amount = input.amount.toFixed(2);
    const orderId = nanoid(8).toLowerCase();

    /** */
    const token = await getToken();

    const [firstname, ...nameRest] = input.name.split(' ');

    const invoiceItems = [{
      'name': 'Bağış',
      'price': amount,
      'qnantity': 1,
      'description': ''
    }];

    const posList = await getPosList({
      amount,
      cardNumber: input.ccNumber,
      currency: 'TRY',
      token,
    });

    const data = {
      'endpoint': `${SIPAY.host}/ccpayment/api/pay3d`,
      'authorization': token,
      'cc_holder_name': input.ccHolder,
      'cc_no': input.ccNumber,
      'expiry_month': input.ccExpireMonth,
      'expiry_year': input.ccExpireYear,
      'cvv': input.ccCVV,
      'total': amount,
      'merchant_key': SIPAY.merchantKey,
      'app_id': SIPAY.appId,
      'app_secret': SIPAY.appSecret,
      'name': firstname,
      'surname': nameRest.join(' '),
      'items': JSON.stringify(invoiceItems),
      'return_url': successUrl,
      'cancel_url': failUrl,
      'invoice_id': orderId,
      'bill_address1': '',
      'bill_address2': '',
      'bill_city': '',
      'bill_postcode': '',
      'bill_state': '',
      'bill_country': 'Türkiye',
      'bill_email': '',
      'bill_phone': input.phone,
      'pos_id': posList[0].pos_id,
      'allocation_id': posList[0].allocation_id,
      'campaign_id': posList[0].campaign_id,
      'currency_code': posList[0].currency_code,
      'currency_id': posList[0].currency_id,
      'installments_number': 1,
      'payable_amount': posList[0].payable_amount,
      'discount': 0,
    };

    if (input.recurring) {
      data['order_type'] = 1;
      data['recurring_payment_number'] = input.recurringTimes;
      data['recurring_payment_cycle'] = 'M';
      data['recurring_payment_interval'] = 1;
    }

    return data;
  },

  validatePayment() {
    return true;
  }
}

export default SipayProvider;

const SIPAY = {
  host: 'https://app.sipay.com.tr' || process.env.SIPAY_HOST,
  merchantKey: process.env.SIPAY_MERCHANT_KEY,
  appId: process.env.SIPAY_APP_ID,
  appSecret: process.env.SIPAY_APP_SECRET,
};
