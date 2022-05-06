import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ButtonStatesContext } from "../../../context/ButtonStatesContext";
import styles from './nonAuthLayout.module.css';

export default function NonAuthLayout ({ children }) {
    let context = useContext(ButtonStatesContext);
    const isActive = context.isActive;
    
    return (
        <div className={styles.layout}>
                {isActive &&
                    <div className={styles.overlay}>
                        <div className={styles.drawer}>
                            <ul className={styles.navMenu}>
                                <li>
                                    <Link to="/" className={styles.link}>Главная</Link>
                                </li>
                                <li>
                                    <Link to="/store" className={styles.link}>UDV-store</Link>
                                </li>
                                <li>
                                    <Link to="/rules" className={styles.link}>Правила получения баллов</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            {children}
        </div>
    )

}