import React from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css'

export default function OrderAnswer({
    setActive
}) {
    return (
        <div className={styles.popup} onClick={() => setActive(false)}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Оплата прошла успешно!</h1>
                <p className={styles.subTitle}>Вы можете найти и отслеживать статус вашего заказа <br />
                    в разделе <Link to="/myOrders" className={styles.link}>«Мои заказы»</Link></p>

                <div className={styles.ButtonContainer}>
                    <button className={styles.Button} onClick={() => setActive(false)}>Готово</button>
                </div>
            </div>
        </div>
    );
}