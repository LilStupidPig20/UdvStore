import React, { useContext, useState, useEffect } from 'react';
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import { AuthContext } from '../../context/AuthContext'
import styles from './storeNavBar.module.css';
import { Link } from 'react-router-dom';

export default function StoreNavBar() {
    const buttonContext = useContext(ButtonStatesContext);
    const auth = useContext(AuthContext);
    const isActive = buttonContext.isActive;
    const toggle = buttonContext.toggleActive;
    const [cartAmount, SetCartAmount] = useState(-1);

    useEffect(() => {
        let amount = new Map(Object.entries(JSON.parse(localStorage.getItem('cart')))).size;

        SetCartAmount(amount);
    }, [new Map(Object.entries(JSON.parse(localStorage.getItem('cart')))).size])

    return (
        <div className={styles.navbar}>
            <div className={isActive ? styles.change : styles.container} onClick={toggle}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>


            {auth.isAuthenticated && auth.role !== 0 && <div className={styles.navContainer}>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <div className={styles.navItem}>
                        <img src="/imgs/cart.svg" alt="" className={styles.navImg} />
                        <span>Корзина</span>
                        {
                            cartAmount > 0
                                ?
                                <div className={styles.cartAmount}>{cartAmount}</div>
                                :
                                null
                        }
                    </div>
                </Link>

                <Link to="/myOrders" style={{ textDecoration: 'none' }}>
                    <div className={styles.navItem}>
                        <img src="/imgs/bag.svg" alt="" className={styles.navImg} />
                        <span>Мои заказы</span>
                    </div>
                </Link>
            </div>}
        </div>
    );
}