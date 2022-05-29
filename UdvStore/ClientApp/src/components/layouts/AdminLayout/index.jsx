import React, { useContext } from 'react';
import styles from './adminLayout.module.css';
import { Link } from "react-router-dom";
import { ButtonStatesContext } from "../../../context/ButtonStatesContext";
import { AuthContext } from '../../../context/AuthContext';
import { Logo } from '../../Logo'

export default function AdminLayout ({ children }) {
    const auth = useContext(AuthContext);
    let context = useContext(ButtonStatesContext);
    const isActive = context.isActive;
    
    return (
        <div className={styles.layout}>
                {isActive &&
                <div className={styles.overlay} onClick={() => context.toggleActive(false)}>
                    <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.logo_container}>
                            <Link to='/requests'><Logo /></Link>
                        </div>
                        <ul className={styles.navMenu}>
                            <div className={styles.dropdown}>
                                <div className={styles.dropbtn}>Заявки</div>
                                <div className={styles.dropdownContent}>
                                    <Link to="/requests" className={styles.link}>
                                        <div className={styles.dropCont}>Новые</div>
                                    </Link>
                                    <Link to="/requests/history" className={styles.link}>
                                        <div className={styles.dropCont}>История</div>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.dropdown}>
                                <div className={styles.dropbtn}>Заказы</div>
                                <div className={styles.dropdownContent}>
                                    <Link to="/orders" className={styles.link}>
                                        <div className={styles.dropCont}>Новые</div>
                                    </Link>
                                    <Link to="/orders/history" className={styles.link}>
                                        <div className={styles.dropCont}>История</div>
                                    </Link>
                                </div>
                            </div>
                            <li>
                                <Link to="/charge" className={styles.link}>Начислить баллы</Link>
                            </li>
                            <li>
                                <Link to="/charge/history" className={styles.link}>История начислений</Link>
                            </li>
                            <li>
                                <Link to="/store" className={styles.link}>Склад UDV-store</Link>
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