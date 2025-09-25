export interface ExchangeRate {
    data: Date,
    usd: string,
    jpy: string,
    eur: string,
    cny: string
}

export interface FetchRangeParams {
  start: string; // 'YYYY-MM-DD'
  end: string;   // 'YYYY-MM-DD'
}