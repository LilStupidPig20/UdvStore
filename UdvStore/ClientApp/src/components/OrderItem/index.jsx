import React, { useState, useEffect } from 'react';
import styles from './order.module.css';

export default function OrderItem({
    id,
    products,
    status,
    CancelOrder
}) {
    const [isCancelable, setIsCancelable] = useState(() => {
        if (status === 'В обработке' || status === 'Принят') {
            return true;
        } else {
            return false;
        }
    });
    const [summary, setSummary] = useState(0);
    const [cancelFlag, setCancelFlag] = useState(false);
    let counter = 0;

    useEffect(() => {
        products.map((product) => {
            setSummary(prev => prev + product.price * product.count)
        });
    }, []);

    return (
        <>
            <div className={styles.topLine}></div>
            <h2>Нормер заказа {id}</h2>
            <div className={styles.wrapper}>
                {
                    products.map((product) => {
                        if (counter < 4) {
                            counter += 1;
                            return (
                                <div className={styles.productItem}>
                                    <img src={product.img} width={137} height={187} alt="" />
                                    <p className={styles.title}>{product.name}</p>
                                    <p className={styles.price}>Цена: {product.price} UC</p>
                                </div>
                            )
                        }
                    })
                }
                <div className={styles.statusBlock}>
                    <p className={styles.status}>{status}</p>
                    {
                        isCancelable
                            ?
                            <p className={styles.cancelButton} onClick={() => {
                                setCancelFlag(true);
                            }}>Отменить заказ</p>
                            :
                            null
                    }
                </div>
            </div>

            {
                cancelFlag
                    ?
                    <div className={styles.popup} onClick={() => setCancelFlag(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1>Отмена заказа</h1>
                            <h2>Номер заказа {id}</h2>
                            <div style={{ display: 'flex' }}>
                                {
                                    products.map(product => {
                                        return (
                                            <div className={styles.productItem}>
                                                <img src={product.img} width={137} height={187} alt="" />
                                                <p className={styles.title}>{product.name}</p>
                                                <p className={styles.price}>Цена: {product.price * product.count} UC</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <h2>Итого {summary}</h2>
                            <p>Вы действительно хотите отменить заказ?</p>
                            <div>
                                <textarea className={styles.cancelInput} placeholder='Укажите причину отмены...' />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setCancelFlag(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }

        </>
    );
}