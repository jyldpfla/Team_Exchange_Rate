import styles from "../styles/Dashboard.module.scss";
import dataStyles from "../styles/DataBoard.module.scss";
import Header from "../layout/Header";
import CommodityTableCard from "../components/CommodityTableCard";
import { rows } from "../constants/sampleDatas";
import { GRAPH_OPTIONS } from "../constants/options";

interface Props {
    className?: string;
}

export default function DataBoardPage(props: Props) {
    const { className } = props;

    return (
        <div className={`${styles.page} ${className}`}>

            <Header title="DataSets" />

            {/* 본문 컨텐츠 두 컬럼 */}
            <main className={styles.content}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={`${styles.card} ${dataStyles.card}`}>
                        <div className={styles.cardHeader}>
                            <h2>Datas</h2>
                        </div>
                        <CommodityTableCard rows={rows} columns={[]} />
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
