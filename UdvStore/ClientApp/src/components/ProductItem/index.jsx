import React from "react";
import styles from "./product.module.css";
import { Link } from "react-router-dom";

export default function ProductItem({
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
                    <Link to={`/store/${id}`} style={{ textDecoration: 'none' }}>
                        <div className={styles.product}>
                            <img src={imgSrc} alt="" className={styles.productImg} />
                            <div className={styles.title}>{title}</div>
                            <div className={styles.price}>Цена: {price} UC</div>
                            {/* <button className={styles.addButton} onClick={addToCart}>В корзину</button> */}
                        </div>
                    </Link>
                    :
                    <Link to={`/store`} style={{ textDecoration: 'none' }}>
                        <div className={`${styles.deactivated} ${styles.product}`}>
                            <img src={imgSrc} alt="" className={styles.productImg} />
                            <div className={styles.title}>{title}</div>
                            <div className={styles.price}>Нет в наличии</div>
                            {/* <button className={styles.addButton} onClick={addToCart}>В корзину</button> */}
                        </div>
                    </Link>
            }
        </>
    );
}