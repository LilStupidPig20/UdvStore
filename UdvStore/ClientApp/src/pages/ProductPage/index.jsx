import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './card.module.css';
import { CoinsContext } from "../../context/CoinsContext";
import { AuthContext } from './../../context/AuthContext';
import StoreNavBar from "../../components/StoreNavBar";
import NavArrow from './../../components/NavArrow/index';
import OrderAnswer from './../../components/OrderAnswer/index';

export default function ProductPage() {
    const [buttonFlag, setButtonFlag] = useState("");
    const [flag, setFlag] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [alert, setAlert] = useState(false);
    const [bought, setBought] = useState(false);
    const [noneCoins, setNoneCoins] = useState(false);
    const [orderId, setOrderId] = useState(-1);

    const userCoins = useContext(CoinsContext).coinsAmount;
    const auth = useContext(AuthContext);

    const { productId } = useParams();
    const [product, setProduct] = useState();

    console.log(product);

    useEffect(() => {
        fetch(`https://localhost:5001/store/getFullInfo?idProduct=${productId}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product);
                setTimeout(() => { setFlag(true) }, 200);
            })
    }, []);

    const addToCart = () => {
        let cart = new Map();
        if (localStorage.getItem('cart') === null) {
            addProductToCart(product, cart);
        } else {
            cart = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));

            if (cart.get(String(product.commonInfo.id)) === undefined) {
                addProductToCart(product, cart);
            } else {
                let tmp = cart.get(String(product.commonInfo.id)).count;
                addProductToCart(product, cart, tmp);
            }

        }
        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)));

        setInCart(true);
    }

    const addProductToCart = (product, cart, count = 0) => {
        let currentSize = product.sizes.find((size) => size.size === buttonFlag);
        cart.set(String(product.commonInfo.id), {
            img: product.commonInfo.image,
            title: product.commonInfo.name,
            price: product.commonInfo.price,
            id: product.commonInfo.id,
            quantity: product.commonInfo.isClothes ? currentSize.quantity : product.commonInfo.currentQuantity,
            size: product.commonInfo.isClothes ? currentSize.size : null,
            count: count + 1
        });
    }

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

    const buyNow = () => {
        const body = {
            EmployeeId: auth.userId,
            products: [{
                Id: product.commonInfo.id,
                Count: 1,
                Size: buttonFlag
            }] 
        }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify(body)
        };
        fetch(`https://localhost:5001/order/createNewOrder`, options)
            .then(response => {
                if (response.ok) {
                    setBought(true);
                    response.json()
                        .then(res => setOrderId(res));
                } else {
                    console.log("Статус запроса " + response.status);
                }
            })
            .catch(e => console.log(e))

    }

    return (
        <div>
            <StoreNavBar />
            <NavArrow to='store' />

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
                            <h2>{product.commonInfo.description}</h2>
                            <p className={styles.price}>{product.commonInfo.price} UC</p>
                            {
                                product.commonInfo.isClothes
                                    ?
                                    <div>
                                        <h3>Размер</h3>
                                        <div className={styles.buttonsBlock}>
                                            {
                                                product.sizes
                                                    .sort((a, b) => {
                                                        if (a.id > b.id) return 1;
                                                        if (a.id < b.id) return -1;
                                                        return 0;
                                                    })
                                                    .map((el) => {
                                                        if (el.quantity > 0) {
                                                            return (<button key={el.id} name="sizeButton" className={styles.sizeButton} onClick={(e) => changeSize(el.size, e.target)}>{el.size}</button>);
                                                        }
                                                        else {
                                                            return (<button key={el.id} className={styles.disButton} disabled>{el.size}</button>);
                                                        }
                                                    })
                                            }
                                        </div>

                                    </div>
                                    :
                                    null
                            }
                            <div className={styles.actionButtons}>
                                <button className={styles.addButton} onClick={() => {
                                    if (!product.commonInfo.isClothes || buttonFlag !== "") {
                                        addToCart();
                                    } else {
                                        setAlert(true);
                                    }
                                }}>
                                    В корзину
                                </button>

                                <button className={styles.buyButton} onClick={() => {
                                    if ((!product.commonInfo.isClothes || buttonFlag !== "") && userCoins >= product.commonInfo.price) {
                                        buyNow();
                                    } else if (buttonFlag === "") {
                                        setAlert(true);
                                    } else {
                                        setNoneCoins(true);
                                    }
                                }}>
                                    Купить сейчас
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                inCart
                    ?
                    <div className={styles.popup} onClick={() => setInCart(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>Товар успешно добавлен в корзину!</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setInCart(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                alert
                    ?
                    <div className={styles.popup} onClick={() => setAlert(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>Пожалуйста, выберите размер!</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setAlert(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                bought
                    ?
                    <OrderAnswer
                        setActive={setBought}
                        setCart={() => { return null }}
                        products={[{
                            img: product.commonInfo.image,
                            title: product.commonInfo.name,
                            count: 1,
                            price: product.commonInfo.price
                        }]}
                        orderID={orderId}
                        sumPrice={product.commonInfo.price}
                    />
                    :
                    null
            }
            {
                noneCoins
                    ?
                    <div className={styles.popup} onClick={() => setNoneCoins(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>У тебя не хватает UC :{'('}</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setNoneCoins(false)}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}

{/* <div className={styles.popup} onClick={() => setInCart(false)}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.title}>Оплата прошла успешно!</h1>
                            <p className={styles.subTitle}>Вы можете найти и отслеживать статус вашего заказа <br />
                                в разделе <Link to="/myOrders" className={styles.link}>«Мои заказы»</Link></p>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => setInCart(false)}>Готово</button>
                            </div>
                        </div>
                    </div> */}