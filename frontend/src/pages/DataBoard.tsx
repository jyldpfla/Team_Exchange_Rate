import styles from "../styles/Dashboard.module.scss";
import dataStyles from "../styles/DataBoard.module.scss";
import Header from "../layout/Header";
import CommodityTableCard from "../components/CommodityTableCard";
import { CommoditiesColumns, grainColumns } from "../constants/sampleDatas";
import { GRAPH_OPTIONS } from "../constants/options";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { loadNLatestGrains, selectGrainsRows } from "../features/grains.slice";
import { loadNLatestCommodities, selectCommoditiesRows } from "../features/commodities.slice";
import { loadNLatestStock, selectStockRows } from "../features/stock.slice";

interface Props {
    className?: string;
}

export default function DataBoardPage(props: Props) {
    const { className } = props;
    const dispatch = useAppDispatch();
    const grainRows = useAppSelector(selectGrainsRows);
    const commoditiesRows = useAppSelector(selectCommoditiesRows);
    const stockRows = useAppSelector(selectStockRows);

    useEffect(() => {
        dispatch(loadNLatestGrains());
        dispatch(loadNLatestCommodities());
        dispatch(loadNLatestStock());
    }, [dispatch])

    return (
        <div className={`${styles.page} ${className}`}>

            <Header title="DataSets" />

            {/* 본문 컨텐츠 두 컬럼 */}
            <main className={styles.content}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={`${styles.card} ${dataStyles.card}`} style={{display: "block"}}>
                        <div className={styles.cardHeader}>
                            <h2>Datas</h2>
                        </div>
                        <CommodityTableCard rows={grainRows} columns={grainColumns} />
                        <CommodityTableCard title="Commodities" rows={commoditiesRows} columns={CommoditiesColumns} />
                        <CommodityTableCard title="Stock" rows={stockRows} columns={CommoditiesColumns} />
                    </div>
                </section>
                <aside className={styles.right}>
                    {/* 우측: 컨트롤/리스트 패널 */}
                    <div className={`${styles.card} ${dataStyles.card}`}>
                        <div className={styles.cardHeader}>
                            <h3>Graphs</h3>
                        </div>
                        <div className={`${styles.chartArea} ${dataStyles.chartArea}`}>
                            <div className={`${styles.fakeChart} ${dataStyles.fakeChart}`}>
                                {GRAPH_OPTIONS[0].label}
                            </div>
                            <div className={styles.fakeChart}>
                                {GRAPH_OPTIONS[0].label}
                            </div>
                            <div className={styles.fakeChart}>
                                {GRAPH_OPTIONS[0].label}
                            </div>
                            <div className={styles.fakeChart}>
                                {GRAPH_OPTIONS[0].label}
                            </div>
                            <div className={styles.fakeChart}>
                                {GRAPH_OPTIONS[0].label}
                            </div>
                        </div>
    
                    </div>
                </aside>

            </main>

        </div>
    );
}
