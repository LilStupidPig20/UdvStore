import React, { useContext } from 'react';
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import { AuthContext } from '../../context/AuthContext'
import styles from './storeNavBar.module.css';

export default function StoreNavBar() {
    const context = useContext(ButtonStatesContext);
    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    const isActive = context.isActive;
    const toggle = context.toggleActive;


    return (
        <div className={styles.navbar}>
            <div className={isActive ? styles.change : styles.container} onClick={toggle}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>

            
            {isAuthenticated && <div className={styles.navContainer}>
                <div className={styles.navItem}>
                    <img src="/imgs/cart.svg" alt="" className={styles.navImg} />
                    <span>Корзина</span>
                </div>
                <div className={styles.navItem}>
                    <img src="/imgs/bag.svg" alt="" className={styles.navImg} />
                    <span>Мои заказы</span>
                </div>
            </div>}
        </div>
    );
}