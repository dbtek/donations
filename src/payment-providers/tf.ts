import * as crypto from 'crypto';
import { nanoid } from 'nanoid';
import { PAYMENT_FAIL_URL, PAYMENT_SUCCESS_URL } from '../constants';
import { TPaymentProvider } from './types';

const TFProvider: TPaymentProvider = {
  getPaymentFormItems(input) {
    const TEST = process.env['TF_TEST_MODE'] === '1';
    let TF = TEST ? TF_TEST : TF_PROD;

    const clientId = TF.clientId!;
    const successUrl = PAYMENT_SUCCESS_URL;
    const failUrl = PAYMENT_FAIL_URL;
    const storeKey = TF.storeKey;
    const refreshTime = process.env['TF_REFRESH_TIME'] || '5';

    const parameters = {
      amount: String(input.amount),
      BillToCompany: '',
      // BillToName: input.name,
      callbackUrl: successUrl,
      clientId: clientId,
      currency: '949',
      failUrl: failUrl,
      hashAlgorithm: 'ver3',
      Instalment: '',
      lang: 'tr',
      okUrl: successUrl,
      refreshTime: refreshTime,
      rnd: new Date().getTime().toString(),
      storetype: '3D_PAY_HOSTING',
      TranType: 'Auth'
    };

    if (input.recurring) {
      parameters['RecurringPaymentNumber'] = input.recurringTimes!.toString();
      parameters['RecurringFrequencyUnit'] = 'M';
      parameters['RecurringFrequency'] = '1';
    }

    const sortedKeys = Object.keys(parameters).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) as (keyof typeof parameters)[];
    const sortedValues = sortedKeys.map(key => parameters[key] || '').map(escapeSpecialChars); // Include empty values
    const hashStr = `${sortedValues.join('|')}|${storeKey}`;
    console.log('hashStr', parameters, hashStr);

    const secData = crypto.createHash('sha512')
      .update(hashStr)
      .digest('hex');

    const hashData = Buffer.from(secData, 'hex').toString('base64');

    const data = {
      //'hashStr': hashStr,
      'hash': hashData,
      'endpoint': TF.endpoint,

      ...parameters
    };

    return data;
  },

  validatePayment() {
    return true;
  }
}

function escapeSpecialChars(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
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
