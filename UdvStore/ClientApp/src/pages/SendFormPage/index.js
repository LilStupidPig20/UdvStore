import React, { useContext, useState } from 'react';
import styles from './sendForm.module.css';
import { Navbar } from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { SendFormChecker } from '../../context/SendFormChecker';
import { Link } from 'react-router-dom';

export const SendFormPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({event: '', info: '', date: '', id: auth.userId});
    const toggleSent = useContext(SendFormChecker).toggleSent;
    
    console.log(useContext(SendFormChecker).isSent)

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const sendRequest = async () => {
        try {
            await request('adasdasdas', 'POST', {...form});
            toggleSent(true);
        } catch (error) {
            console.log(error);
            toggleSent(true);
        }
    }

    return (
        <div className={styles.wrapper}>
            <Navbar /> 
            <div className={styles.align}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Форма</h1>
                    <h2 className={styles.subTitle}>для заявки на зачисление UDV-coins</h2>
                    <div className={styles.eventCont}>
                        <label htmlFor='event' className={styles.eventTitle}>Мероприятие:</label>
                        <input 
                            className={styles.eventInput} 
                            id="event" 
                            name='event'
                            required
                            autoFocus
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.areaCont}>
                        <label htmlFor='info' className={styles.areaTitle}>Подробно опишите свою активность:</label>
                        <textarea 
                            className={styles.infoArea} 
                            id="info" 
                            name='info'
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.dateCont}>
                        <label htmlFor='date' className={styles.inputDateTitle}>Дата проведения:</label>
                        <input 
                            className={styles.inputDate}
                            type='date' 
                            id='date' 
                            name='date'
                            max={new Date().toISOString().substring(0, 10)}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    {/* <div className={styles.fioCont}>
                        <label htmlFor='lastName' className={styles.inputTextTitle}>Фамилия:</label>
                        <input 
                            type='text' 
                            id='lastName' 
                            className={styles.inputText}
                        />
                    </div>
                    <div className={styles.fioCont}>
                        <label htmlFor='firstName' className={styles.inputTextTitle}>Имя:</label>
                        <input 
                            type='text' 
                            id='firstName' 
                            className={styles.inputText}
                        />
                    </div>
                    <div className={styles.fioCont}>
                        <label htmlFor='midName' className={styles.inputTextTitle}>Отчество:</label>
                        <input 
                            type='text' 
                            id='midName' 
                            className={styles.inputText}
                        />
                    </div> */}
                    <Link to="/result" className={styles.link}><button 
                        className={styles.sendButton}
                        type='submit'
                        onClick={()=>{ sendRequest()}}
                    >Отправить</button></Link>
                </div>
            </div>
        </div>
    )
}