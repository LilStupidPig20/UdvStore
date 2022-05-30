import React, {useState, useContext, useEffect} from 'react';
import styles from './transfer.module.css';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { SendFormChecker } from '../../context/SendFormChecker';

export default function TransferResultPage() {
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
                                <h1 className={styles.title}>Баллы отправлены!</h1>
                                <div className={styles.text}>Ваш коллега будет рад пополнению счета :)</div>
                                <Link to='/profile' className={styles.link}><button className={styles.button} onClick={context.toggleSent(false)}>Готово</button></Link>
                            </div>
                        </div>
                        :
                        <div className={styles.align}>
                            <div className={styles.content_false}>
                                <h1 className={styles.title_false}>Баллы не отправлены!</h1>
                                <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                                <Link to='/transfer' className={styles.link}><button className={styles.button} onClick={context.toggleSent(false)}>Заполнить</button></Link>
                            </div>
                        </div>
                    :
                    null
            }
        </div>
    )
}