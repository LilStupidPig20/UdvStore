import React from "react";
import styles from "./product.module.css";
import { Link } from "react-router-dom";

export default function AdminProductItem({
    imgSrc,
    title,
    price,
    id,
    quantity
}) {

    return (
        <>
            {
                quantity > 0
                    ?
                    <Link to={`/store`} style={{ textDecoration: 'none' }}>
                        <div className={styles.product}>
                            <img src={imgSrc} alt="" className={styles.productImg} />
                            <div className={styles.title}>{title}</div>
                            <div className={styles.price}>Цена: {price} UC</div>
                            <div className={styles.price}>На складе: {quantity} шт.</div>
                        </div>
                    </Link>
                    :
                    <Link to={`/store`} style={{ textDecoration: 'none' }}>
                        <div className={`${styles.deactivated} ${styles.product}`}>
                            <img src={imgSrc} alt="" className={styles.productImg} />
                            <div className={styles.title}>{title}</div>
                            <div className={styles.price}>Цена: {price} UC</div>
                            <div className={styles.price}>Нет в наличии</div>
                        </div>
                    </Link>
            }
        </>
    );
}