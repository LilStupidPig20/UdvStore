import React, {useContext} from "react";
import styles from './profile.module.css'
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage({fullName = "Ольга Сергеевна Шульц Папа", coinsAmount = 70}) {
    const spltName = fullName.split(' ');

    const context = useContext(AuthContext);


    return (
        <div className={styles.wrapper}>
            <img src="/imgs/backgroundUdv.jpg" alt="" className={styles.bgImage} />
            <h1 className={styles.title}>Мой профиль</h1>
            <div className={styles.container}>
                <img src="/imgs/profileImg-example.jpg" alt="Profile" className={styles.profileImg} />
                <div>
                    <h2 className={styles.subTitle}>UDV-баланс:</h2>
                    <div className={styles.balance}>
                        <span className={styles.money}>{coinsAmount}</span> UDV-coins
                    </div>
                </div>
                <h1 className={styles.userName}>{spltName[0]}<br />{spltName[1]}<br />{spltName[2]}</h1>
                <div className={styles.buttons}>
                    <button className={styles.button}>Заявка на зачисление UDV-coins </button>
                    <button className={styles.button}>История начисления UDV-coins</button>
                    <button className={styles.button}>Отправить UDV-coins сотруднику</button>
                </div>
            </div>
        </div>
    );
}