import React, { useState } from "react";
import styles from "./MainLayout.module.css"
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
    const [isOpened, setIsOpened] = useState(false);
    console.log(isOpened);

    return (
        <div className={styles.layout}>
            {isOpened &&
                <div className={styles.overlay}>
                    <div className={styles.drawer}>
                        <button className={styles.closeButton} onClick={() => setIsOpened(false)}>Крестик</button>
                        <div className={styles.userInfo}>
                            <img src="/imgs/profileImg-example.jpg" alt="" className={styles.userImg} />
                            <h3 className={styles.userNameP}>Ольга Сергеевна Шульц</h3>
                            <div className={styles.wallet}>
                                <div>Баланс</div>
                                <span>|</span>
                                <div className={styles.moneyP}>70 UDV-coins</div>
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
                        <div className={styles.exitButton}>Выйти</div>
                    </div>
                </div>
            }
            <div className={styles.header}>
                <div>
                    <img src="/imgs/burger.svg" alt="Burger" className={styles.burger} onClick={() => setIsOpened(true)} />
                </div>
                <div>

                    <img src="/imgs/udvLogo.svg" alt="Logo" className={styles.logo} />
                </div>

            </div>

            {children}
        </div>
    );
}