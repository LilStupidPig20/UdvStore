import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../Logo";
import styles from './nonAuthLayout.module.css';

export default function NonAuthLayout ({ children }) {
    const [isOpened, setIsOpened] = useState(false);
    const [isActive, setActive] = useState(false);

    const toggleStates = () => {
        setActive(!isActive);
        setIsOpened(!isOpened);
    }
    
    return (
        <div className={styles.layout}>
            {isOpened &&
                <div className={styles.overlay}>
                    <div className={styles.drawer}>
                        {/*<button className={isActive ? styles.change : styles.container} onClick={toggleStates}>
                            <div className={styles.bar1}></div>
                            <div className={styles.bar2}></div>
                            <div className={styles.bar3}></div>
                        </button>*/}
                        <ul className={styles.navMenu}>
                            <li>
                                <Link to="/" className={styles.link}>Главная</Link>
                            </li>
                            <li>
                                <Link to="/profile" className={styles.link}>UDV-store</Link>
                            </li>
                            <li>
                                <Link to="/rules" className={styles.link}>Правила получения баллов</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <div className={styles.navbar}>
                <div className={isActive ? styles.change : styles.container} onClick={toggleStates}>
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                </div>
                <div className={styles.logo_container}>
                    <Logo />
                </div>
            </div>

            {children}
        </div>
    )

}