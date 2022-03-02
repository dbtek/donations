export type TPaymentInput = {
  name: string;
  phone: string;
  amount: number;
  recurring: boolean;
  recurringTimes?: number;
  notes?: string;
  ccHolder?: string;
  ccNumber?: string;
  ccExpireMonth?: string;
  ccExpireYear?: string;
  ccCVV?: string;
}

export type TPaymentProvider = {
  getPaymentFormItems: (input: TPaymentInput) => {
    endpoint: string,
    [key: string]: any
  } | Promise<{
    endpoint: string,
    [key: string]: any
  }>,
  validatePayment: () => boolean
}