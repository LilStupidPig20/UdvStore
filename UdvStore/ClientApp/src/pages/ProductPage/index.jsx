import React from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './card.module.css';
import StoreNavBar from "../../components/StoreNavBar";

export default function ProductPage({ products }) {
    const { productId } = useParams();
    const product = products.find(prod => prod.id === Number(productId));

    return (
        <div>
            <StoreNavBar />
            <Link to="/store">
                <div className={styles.arrow}>
                    <div></div>
                </div>
            </Link>
            <div className={styles.wrapper}>
                <div className={styles.imgs}>
                    <img src={product.image} className={styles.miniImg} width={'55px'} alt="" />
                    <img src={product.image} className={styles.miniImg} width={'55px'} alt="" />
                    <img src={product.image} className={styles.miniImg} width={'55px'} alt="" />
                    <img src={product.image} className={styles.miniImg} width={'55px'} alt="" />
                </div>
                <div>
                    <img src={product.image} width={'333px'} alt="" />
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.mainBlock}>
                        <h2>{product.name}</h2>
                        <p className={styles.price}>{product.price} UC</p>
                        <button className={styles.addButton}>В коризну</button>
                    </div>
                </div>
            </div>
        </div>
    );
}