"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var constants_1 = require("../../constants");
var node_fetch_1 = require("node-fetch");
function getToken() {
    return __awaiter(this, void 0, void 0, function () {
        var res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("".concat(SIPAY.host, "/ccpayment/api/token"), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            'app_id': SIPAY.appId,
                            'app_secret': SIPAY.appSecret,
                        }),
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.data.token];
            }
        });
    });
}
function getPosList(_a) {
    var cardNumber = _a.cardNumber, amount = _a.amount, currency = _a.currency, token = _a.token;
    return __awaiter(this, void 0, void 0, function () {
        var res, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("".concat(SIPAY.host, "/ccpayment/api/getpos"), {
                        method: 'POST',
                        body: JSON.stringify({
                            'merchant_key': SIPAY.merchantKey,
                            'credit_card': cardNumber,
                            'amount': amount,
                            'currency_code': currency
                        }),
                        headers: {
                            Authorization: "Bearer ".concat(token),
                            'Content-Type': 'application/json',
                        },
                    })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, result.data];
            }
        });
    });
}
var SipayProvider = {
    getPaymentFormItems: function getPaymentFormItems(input) {
        return __awaiter(this, void 0, void 0, function () {
            var successUrl, failUrl, amount, orderId, _a, firstname, nameRest, invoiceItems, token, posList, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        successUrl = constants_1.PAYMENT_SUCCESS_URL;
                        failUrl = constants_1.PAYMENT_FAIL_URL;
                        amount = input.amount.toFixed(2);
                        orderId = (0, nanoid_1.nanoid)(8).toLowerCase();
                        _a = input.name.split(' '), firstname = _a[0], nameRest = _a.slice(1);
                        invoiceItems = [{
                                'name': 'Bağış',
                                'price': amount,
                                'qnantity': 1,
                                'description': ''
                            }];
                        return [4 /*yield*/, getToken()];
                    case 1:
                        token = _b.sent();
                        return [4 /*yield*/, getPosList({
                                amount: amount,
                                cardNumber: input.ccNumber,
                                currency: 'TRY',
                                token: token,
                            })];
                    case 2:
                        posList = _b.sent();
                        data = {
                            'endpoint': "".concat(SIPAY.host, "/ccpayment/api/pay3d"),
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
                        return [2 /*return*/, data];
                }
            });
        });
    },
    validatePayment: function () {
        return true;
    }
};
exports.default = SipayProvider;
var SIPAY = {
    host: 'https://app.sipay.com.tr' || process.env.SIPAY_HOST,
    merchantKey: process.env.SIPAY_MERCHANT_KEY,
    appId: process.env.SIPAY_APP_ID,
    appSecret: process.env.SIPAY_APP_SECRET,
};
