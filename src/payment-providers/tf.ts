import * as crypto from 'crypto';
import { nanoid } from 'nanoid';
import { PAYMENT_FAIL_URL, PAYMENT_SUCCESS_URL } from '../constants';
import { TPaymentProvider } from './types';

const TFProvider: TPaymentProvider = {
  getPaymentFormItems(input) {
    const TEST = process.env['TF_TEST_MODE'] === '1';
    let TF = TEST ? TF_TEST : TF_PROD;
    
    const clientId = TF.clientId;
    const successUrl = PAYMENT_SUCCESS_URL;
    const failUrl = PAYMENT_FAIL_URL;
    const storeKey = TF.storeKey;
    const txnType = 'Auth';
    const rnd = new Date().getTime();
    const currencyCode = '949'

    const instalments = '';

    const amount = String(input.amount);
    const orderId = nanoid(8).toLowerCase();

    const hashStr = clientId + orderId + amount + successUrl + failUrl + txnType + instalments + rnd + storeKey;

    const secData = crypto.createHash('sha1')
      .update(hashStr)
      .digest('hex');

    const hashData = Buffer.from(secData, 'hex').toString('base64');

    const isRecurring = input.recurring;

    const data = {
      'hashStr': hashStr,
      'hashData': hashData,
      'endpoint': TF.endpoint,
      'clientid': clientId,
      'amount': amount,
      'oid': orderId,
      'okUrl': successUrl,
      'failUrl': failUrl,
      'islemtipi': txnType,
      'taksit': instalments,
      'rnd': rnd,
      'hash': hashData,
      'storetype': '3d_pay_hosting',
      'refreshtime': process.env['TF_REFRESH_TIME'],
      'lang': 'tr',
      'currency': currencyCode,
      'Fismi': input.name,
      'tismi': input.name,
      'tel': input.phone,
      'Fadres': input.notes || '',
      'tadres': input.notes || '',
      'Fil': '',
    };

    if (isRecurring) {
      data['RecurringPaymentNumber'] = input.recurringTimes;
      data['RecurringFrequencyUnit'] = 'M';
      data['RecurringFrequency'] = 1;
    }

    return data;
  },

  validatePayment() {
    return true;
  }
}

export default TFProvider;

/**
 * Prod config
 */
const TF_PROD = {
  endpoint: 'https://sanalpos.turkiyefinans.com.tr/fim/est3Dgate',
  clientId: process.env['TF_CLIENT_ID'],
  storeKey: process.env['TF_STORE_KEY'],
  api: {
    url: 'https://sanalpos.turkiyefinans.com.tr/fim/api',
    username: process.env['TF_API_USERNAME'],
    password: process.env['TF_API_PASSWORD'],
  },
};

/**
 * Tets config
 */
const TF_TEST = {
  endpoint: 'https://sanalpos.turkiyefinans.com.tr/fim/est3Dgate',
  clientId: '280000300',
  storeKey: 'TRPS2828',
  api: {
    url: 'https://sanalpos.turkiyefinans.com.tr/fim/api',
    username: '',
    password: '',
  },
};
