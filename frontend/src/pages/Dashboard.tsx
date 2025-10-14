import styles from "../styles/Dashboard.module.scss";
import Header from "../layout/Header";
import { useMemo } from "react";
import CurrencyCalculator from "../components/CurrencyCalc";
import CommodityTableCard from "../components/CommodityTableCard";
import { useAppSelector } from "../app/hook";
import { selectExchangeLoading, selectLatestExchange } from "../features/exchange.slice"
import ExchangeChart from "../layout/ExchangeChart";

interface Props {
    className?: string;
}

export default function DashboardPage(props: Props) {
    const { className } = props;
    const latest = useAppSelector(selectLatestExchange);
    const loading = useAppSelector(selectExchangeLoading);

    const headers = [{ key: "currency", header: "통화" }, { key: "exchange_rate", header: "현재 환율", className: "num" }];
    const rows = useMemo(() => {
        if (!latest) return [];
        return [
            { currency: "CNY", exchange_rate: latest.cny },
            { currency: "EUR", exchange_rate: latest.eur },
            { currency: "JPY", exchange_rate: latest.jpy },
            { currency: "USD", exchange_rate: latest.usd },
        ];
    }, [latest]);

    return (
        <div className={`${styles.page} ${className}`}>

            <Header />

            {/* 본문 컨텐츠 두 컬럼 */}
            <p>{loading}</p>
            <main className={styles.content}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Statistics</h2>
                            {/* <Select
                                options={CURRENCY_OPTIONS}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            /> */}
                        </div>

                        {/* 탭 */}
                        {/* <ToggleGroup /> */}

                        {/* 차트 영역(placeholder) */}
                        <div className={styles.chartArea}>
                            <div className={styles.chartWrapper}>
                                <ExchangeChart />
                            </div>
                        </div>
                    </div>
                </section>

                <aside className={styles.right}>
                    {/* 우측: 컨트롤/리스트 패널 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>환율계산기</h3>
                        </div>

                        <div className={styles.controls}>
                            <CurrencyCalculator />
                        </div>

                        <div className={styles.cardBody}>
                            <CommodityTableCard
                                title="환율 정보"
                                rows={rows}
                                columns={headers}
                            />
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
