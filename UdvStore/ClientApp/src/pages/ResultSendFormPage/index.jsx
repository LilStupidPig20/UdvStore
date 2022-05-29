import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { SendFormChecker } from '../../context/SendFormChecker';
import styles from './ResultSendForm.module.css'

export const ResultSendFormPage = () => {
    const context = useContext(SendFormChecker);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setTimeout(setFlag(true), 10000);
    }, [])

    return (
        <div className={styles.wrapper}>
            <Navbar />
            {
                flag
                    ?
                    context.isSent
                        ?
                        <div className={styles.align}>
                            <div className={styles.content}>
                                <h1 className={styles.title}>Заявка отправлена!</h1>
                                <div className={styles.text}>Спасибо, что заполнили заявку. Администратор рассмотрит ее в течение 3 дней. А пока загляните в UDVтельный магазин :)</div>
                                <Link to='/profile' className={styles.link}><button className={styles.button} onClick={context.toggleSent(false)}>Готово</button></Link>
                            </div>
                        </div>
                        :
                        <div className={styles.align}>
                            <div className={styles.content_false}>
                                <h1 className={styles.title_false}>Заявка не отправлена!</h1>
                                <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                                <Link to='/sendForm' className={styles.link}><button className={styles.button} onClick={context.toggleSent(false)}>Заполнить</button></Link>
                            </div>
                        </div>
                    :
                    null
            }
            {/* {context.isSent === true && 
                <div className={styles.align}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Заявка отправлена!</h1>
                        <div className={styles.text}>Спасибо, что заполнили заявку. Администратор рассмотрит ее в течение 3 дней. А пока загляните в UDVтельный магазин :)</div>
                        <Link to='/profile' className={styles.link}><button className={styles.button}>Готово</button></Link>
                    </div>
                </div>
            }
            {context.isSent === false &&
                <div className={styles.align}>
                    <div className={styles.content_false}>
                        <h1 className={styles.title_false}>Заявка не отправлена!</h1>
                        <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                        <Link to='/sendForm' className={styles.link}><button className={styles.button}>Заполнить</button></Link>
                    </div>
                </div>
            } */}
        </div>
    )
}