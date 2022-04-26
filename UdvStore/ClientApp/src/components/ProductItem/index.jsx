import React from "react";
import styles from "./product.module.css"

export default function ProductItem({
    imgSrc = "/imgs/ProductImages/Кружка.JPG",
    title = "Кружка UDV с надписью “Удиви мир”",
    price = 15
}) {

    return (
        <div className={styles.product}>
            <img src={imgSrc} alt="" className={styles.productImg} />
            <div className={styles.title}>{title}</div>
            <div className={styles.price}>Цена: {price} UC</div>
            <button className={styles.addButton}>В корзину</button>
        </div>
    );
}