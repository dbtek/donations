import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';

export const CreditCardForm = ({
  ccHolder,
  setCcHolder,
  ccNumber,
  setCcNumber,
  ccExpireMonth,
  setCcExpireMonth,
  ccExpireYear,
  setCcExpireYear,
  ccCVV,
  setCcCVV,
  expireMonthOpts,
  expireYearOpts,
}: {
  ccHolder: string;
  setCcHolder: (val: string) => void;
  ccNumber: string;
  setCcNumber: (val: string) => void;
  ccExpireMonth: string;
  setCcExpireMonth: (val: string) => void;
  ccExpireYear: number;
  setCcExpireYear: (val: number) => void;
  ccCVV: string;
  setCcCVV: (val: string) => void;
  expireMonthOpts: string[];
  expireYearOpts: number[];
}) => {
  return (
    <>
      <div className="form-control sm">
        <label htmlFor="ccHolder">
          Kart Sahibi
        </label>
        <input
          name="ccHolder"
          id="ccHolder"
          type="string"
          minLength={3}
          value={ccHolder}
          onChange={e => setCcHolder(e.target.value)}
          required
        />
      </div>
      <div className="form-control sm">
        <label htmlFor="ccNumber">
          Kart Numarası
        </label>
        <InputMask
          name="ccNumber"
          id="ccNumber"
          mask="9999-9999-9999-9999"
          onChange={e => setCcNumber(e.target.value)}
          value={ccNumber}
          required
        />
      </div>
      <div className="form-control sm">
        <label htmlFor="ccExpireMonth">
          Son Kullanma Tarihi
        </label>
        <select name="ccExpireMonth" value={ccExpireMonth} onChange={e => setCcExpireMonth(e.target.value)}
          style={{ marginRight: '0.5rem', width: '4rem' }}
        >
          {expireMonthOpts.map(m => (
            <option value={m}>{m}</option>
          ))}
        </select>
        <select name="ccExpireYear" value={ccExpireYear} onChange={e => setCcExpireYear(parseInt(e.target.value))}
          style={{ marginRight: '0.5rem', width: '5rem' }}
        >
          {expireYearOpts.map(y => (
            <option value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="form-control sm">
        <label htmlFor="ccCVV">
          Güvenlik Kodu (CVV)
        </label>
        <input
          name="ccCVV"
          id="ccCVV"
          type="string"
          minLength={3}
          value={ccCVV}
          onChange={e => setCcCVV(e.target.value)}
          required
        />
      </div>
    </>
  );
}