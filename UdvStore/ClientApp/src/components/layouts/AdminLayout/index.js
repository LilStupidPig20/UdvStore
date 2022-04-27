import React, { useContext } from 'react';
import styles from './adminLayout.module.css';
import { Link } from "react-router-dom";
import { ButtonStatesContext } from "../../../context/ButtonStatesContext";
import { AuthContext } from '../../../context/AuthContext';

export default function AdminLayout ({ children }) {
    const auth = useContext(AuthContext);
    let context = useContext(ButtonStatesContext);
    const isActive = context.isActive;
    
    return (
        <div className={styles.layout}>
                {isActive &&
                <div className={styles.overlay}>
                    <div className={styles.drawer}>
                        <ul className={styles.navMenu}>
                            <li>
                                <Link to="/requests" className={styles.link}>Заявки</Link>
                            </li>
                            <li>
                                <Link to="/orders" className={styles.link}>Заказы сотрудников</Link>
                            </li>
                            <li>
                                <Link to="/charge" className={styles.link}>Создать заявку</Link>
                            </li>
                            <li>
                                <Link to="/rules" className={styles.link}>Правила получения баллов</Link>
                            </li>
                        </ul>
                        <div className={styles.exitButton} onClick={() => auth.logout()}>Выйти</div>
                    </div>
                </div>
            }
            {children}
        </div>
    )

}