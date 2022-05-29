import React, { useState, useEffect, useContext } from 'react';
import styles from './cart.module.css'
import { Link } from 'react-router-dom';
import { CoinsContext } from './../../context/CoinsContext';
import { AuthContext } from '../../context/AuthContext';
import StoreNavBar from '../../components/StoreNavBar';
import CartItem from '../../components/CartItem';
import OrderAnswer from '../../components/OrderAnswer';
import NavArrow from './../../components/NavArrow/index';

export default function CartPage() {
    let userCoins = useContext(CoinsContext).coinsAmount;
    const auth = useContext(AuthContext);

    let [prodCount, setProdCount] = useState(0);
    let [sumPrice, setSumPrice] = useState(0);
    let [cart, setCart] = useState([]);
    let [ordered, setOrdered] = useState(false);
    let [alert, setAlert] = useState(false);
    let [orderID, setOrderID] = useState(-1);

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            const products = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));
            products.forEach((product) => {
                setCart(prev => [...prev, {
                    img: product.img,
                    title: product.title,
                    price: product.price,
                    id: product.id,
                    quantity: product.quantity,
                    size: product.size,
                    count: product.count
                }])

                setProdCount(prev => prev + product.count);
                setSumPrice(prev => prev + product.price * product.count);
            })
        }
    }, [])

    const decrementCount = (id, price) => {
        const products = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));
        products.get(String(id)).count--;

        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(products)));

        setProdCount(prev => prev - 1);
        setSumPrice(prev => prev - price);
    };

    const incrementCount = (id, price) => {
        const products = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));
        products.get(String(id)).count++;

        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(products)));

        setProdCount(prev => prev + 1);
        setSumPrice(prev => prev + price);
    };

    const deleteProductFromCart = (id) => {
        const products = new Map(Object.entries(JSON.parse(localStorage.getItem('cart'))));
        products.delete(String(id));
        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(products)));

        let product = cart.find(product => product.id === id);
        setCart(prev => prev.filter(product => product.id !== id));
        setProdCount(prev => prev - product.count);
        setSumPrice(prev => prev - product.price * product.count);
    };

    const createOrder = () => {
        if (userCoins >= sumPrice) {
            const body = {
                EmployeeId: auth.userId,
                products: cart.map((product) => {
                    return {
                        Id: product.id,
                        Count: product.count,
                        Size: product.size
                    }
                })
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
                        setOrdered(true);
                        response.json()
                            .then(res => setOrderID(res));
                        localStorage.removeItem('cart');
                    } else {
                        console.log("Статус запроса " + response.status);
                    }
                })
                .catch(e => console.log(e))
        } else {
            setAlert(true);
        }
    };

    return (
        <div>
            <StoreNavBar />
            <NavArrow to='store'/>
            {
                cart.length === 0
                    ?
                    <div className={styles.emptyCart}>
                        <div className={styles.title}>В корзине пока ничего нет</div>
                        <p className={styles.subTitle}>Перейдите в <Link to='/store' className={styles.link}>магазин</Link>, чтобы купить мерч</p>
                    </div>
                    :
                    <div className={styles.wrapper}>
                        <div className={styles.cartItems}>
                            <div className={styles.header}>
                                <span className={styles.headerTitle}>Ваша корзина</span>
                                <span className={styles.counter}>всего: {prodCount}</span>
                            </div>
                            <div>
                                {cart.map((product) => {
                                    return <CartItem
                                        img={product.img}
                                        title={product.title}
                                        price={product.price}
                                        id={product.id}
                                        count={product.count}
                                        quantity={product.quantity}
                                        size={product.size}
                                        onMinus={decrementCount}
                                        onPlus={incrementCount}
                                        onGarbage={deleteProductFromCart} />
                                })}
                            </div>
                        </div>
                        <div className={styles.summaryBlock}>
                            <div>
                                <div className={styles.header}>
                                    <span className={styles.headerTitle}>Итого</span>
                                    <span className={styles.sumCoins}>{sumPrice} UC</span>
                                </div>
                                <p className={styles.counter}>Товары, {prodCount} шт.</p>
                            </div>

                            <div className={styles.bottomBlock}>
                                <div className={styles.balance}>Ваш баланс: {userCoins} UC</div>
                                <button className={styles.addButton} onClick={createOrder}>Оплатить</button>
                            </div>
                        </div>
                    </div>
            }
            {
                ordered
                    ?
                    <OrderAnswer setActive={setOrdered} setCart={setCart} orderID={orderID} products={cart} />
                    :
                    null
            }
            {
                alert
                    ?
                    <div className={styles.popup} onClick={() => { setAlert(false); }}>
                        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                            <h1 className={styles.popupTitle}>У тебя не хватает UC :{'('}</h1>

                            <div className={styles.buttonContainer}>
                                <button className={styles.popupButton} onClick={() => { setAlert(false); }}>Готово</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}