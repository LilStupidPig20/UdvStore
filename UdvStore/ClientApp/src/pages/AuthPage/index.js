import React, { useContext, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import styles from './auth.module.css';
import octopus from './octopus.png';
//import { AuthContext } from '../../context/AuthContext'


export const AuthPage = () => {
    //const auth = useContext(AuthContext);
    //const [fail, setFail] = useState(false);

    return (
        <div className={styles.mainBlock}>
            <Navbar />
            <p className={styles.textBlock}>Добро пожаловать 
            в UDV-store!</p>
            <div className={styles.authBlock}>
                <h2 className={styles.authTitle}>Вход</h2>
                <div className={styles.authBox}>
                    <input
                        className={styles.loginInput}
                        placeholder='Почта'
                        name='login'
                        type='email'
                        autoComplete='off'
                    />
                </div>
                <div className={styles.authBox}>
                    <input
                        className={styles.passInput}
                        placeholder='Пароль'
                        name='password'
                        type='password'
                    />
                </div>
                <button className={styles.loginButton}>
                    Войти
                </button>
            </div>
            <div className={styles.octopusBlock}>
                <img src={octopus} alt='' width='363px' height='363px' />
            </div>
        </div>
    )
}