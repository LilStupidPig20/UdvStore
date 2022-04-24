import React, { useContext, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import styles from './auth.module.css';
import octopus from './octopus.png';
import { AuthContext } from '../../context/AuthContext';


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [fail, setFail] = useState(false);
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({login: '', password: ''});

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async () => {
        try {
          const data = await request("/Login/Authentication", "POST", { ...form });
            auth.login(data.token, data.userId, data.fio);
        } catch (error) {
          setFail(true);
        }
    };

    let failText = fail ? styles.errorMsgShow : styles.errorMsgHide;
    let failLogin = fail ? styles.loginInputFail : styles.loginInput;
    let failPassword = fail ? styles.passInputFail : styles.passInput;

    return (
        <div className={styles.mainBlock}>
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
                        autoComplete='on'
                        autoFocus
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.authBox}>
                    <input
                        className={styles.passInput}
                        placeholder='Пароль'
                        name='password'
                        type='password'
                        onChange={changeHandler}
                    />
                </div>
                <button className={styles.loginButton} onClick={loginHandler} disabled={loading}>
                    Войти
                </button>
            </div>
            <div className={styles.octopusBlock}>
                <img src={octopus} alt='' width='363px' height='363px' />
            </div>
        </div>
    )
}