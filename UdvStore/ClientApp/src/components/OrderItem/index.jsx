import React, { useState, useEffect } from 'react';
import styles from './order.module.css';

export default function OrderItem({
    id,
    products,
    status,
    totalPrice
}) {
    const [isCancelable, setIsCancelable] = useState(() => {
        if (status === 'Open' || status === 'Accepted') {
            return true;
        } else {
            return false;
        }
    });
    const [summary, setSummary] = useState(0);
    const [cancellationComment, setCancellationComment] = useState('');
    const [cancelFlag, setCancelFlag] = useState(false);
    const [alertFlag, setAlertFlag] = useState(false);
    const [statusText, setStatusText] = useState('');

    let counter = 0;

    const setStates = (status) => {
        if (status === 'Open') {
            return 'В обработке';
        }
        if (status === 'Cancelled') {
            return 'Отменен';
        }
        if (status === 'Accepted') {
            return 'Принят';
        }
        if (status === 'ReadyToReceive') {
            return 'Готов к получению';
        }
        if (status === 'Received') {
            return 'Получен';
        }
    };

    useEffect(() => {
        setSummary(totalPrice);

        setStatusText(setStates(status));
    }, []);

    const cancelOrder = (orderId, cancellationComment) => {
        if (cancellationComment !== '') {
            const auth = JSON.parse(localStorage.getItem('userData'));
            const body = {
                cancellationComment: cancellationComment
            };
            fetch(`https://localhost:5001/order/cancelOrderByEmployee?idOrder=${orderId}`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res.status)
                    setCancelFlag(false);
                    setAlertFlag(true);
                    setCancellationComment('');
                    setStatusText('Отменен');
                    setIsCancelable(false);
                })
                .catch(error => console.log(error))

        }
    };

    const onChangeMessageInput = (e) => {
        setCancellationComment(e.target.value);
    }

    return (
        <>
            <div className={styles.topLine}></div>
            <div className={styles.headerBlock}>
                <h2>Номер заказа #{id}</h2>
                <h2>Сумма заказа: {summary} UC</h2>
            </div>
            <div className={styles.wrapper}>
                {
                    products.map((product) => {
                        if (counter < 4) {
                            counter += 1;
                            return (
                                <div className={styles.productItem} key={product.productId}>
                                    <img src={product.imageLink} width={137} height={187} alt="" />
                                    <p className={styles.title}>{product.productName}</p>
                                    <p className={styles.price}>Цена: {product.productPrice * product.countOrdered} UC</p>
                                </div>
                            )
                        }
                    })
                }
                <div className={styles.statusBlock}>
                    <p className={styles.status}>{statusText}</p>
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
                    <div className={styles.popup} onClick={() => {
                        setCancelFlag(false);
                        setCancellationComment('');
                    }}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1>Отмена заказа</h1>
                            <h2>Номер заказа #{id}</h2>
                            <div style={{ display: 'flex' }}>
                                {
                                    products.map(product => {
                                        return (
                                            <div className={styles.productItem} key={product.productId}>
                                                <img src={product.imageLink} width={137} height={187} alt="" />
                                                <p className={styles.title}>{product.productName}</p>
                                                <p className={styles.price}>Цена: {product.productPrice * product.countOrdered} UC</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <h2>Сумма заказа: {summary} UC</h2>
                            <p>Вы действительно хотите отменить заказ?</p>
                            <div>
                                <textarea
                                    className={styles.cancelInput}
                                    placeholder='Укажите причину отмены...'
                                    value={cancellationComment}
                                    onChange={onChangeMessageInput} />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => cancelOrder(id, cancellationComment)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                alertFlag
                    ?
                    <div className={styles.popup} onClick={() => {
                        setAlertFlag(false);
                    }}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1>Заказ отменен</h1>
                            <h3>Информация отправлена администратору. <br />
                                UCoins будут начислены обратно на ваш счет <br />
                                в течкении нескольких дней.</h3>
                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setAlertFlag(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}