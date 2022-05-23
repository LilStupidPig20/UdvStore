import React from 'react';
import styles from './cartItem.module.css'
import { useState, useEffect } from 'react';

export default function CartItem({
    img,
    title,
    price,
    count,
    id,
    onMinus, onPlus, onGarbage
}) {
    let [countIn, setCountIn] = useState(0);

    useEffect(() => {
        setCountIn(count);
    }, [count])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={img} alt="Product" width={137} height={187} />
                <div className={styles.subBlock}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.countBlock}>
                        <div className={styles.countButton} onClick={() => {
                            if (countIn > 1) {
                                setCountIn(countIn - 1)
                                onMinus(id, price)
                            }
                        }}>
                            <img src="/imgs/minus-button.svg" alt="Minus" />
                        </div>
                        <p>{countIn}</p>
                        <div className={styles.countButton} onClick={() => {
                            setCountIn(countIn + 1)
                            onPlus(id, price)
                        }}>
                            <img src="/imgs/plus-button.svg" alt="Plus" />
                        </div>
                    </div>
                    <span className={styles.price}>{price * countIn} UC</span>

                </div>
            </div>
            <div className={styles.garbage} onClick={() => {
                onGarbage(id);
            }}>
                <img src="/imgs/bin.svg" alt="Garbage" />
            </div>
        </div>
    );
}