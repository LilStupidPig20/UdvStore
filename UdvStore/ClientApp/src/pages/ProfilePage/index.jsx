import React, { useContext } from "react";
import styles from './profile.module.css'
import { AuthContext } from "../../context/AuthContext";
import { CoinsContext } from "../../context/CoinsContext";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import store from './logo_store.svg';
import send_coins from './logo_send_coins.svg';
import activity from './logo_activity.svg';
import get_coins from './logo_get_coins.svg';

export default function ProfilePage() {
    const auth = useContext(AuthContext);
    let coinsAmount = useContext(CoinsContext).coinsAmount;
    console.log(auth);
    const fio = String(auth.fullName).split(' ');

    return (
        <div className={styles.bg}>
            <Navbar />
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Мой профиль</h1>
            <div className={styles.container}>
                <img src="/imgs/profileImg-example.jpg" alt="Profile" className={styles.profileImg} />
                <div className={styles.userInfo}>
                    <div style={{height:'80%'}}>
                        <div className={styles.fullName}>{fio[1]} {fio[2]} <br /> {fio[0]}</div>
                        <div className={styles.position}>{auth.position}</div>
                    </div>
                    <div className={styles.balance}>UDV-баланс: <span className={styles.coins}>{coinsAmount} UC</span></div>
                </div>
            </div>
            <div className={styles.buttonsCont}>
                <Link to='/store' className={styles.link}>
                    <div className={styles.greenBack}><img className={styles.image} src={store}/></div>
                    <span className={styles.imageText}>UDV-store</span>
                </Link>
                <Link to='/' className={styles.link}>
                    <div className={styles.greenBack}><img className={styles.image} src={activity} /></div>
                    <span className={styles.imageText}>Моя активность</span>
                </Link>
                <Link to='/sendForm' className={styles.link}>
                    <div className={styles.greenBack}><img className={styles.image} src={get_coins} /></div>
                    <span className={styles.imageText}>Получить UDV-coins</span>
                </Link>
                <Link to='/' className={styles.link}>
                    <div className={styles.greenBack}><img className={styles.image} src={send_coins} /></div>
                    <span className={styles.imageText}>Отправить UDV-coins</span>
                </Link>
            </div>
            
        </div>

        </div>
    );
}