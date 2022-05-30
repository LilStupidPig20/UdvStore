import React from 'react';
import { Link } from 'react-router-dom';
import styles from './order.module.css'

export default function OrderAnswer({
    setActive,
    setCart,
    orderID,
    products,
    sumPrice
}) {
    let counter = 0;

    return (
        <div className={styles.popup} onClick={() => {
            setCart([]);
            setActive(false);
        }}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Оплата прошла успешно!</h1>
                <p className={styles.subTitle}>Вы можете найти и отслеживать статус вашего заказа <br />
                    в разделе <Link to="/myOrders" className={styles.link}>«Мои заказы»</Link></p>

                <div className={styles.prodHeader}>
                    <p>Номер заказа #{orderID}</p>
                    <p>Сумма заказа: {sumPrice}</p>
                </div>
                <div className={styles.products}>
                    {
                        products.map((product) => {
                            if (counter < 4) {
                                counter += 1;
                                return (
                                    <div className={styles.productItem}>
                                        <img src={product.img} width={137} height={187} alt="" />
                                        <p className={styles.prodTitle}>{product.title}</p>
                                        <p className={styles.prodCount}>Кол-во {product.count} шт.</p>
                                        <p className={styles.price}>Цена: {product.price} UC</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className={styles.ButtonContainer}>
                    <button className={styles.Button} onClick={() => {
                        setCart([]);
                        setActive(false)
                    }}>Готово</button>
                </div>
            </div>
        </div>
    );
}