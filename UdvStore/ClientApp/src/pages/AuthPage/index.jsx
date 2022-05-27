import React, { useContext, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import styles from './auth.module.css';
import octopus from './octopus.png';
import { AuthContext } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import logo from '../../components/Logo/udv_logo.svg'


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [fail, setFail] = useState(false);
    const { loading, request } = useHttp();
    const [form, setForm] = useState({login: '', password: ''});

    const pressEnter = (event) => {
        if(event.keyCode === 13) document.getElementById('auth').click()
    }

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async () => {
        try {
            const data = await request("/login/authenticate", "POST", { ...form });
            auth.login(data.token, data.userId, data.fio, data.role, data.position);
        } catch (error) {
            setFail(true);
        }
    };

    let failText = fail ? styles.errorMsgShow : styles.errorMsgHide;
    let failLogin = fail ? styles.loginInputFail : styles.loginInput;
    let failPassword = fail ? styles.passInputFail : styles.passInput;

    return (
        <div className={styles.mainBlock}>
            <Navbar />
            
            <div className={styles.authBlock}>
                <div className={styles.textBlock}>
                    <img src={logo} className={styles.logo} width="258px" height="100px"/>
                    <div className={styles.titleText}>-store</div>
                </div> 
                <h2 className={styles.authTitle}>Вход</h2>
                <div className={styles.authBox}>
                    <input
                        className={failLogin}
                        placeholder='Почта'
                        name='login'
                        type='email'
                        autoFocus
                        onChange={changeHandler}
                        onKeyUp={pressEnter}
                    />
                </div>
                <div className={styles.authBox}>
                    <input
                        className={failPassword}
                        placeholder='Пароль'
                        name='password'
                        type='password'
                        onChange={changeHandler}
                        onKeyUp={pressEnter}
                    />
                </div>
                <div className={failText}>Неверный логин или пароль. Повторите попытку</div>
                <button 
                    id='auth'
                    className={styles.loginButton} 
                    onClick={loginHandler} 
                    disabled={loading}
                >
                    Войти
                </button>
                
            </div>
            <div className={styles.octopusBlock}>
                <img src={octopus} alt='' width='363px' height='363px' />
            </div>
        </div>
    )
}