import React, { useContext } from "react";
import styles from "./MainLayout.module.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { CoinsContext } from "../../../context/CoinsContext";
import { ButtonStatesContext } from "../../../context/ButtonStatesContext";
import { Logo } from '../../Logo';

export default function MainLayout({ children }) {
    const auth = useContext(AuthContext);
    let context = useContext(ButtonStatesContext);
    const isActive = context.isActive;

    
    let fullName = useContext(AuthContext).fullName;
    let coinsAmount = useContext(CoinsContext).coinsAmount;

    return (
        <div className={styles.layout}>
            {isActive &&
                <div className={styles.overlay}>
                    <div className={styles.drawer}>
                        <div className={styles.logo_container}>
                            <Logo />
                        </div>
                        <div className={styles.userInfo}>
                            <img src="/imgs/profileImg-example.jpg" alt="" className={styles.userImg} />
                            <h3 className={styles.userNameP}>{fullName}</h3>
                            <div className={styles.wallet}>
                                <div>Баланс</div>
                                <span>|</span>
                                <div className={styles.moneyP}>{coinsAmount} UDV-coins</div>
                            </div>
                        </div>
                        <ul className={styles.navMenu}>
                            <li>
                                <Link to="/profile" className={styles.link}>Мой профиль</Link>
                            </li>
                            <li>
                                <Link to="/store" className={styles.link}>UDV-store</Link>
                            </li>
                            <li>
                                <Link to="/profile" className={styles.link}>История моей активности</Link>
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
    );
}