import React from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css'

export default function OrderAnswer({
    active,
    setActive,
    orderID = 123
}) {
    return (
        <div className={styles.popup} onClick={() => setActive(false)}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Оплата прошла успешно!</h1>
                <p className={styles.subTitle}>Можете отслеживать статус вашего заказа в разделе <Link to="/myOrders" className={styles.link}>Мои заказы</Link></p>
                <p>Номер заказа {orderID}</p>

                <button className={styles.Button} onClick={() => setActive(false)}>Готово</button>
            </div>
        </div>
    );
}