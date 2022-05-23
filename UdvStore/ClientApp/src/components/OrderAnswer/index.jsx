import React from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css'

export default function OrderAnswer({
    active,
    setActive,
    orderID = 123,
    orderItem
}) {
    return (
        <div className={styles.popup} onClick={() => setActive(false)}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Оплата прошла успешно!</h1>
                <p className={styles.subTitle}>Можете отслеживать статус вашего заказа в разделе <Link to="/myOrders" className={styles.link}>Мои заказы</Link></p>
                <p>Номер заказа {orderID}</p>
                <div style={{ display: 'flex' }}>
                    {
                        orderItem.map(product => {
                            return (
                                <div className={styles.productItem}>
                                    <img src={product.img} width={137} height={187} alt="" />
                                    <p className={styles.prodTitle}>{product.title}</p>
                                    <p className={styles.price}>Цена: {product.price * product.count} UC</p>
                                </div>
                            )
                        })
                    }
                </div>

                <button className={styles.Button} onClick={() => setActive(false)}>Готово</button>
            </div>
        </div>
    );
}