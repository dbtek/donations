export const PAYMENT_SUCCESS_URL = process.env['BASE_URL'] + '/api/payment-cb-success';
export const PAYMENT_FAIL_URL = process.env['BASE_URL'] + '/api/payment-cb-error';

export const RECURRING_PAYMENT_ENABLED = ['1', 'true'].includes(process.env['GATSBY_RECURRING_PAYMENT_ENABLED']);
export const DEFAULT_PAYMENT_PROVIDER = process.env['GATSBY_DEFAULT_PAYMENT_PROVIDER'];
export const CC_FORM_ENABLED = ['1', 'true'].includes(process.env['GATSBY_CC_FORM_ENABLED']);
export const LOGO_URL = process.env['GATSBY_LOGO_URL'];
export const COPYRIGHT = process.env['GATSBY_COPYRIGHT'];
export const HERO_IMG_URL = process.env['GATSBY_HERO_IMG_URL'];
export const AMOUNT_OPTS = (process.env['GATSBY_AMOUNT_OPTS'] || '250,500,1000').split(',').map(parseFloat)