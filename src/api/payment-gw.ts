import { Request, Response } from 'express';
import * as config from '../constants';
import providers from '../payment-providers';
import { TPaymentProvider } from '../payment-providers/types';

function getProvider(): TPaymentProvider {
  return providers[config.DEFAULT_PAYMENT_PROVIDER];
}

export default async function paymentGW(req: Request, res: Response) {
  const body = JSON.parse(req.body);
  const provider = getProvider();

  const data = provider.getPaymentFormItems({
    amount: body['amount'],
    name: body['name'],
    recurring: body['recurring'],
    recurringTimes: body['recurringTimes'],
    phone: body['phone'],
    notes: body['notes'],
    ccHolder: body['ccHolder'],
    ccNumber: body['ccNumber'],
    ccExpireMonth: body['ccExpireMonth'],
    ccExpireYear: body['ccExpireYear'],
    ccCVV: body['ccCVV'],
  });

  // support async getPaymentFormItems methods
  const formItems = await Promise.resolve(data);
  res.json(formItems);
}