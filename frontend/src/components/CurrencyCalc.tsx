import React, { useState, useEffect } from 'react';
import styles from '../styles/CurrencyCalculator.module.scss';

interface Currency {
  code: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'KRW', flag: '🇰🇷' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'JPY', flag: '🇯🇵' }
];

// 샘플 환율 데이터
const exchangeRates: Record<string, Record<string, number>> = {
  'USD': { 'KRW': 1340, 'EUR': 0.92, 'JPY': 149 },
  'KRW': { 'USD': 0.000746, 'EUR': 0.000687, 'JPY': 0.111 },
  'EUR': { 'USD': 1.09, 'KRW': 1456, 'JPY': 162 },
  'JPY': { 'USD': 0.0067, 'KRW': 9.0, 'EUR': 0.0062 }
};

const CurrencyCalculator: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('KRW');
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [toAmount, setToAmount] = useState<string>('1,340');

  const getCurrencyByCode = (code: string): Currency | undefined => {
    return currencies.find(c => c.code === code);
  };

  // 환율 계산 함수
  const calculateExchange = (): void => {
    if (!fromAmount || isNaN(Number(fromAmount))) {
      setToAmount('0');
      return;
    }

    if (fromCurrency === toCurrency) {
      setToAmount(parseFloat(fromAmount).toLocaleString());
      return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    const convertedAmount = parseFloat(fromAmount) * rate;
    setToAmount(convertedAmount.toLocaleString());
  };

  // 금액이나 통화가 변경될 때마다 자동 계산
  useEffect(() => {
    calculateExchange();
  }, [fromAmount, fromCurrency, toCurrency]);

  return (
    <div className={styles.calculator}>
      {/* From Currency + Amount Input */}
      <div className={styles.row}>
        <div className={styles.currencySelect}>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className={`${styles.select} ${styles.selectPrimary}`}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          
          <div className={styles.flag}>
            {getCurrencyByCode(fromCurrency)?.flag}
          </div>
          
          <div className={`${styles.arrow} ${styles.arrowPrimary}`}>
            ▼
          </div>
        </div>

        <input
          type="number"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* To Currency + Result Display */}
      <div className={styles.row}>
        <div className={styles.currencySelect}>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className={`${styles.select} ${styles.selectSecondary}`}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          
          <div className={styles.flag}>
            {getCurrencyByCode(toCurrency)?.flag}
          </div>
          
          <div className={`${styles.arrow} ${styles.arrowSecondary}`}>
            ▼
          </div>
        </div>

        <div className={styles.result}>
          {toAmount}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;