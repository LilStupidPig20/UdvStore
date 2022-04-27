import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { SendFormChecker } from '../../context/SendFormChecker';
import styles from './ResultSendForm.module.css'

export const ResultSendFormPage = () => {
    const result = useContext(SendFormChecker).isSent;
    
    return ( 
        <div className={styles.wrapper}>
            <Navbar /> 
            {result === true && 
                <div className={styles.align}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Заявка отправлена!</h1>
                        <div className={styles.text}>Спасибо, что заполнили заявку. Администратор рассмотрит ее в течение 3 дней. А пока загляните в UDVтельный магазин :)</div>
                        <Link to='/profile' className={styles.link}><button className={styles.button}>Готово</button></Link>
                    </div>
                </div>
            }
            {result === false &&
                <div className={styles.align}>
                    <div className={styles.content_false}>
                        <h1 className={styles.title_false}>Заявка не отправлена!</h1>
                        <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                        <Link to='/sendForm' className={styles.link}><button className={styles.button}>Заполнить</button></Link>
                    </div>
                </div>
            }
        </div>
    )
}