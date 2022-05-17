import React from 'react';
import styles from './cartItem.module.css'
import { useState } from 'react';

export default function CartItem({
    img,
    title,
    price,
    count,
    id,
    onMinus, onPlus, onGarbage
}) {
    let [countIn, setCountIn] = useState(count);
    let [isDeleted, setIsDeleted] = useState(false);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={img} alt="Product" width={137} height={187} />
                <div className={styles.subBlock}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.countBlock}>
                        <div className={styles.countButton} onClick={() => {
                            if (countIn > 1) {
                                onMinus(id, price)
                                setCountIn(countIn - 1)
                            }
                        }}>
                            <img src="/imgs/minus-button.svg" alt="Minus" />
                        </div>
                        <p>{countIn}</p>
                        <div className={styles.countButton} onClick={() => {
                            onPlus(id, price)
                            setCountIn(countIn + 1)
                        }}>
                            <img src="/imgs/plus-button.svg" alt="Plus" />
                        </div>
                    </div>
                    <span className={styles.price}>{price * countIn} UC</span>

                </div>
            </div>
            <div className={styles.garbage} onClick={() => {
                onGarbage(id)
                setIsDeleted(true)
            }}>
                <img src="/imgs/bin.svg" alt="Garbage" />
            </div>
        </div>
    );
}