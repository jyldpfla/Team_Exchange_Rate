import { Link } from "react-router-dom";
import styles from "../styles/Main.module.scss";

export default function Main() {
    return (
        <div className={styles.snapContainer}>
            <section className={styles.snapsection}>
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>Economic Freedom</h1>
                        <p className={styles.subtitle}>간단한 설명이 삽입될 예정입니다.</p>
                    </header>

                    <nav className={styles.navigation}>
                        <button className={styles.navButton}>
                            <Link to="/databoard">Datas</Link>
                        </button>
                        <button className={styles.navButton}>
                            <Link to="/visualizationboard">Visualization</Link>
                        </button>
                        <button className={styles.navButton}>
                            <Link to="/insightsboard">Insight</Link>
                        </button>
                    </nav>
                </div>
            </section>
        </div>
    );
}