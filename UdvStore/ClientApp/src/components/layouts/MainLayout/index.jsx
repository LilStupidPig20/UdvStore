import React, { useContext, useState } from "react";
import styles from "./MainLayout.module.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { CoinsContext } from "../../../context/CoinsContext";

export default function MainLayout({ children }) {
    const [isOpened, setIsOpened] = useState(false);
    const [isActive, setActive] = useState(false);
    const auth = useContext(AuthContext);

    
    let fullName = useContext(AuthContext).fullName;
    let coinsAmount = useContext(CoinsContext).coinsAmount;

    const toggleStates = () => {
        setActive(!isActive);
        setIsOpened(!isOpened);
    }

    return (
        <div className={styles.layout}>
            {isOpened &&
                <div className={styles.overlay}>
                    <div className={styles.drawer}>
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
                                <Link to="/profile" className={styles.link}>UDV-store</Link>
                            </li>
                            <li>
                                <Link to="/profile" className={styles.link}>Заявки</Link>
                            </li>
                            <li>
                                <Link to="/rules" className={styles.link}>Правила получения баллов</Link>
                            </li>
                        </ul>
                        <div className={styles.exitButton} onClick={() => auth.logout()}>Выйти</div>
                    </div>
                </div>
            }
            <div className={styles.navbar}>
                <div className={isActive ? styles.change : styles.container} onClick={toggleStates}>
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                </div>
                <div>

                    <img src="/imgs/udvLogo.svg" alt="Logo" className={styles.logo} />
                </div>

            </div>

            {children}
        </div>
    );
}