import React, { useContext, useState } from 'react';
import styles from './sendForm.module.css';
import { Navbar } from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const SendFormPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({eventEntered: '', description: '', time: '', employeeId: auth.userId});
    const [isSent, setSent] = useState();
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
            await fetch(`/coinRequest/sendToAdmin?eventEntered=${form.eventEntered}&description=${form.description}&employeeId=${auth.userId}&time=${form.time}`, options)
            .then(response => {
                if(response.status === 200) setSent(true)
                else setSent(false);
            })
            .catch(error => {
                console.log(error);
                setSent(false);
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <Navbar /> 
            {isSent === true && 
                <div className={styles.popup}>
                    <div className={styles.align}>
                        <div className={styles.content_true}>
                            <h1 className={styles.title_true}>Заявка отправлена!</h1>
                            <div className={styles.text_true}>Спасибо, что заполнили заявку. Администратор рассмотрит ее в течение 3 дней. А пока загляните в UDVтельный магазин :)</div>
                            <Link to='/profile' className={styles.link}><button className={styles.button}>Готово</button></Link>
                        </div>
                    </div>
                </div>
            }
            {isSent === false &&
                <div className={styles.popup}>
                    <div className={styles.align}>
                        <div className={styles.content_false}>
                            <h1 className={styles.title_false}>Заявка не отправлена!</h1>
                            <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                            <Link to='/sendForm' className={styles.link}><button className={styles.button} onClick={() => setSent()}>Заполнить</button></Link>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.align}>
                <div className={styles.content}>
                    <Link to='/profile' className={styles.close}>
                        <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
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
                    <button 
                        className={styles.sendButton}
                        type='submit'
                        onClick={()=>{ sendRequest() }}
                    >Отправить</button>
                </div>
            </div>
        </div>
    )
}