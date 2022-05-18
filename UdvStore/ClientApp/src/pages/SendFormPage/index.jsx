import React, { useContext, useState } from 'react';
import styles from './sendForm.module.css';
import { Navbar } from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { SendFormChecker } from '../../context/SendFormChecker';
import { Link } from 'react-router-dom';

export const SendFormPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({eventEntered: '', description: '', time: '', employeeId: auth.userId});
    const toggleSent = useContext(SendFormChecker).toggleSent;

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const sendRequest = async () => {
        if(auth.role === 1) {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(form)
            };
            fetch(`/coinRequest/sendToAdmin?eventEntered=${form.eventEntered}&description=${form.description}&employeeId=${auth.userId}&time=${form.time}`, options)
            .then(response => {
                if(response.ok) toggleSent(true);
            })
            .catch(error => {
                console.log(error);
                toggleSent(false);
            })
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
                        <label htmlFor='eventEntered' className={styles.eventTitle}>Мероприятие:</label>
                        <input 
                            className={styles.eventInput} 
                            id="eventEntered" 
                            name='eventEntered'
                            required
                            autoFocus
                            autoComplete='off'
                            placeholder='Текст...'
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.areaCont}>
                        <label htmlFor='description' className={styles.areaTitle}>Подробно опишите свою активность:</label>
                        <textarea 
                            className={styles.infoArea} 
                            id="description" 
                            name='description'
                            autoComplete='off'
                            required
                            placeholder='Текст...'
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.dateCont}>
                        <label htmlFor='time' className={styles.inputDateTitle}>Дата проведения:</label>
                        <input 
                            className={styles.inputDate}
                            type='date' 
                            id='time' 
                            name='time'
                            max={new Date().toISOString().substring(0, 10)}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    

                    <Link to="/result" className={styles.link}><button 
                        className={styles.sendButton}
                        type='submit'
                        onClick={()=>{ sendRequest() }}
                    >Отправить</button></Link>
                </div>
            </div>
        </div>
    )
}