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
  });

  // support async getPaymentFormItems methods
  const formItems = await Promise.resolve(data);
  res.json(formItems);
}