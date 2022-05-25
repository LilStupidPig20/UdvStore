import React from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './card.module.css';
import StoreNavBar from "../../components/StoreNavBar";

export default function ProductPage({ products }) {
    console.log(products);
    const { productId } = useParams();
    const product = products.find(prod => prod.id === Number(productId));

    const addToCart = () => {
        if (localStorage.getItem('cart') === null) {
            let cart = new Map();
            cart.set(String(product.id), {
                img: product.image,
                title: product.name,
                price: product.price,
                id: product.id,
                quantity: product.currentQuantity,
                count: 1
            })

            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)))
        } else {
            let cart = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));

            if (cart.get(String(product.id)) === undefined) {
                cart.set(String(product.id), {
                    img: product.image,
                    title: product.name,
                    price: product.price,
                    id: product.id,
                    quantity: product.currentQuantity,
                    count: 1
                })
            } else {
                let tmp = cart.get(String(product.id)).count;
                cart.set(String(product.id), {
                    img: product.image,
                    title: product.name,
                    price: product.price,
                    id: product.id,
                    quantity: product.currentQuantity,
                    count: tmp + 1
                })
            }

            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)))
        }
        // localStorage.clear();
    }

    return (
        <div>
            <StoreNavBar />
            <Link to="/store">
                <div className={styles.arrow}>
                    <div></div>
                </div>
            </Link>

            {products.length === 0 ?
                <div className={styles.loading}>
                    Подождите загружаем товар ...
                </div>
                :
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
                            <button className={styles.addButton} onClick={addToCart}>В корзину</button>
                        </div>
                    </div>
                </div>}
        </div>
    );
}