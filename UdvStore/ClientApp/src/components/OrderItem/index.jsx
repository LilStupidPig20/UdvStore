import React, { useState } from 'react';
import styles from './order.module.css';

export default function OrderItem({
    id = 895664,
    products = [{
        id: 1,
        name: "Кружка",
        price: 15,
        img: "/imgs/ProductImages/Кружка.JPG"
    },
    {
        id: 1,
        name: "Кружка",
        price: 15,
        img: "/imgs/ProductImages/Кружка.JPG"
    },
    {
        id: 1,
        name: "Кружка",
        price: 15,
        img: "/imgs/ProductImages/Кружка.JPG"
    },
    {
        id: 1,
        name: "Кружка",
        price: 15,
        img: "/imgs/ProductImages/Кружка.JPG"
    },
    {
        id: 1,
        name: "Кружка",
        price: 15,
        img: "/imgs/ProductImages/Кружка.JPG"
    }],
    status = 'Отменен'
}) {
    let [isCancelable, setIsCancelable] = useState(() => {
        if (status === 'В обработке' || status === 'Принят') {
            return true;
        } else {
            return false;
        }
    });
    let counter = 0;

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
                            <p className={styles.cancelButton}>Отменить заказ</p>
                            :
                            null
                    }
                </div>
            </div>
        </>
    );
}