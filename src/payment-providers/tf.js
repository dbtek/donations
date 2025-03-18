"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var constants_1 = require("../constants");
var TFProvider = {
    getPaymentFormItems: function (input) {
        var TEST = process.env['TF_TEST_MODE'] === '1';
        var TF = TEST ? TF_TEST : TF_PROD;
        var clientId = TF.clientId;
        var successUrl = constants_1.PAYMENT_SUCCESS_URL;
        var failUrl = constants_1.PAYMENT_FAIL_URL;
        var storeKey = TF.storeKey;
        var refreshTime = process.env['TF_REFRESH_TIME'] || '5';
        var parameters = {
            amount: String(input.amount),
            BillToCompany: '',
            BillToName: input.name,
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
            parameters['RecurringPaymentNumber'] = input.recurringTimes.toString();
            parameters['RecurringFrequencyUnit'] = 'M';
            parameters['RecurringFrequency'] = '1';
        }
        var sortedKeys = Object.keys(parameters).sort(function (a, b) { return a.localeCompare(b, undefined, { sensitivity: 'base' }); });
        var sortedValues = sortedKeys.map(function (key) { return parameters[key] || ''; }).map(escapeSpecialChars); // Include empty values
        var hashStr = "".concat(sortedValues.join('|'), "|").concat(storeKey);
        console.log('hashStr', parameters, hashStr);
        var secData = crypto.createHash('sha512')
            .update(hashStr)
            .digest('hex');
        var hashData = Buffer.from(secData, 'hex').toString('base64');
        var data = __assign({ 
            //'hashStr': hashStr,
            'hash': hashData, 'endpoint': TF.endpoint }, parameters);
        return data;
    },
    validatePayment: function () {
        return true;
    }
};
function escapeSpecialChars(value) {
    return value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
}
exports.default = TFProvider;
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
        password: process.env['TF_API_PASSWORD'],
    },
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
        password: '',
    },
};
