import styles from "../styles/Dashboard.module.scss";
import visStyles from "../styles/Visualization.module.scss";
import Header from "../layout/Header";
import ToggleGroup from "../layout/ToggleGroup";
import Select from "../components/Select";
import { DATAS, GRAPH_OPTIONS } from "../constants/options";
import ChartCarousel from "../layout/ChartCarousel";
import { useState } from "react";

interface Props {
    className?: string;
}

export default function VisualizationBoardPage(props: Props) {
    const { className } = props;
    const [selectedOption, setSelectedOption] = useState(GRAPH_OPTIONS[0].value);
    const [isPaused, setIsPaused] = useState(false);

    const getSelectedIndex = () => {
        return GRAPH_OPTIONS.findIndex(opt => opt.value === selectedOption);
    };

    const getCurrentGraphLabel = () => {
        const currentOption = GRAPH_OPTIONS.find(opt => opt.value === selectedOption);
        return currentOption ? currentOption.label : GRAPH_OPTIONS[0].label;
    };

    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
        setIsPaused(true);

        // 10초 후 다시 자동 회전
        setTimeout(() => {
            setIsPaused(false);
        }, 10000);
    };

    const handleDetailView = () => {
        const currentLabel = getCurrentGraphLabel();
        // 여기에 상세보기 로직 구현
        console.log(`${currentLabel} 상세보기 클릭됨`);
        // 예: 모달 열기, 새 페이지 이동 등
    };

    return (
        <div className={`${styles.page} ${className}`}>

            <Header title="Visualization" />

            {/* 본문 컨텐츠 두 컬럼 */}
            <main className={`${styles.content} ${visStyles.content}`}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Statistics</h2>
                            <Select
                                options={GRAPH_OPTIONS}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            />
                        </div>

                        {/* 탭 */}
                        <ToggleGroup />

                        {/* 차트 영역(placeholder) */}
                        <div className={styles.chartArea}>
                            <ChartCarousel key={isPaused ? selectedOption : 'auto'} intervalMs={isPaused ? 0 : 3000} initialIndex={isPaused ? getSelectedIndex() : 0}>
                                {GRAPH_OPTIONS.map((option, index) => (
                                    <div key={index} className={styles.fakeChart} onClick={() => window.location.href=`/${option.label}`}>
                                        {option.label}
                                    </div>
                                ))}
                            </ChartCarousel>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}