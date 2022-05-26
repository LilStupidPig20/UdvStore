import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './card.module.css';
import StoreNavBar from "../../components/StoreNavBar";

export default function ProductPage() {
    const [flag, setFlag] = useState(false);
    const [buttonFlag, setButtonFlag] = useState("");
    const [inCart, SetInCart] = useState(false);
    const [alert, SetAlert] = useState(false);

    const { productId } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`https://localhost:5001/store/getFullInfo?idProduct=${productId}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product);
                setTimeout(() => { setFlag(true) }, 200);
            })
    }, []);

    const addToCart = () => {
        if (localStorage.getItem('cart') === null) {
            let cart = new Map();

            if (!product.commonInfo.isClothes) {
                productNotClothes(product, cart);
            } else {
                productIsClothes(product, cart);
            }

            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)));
        } else {
            let cart = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));

            if (cart.get(String(product.commonInfo.id)) === undefined) {
                if (!product.commonInfo.isClothes) {
                    productNotClothes(product, cart);
                } else {
                    productIsClothes(product, cart);
                }
            } else {
                let tmp = cart.get(String(product.commonInfo.id)).count;
                if (!product.commonInfo.isClothes) {
                    productNotClothes(product, cart, tmp);
                } else {
                    productIsClothes(product, cart, tmp);
                }
            }

            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)));
        }

        SetInCart(true);
    }

    const productNotClothes = (product, cart, count = 0) => {
        cart.set(String(product.commonInfo.id), {
            img: product.commonInfo.image,
            title: product.commonInfo.name,
            price: product.commonInfo.price,
            id: product.commonInfo.id,
            quantity: product.commonInfo.currentQuantity,
            size: null,
            count: count + 1
        });
    };

    const productIsClothes = (product, cart, count = 0) => {
        let size = product.sizes.find((size) => size.size === buttonFlag);
        cart.set(String(product.commonInfo.id), {
            img: product.commonInfo.image,
            title: product.commonInfo.name,
            price: product.commonInfo.price,
            id: product.commonInfo.id,
            quantity: size.quantity,
            size: size.size,
            count: count + 1
        });
    };

    const changeSize = (size, e) => {
        setButtonFlag(size);
        let buttons = document.getElementsByName('sizeButton');

        buttons.forEach((prod) => {
            prod.style.color = "black";
            prod.style.backgroundColor = "white";
            prod.style.fontWeight = "400";
        })
        e.style.color = "white";
        e.style.backgroundColor = "black";
        e.style.fontWeight = "700";
    }

    return (
        <div>
            <StoreNavBar />
            <Link to="/store">
                <div className={styles.arrow}>
                    <div></div>
                </div>
            </Link>

            {!flag ?
                <div className={styles.loading}>
                    Подождите загружаем товар ...
                </div>
                :
                <div className={styles.wrapper}>
                    <div>
                        <img src={product.commonInfo.image} width={'333px'} alt="" />
                    </div>
                    <div className={styles.productInfo}>
                        <div className={styles.mainBlock}>
                            <h2>{product.commonInfo.name}</h2>
                            <p className={styles.price}>{product.commonInfo.price} UC</p>
                            {
                                product.commonInfo.isClothes
                                    ?
                                    <div>
                                        <h3>Размер</h3>
                                        <div className={styles.buttonsBlock}>
                                            {
                                                product.sizes.map((el) => {
                                                    if (el.quantity > 0) {
                                                        return (<button name="sizeButton" className={styles.sizeButton} onClick={(e) => changeSize(el.size, e.target)}>{el.size}</button>);
                                                    }
                                                    else {
                                                        return (<button className={styles.disButton} disabled>{el.size}</button>);
                                                    }
                                                })
                                            }
                                        </div>

                                    </div>
                                    :
                                    null
                            }
                            <button className={styles.addButton} onClick={() => {
                                if (!product.commonInfo.isClothes || buttonFlag !== "") {
                                    addToCart();
                                } else {
                                    SetAlert(true);
                                }
                            }}>
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                inCart
                    ?
                    <div className={styles.popup} onClick={() => SetInCart(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>Товар успешно добавлен в корзину!</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => SetInCart(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                alert
                    ?
                    <div className={styles.popup} onClick={() => SetAlert(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>Пожалуйста, выберите размер!</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => SetAlert(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}