import type { Option } from "../types/option";

export const CURRENCY_OPTIONS:Option[] = [
    {value: "usd", label: "USD"},
    {value: "cny", label: "CNY"},
    {value: "eur", label: "EUR"},
    {value: "jpy", label: "JPY"},
]

export const GRAPH_OPTIONS: Option[] = [
    {value: "sp500", label: "S&P 500" },
    {value: "nasdaq", label: "NASDAQ" },
    { value: "kospi", label: "KOSPI" }
]

export const DATAS: Record<string, string[]> = {
    'STK': [
        '· 오늘, S&P 500 상승',
        '· 변동성 ↑',
        '· 기술주 강세'
    ],
    'IDX': [
        '· 닛케이 지수 하락',
        '· 엔화 약세 영향',
        '· 수출주 부진'
    ],
    'COMMO': [
        '· Cosmo지수 → 변동 폭 확대',
        '· 신흥시장 불안',
        '· 원자재 가격 상승'
    ]
};