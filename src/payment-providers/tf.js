"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var nanoid_1 = require("nanoid");
var constants_1 = require("../constants");
var TFProvider = {
    getPaymentFormItems: function (input) {
        var TEST = process.env['TF_TEST_MODE'] === '1';
        var TF = TEST ? TF_TEST : TF_PROD;
        console.log(process.env);
        var clientId = TF.clientId;
        var successUrl = constants_1.PAYMENT_SUCCESS_URL;
        var failUrl = constants_1.PAYMENT_FAIL_URL;
        var storeKey = TF.storeKey;
        var txnType = 'Auth';
        var rnd = new Date().getTime();
        var currencyCode = '949';
        var instalments = '';
        var amount = String(input.amount);
        var orderId = nanoid_1.nanoid(8).toLowerCase();
        var hashStr = clientId + orderId + amount + successUrl + failUrl + txnType + instalments + rnd + storeKey;
        var secData = crypto.createHash('sha1')
            .update(hashStr)
            .digest('hex');
        var hashData = Buffer.from(secData, 'hex').toString('base64');
        var isRecurring = input.recurring;
        var data = {
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
            'Fadres': input.notes || '',
            'tadres': input.notes || '',
            'Fil': ''
        };
        if (isRecurring) {
            data['RecurringPaymentNumber'] = input.recurringTimes;
            data['RecurringFrequencyUnit'] = 'M';
            data['RecurringFrequency'] = 1;
        }
        return data;
    },
    validatePayment: function () {
        return true;
    }
};
exports["default"] = TFProvider;
/**
 * Prod config
 */
var TF_PROD = {
    endpoint: 'https://sanalpos.turkiyefinans.com.tr/fim/est3Dgate',
    clientId: process.env['TF_CLIENT_ID'],
    storeKey: process.env['TF_STORE_KEY'],
    api: {
        url: 'https://sanalpos.turkiyefinans.com.tr/fim/api',
        username: process.env['TF_API_USERNAME'],
        password: process.env['TF_API_PASSWORD']
    }
};
/**
 * Tets config
 */
var TF_TEST = {
    endpoint: 'https://sanalpos.turkiyefinans.com.tr/fim/est3Dgate',
    clientId: '280000300',
    storeKey: 'TRPS2828',
    api: {
        url: 'https://sanalpos.turkiyefinans.com.tr/fim/api',
        username: '',
        password: ''
    }
};
