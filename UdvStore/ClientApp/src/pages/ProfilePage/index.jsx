import React, { useContext } from "react";
import styles from './profile.module.css'
import { AuthContext } from "../../context/AuthContext";
import { CoinsContext } from "../../context/CoinsContext";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    let fullName = useContext(AuthContext).fullName;
    let coinsAmount = useContext(CoinsContext).coinsAmount;

    return (
        <div className={styles.bg}>
            <Navbar />
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Мой профиль</h1>
            <div className={styles.container}>
                <img src="/imgs/profileImg-example.jpg" alt="Profile" className={styles.profileImg} />
                <div>
                    <h2 className={styles.subTitle}>UDV-баланс:</h2>
                    <div className={styles.balance}>
                        <span className={styles.money}>{coinsAmount}</span> UDV-coins
                    </div>
                </div>
                <h1 className={styles.userName}>{fullName}</h1>
                {/* <h1 className={styles.userName}>{spltName[0]}<br />{spltName[1]}<br />{spltName[2]}</h1> */}
                <div className={styles.buttons}>
                    <button className={styles.button}><Link to="/sendForm" className={styles.link}>Получить UDV-coins</Link></button>
                    <button className={styles.button}>История начисления UDV-coins</button>
                    <button className={styles.button}>Отправить UDV-coins сотруднику</button>
                </div>
            </div>
        </div>

        </div>
    );
}