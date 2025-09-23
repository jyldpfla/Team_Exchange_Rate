// src/components/layout/Nav.tsx
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Rocket } from "lucide-react"; // 왼쪽 로고 아이콘 예시
import styles from "../styles/Nav.module.scss";
import { useEffect, useRef, useState } from "react";

const Nav = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const menus = [
        { 
            label: "DataSet", 
            path: "/databoard",
        },
        { 
            label: "Visualization", 
            path: "/visualizationboard",
            dropdown: [
                { label: "S&P500", path: "/visualizationboard/S&P500" }
            ]
        },
        { 
            label: "Insights", 
            path: "/insightsboard" 
            // dropdown이 없는 메뉴
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuClick = (menuLabel: string, hasDropdown: boolean) => {
        if (hasDropdown) {
            setActiveDropdown(activeDropdown === menuLabel ? null : menuLabel);
        } else {
            setActiveDropdown(null);
        }
    };

    const handleDropdownItemClick = () => {
        setActiveDropdown(null);
    };

    return (
        <nav className={styles.nav} ref={dropdownRef}>
            <div className={styles.left}>
                <Rocket 
                    className={styles.logo} 
                    size={20} 
                    onClick={() => window.location.href="/dashboard"} 
                />
            </div>
            <ul className={styles.menu}>
                {menus.map((menu) => (
                    <li key={menu.path} className={styles.menuItem}>
                        <div className={styles.menuWrapper}>
                            <Link
                                to={menu.path}
                                className={`${styles.link} ${location.pathname === menu.path ? styles.active : ""}`}
                                onClick={() => handleMenuClick(menu.label, !!menu.dropdown)}
                            >
                                {menu.label}
                                {menu.dropdown && (
                                    <ChevronDown 
                                        className={`${styles.chevron} ${activeDropdown === menu.label ? styles.chevronUp : ''}`}
                                        size={16}
                                    />
                                )}
                            </Link>
                            
                            {menu.dropdown && (
                                <div className={`${styles.dropdown} ${activeDropdown === menu.label ? styles.dropdownOpen : ''}`}>
                                    {menu.dropdown.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`${styles.dropdownItem} ${location.pathname === item.path ? styles.dropdownItemActive : ''}`}
                                            onClick={handleDropdownItemClick}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
