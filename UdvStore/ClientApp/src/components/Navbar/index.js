import React, { useState } from 'react';
import { Logo } from '../Logo';
import styles from './navbar.module.css';

export const Navbar = () => {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    }

    return (
        <div className={styles.navbar}>
            <div className={isActive ? styles.change : styles.container} onClick={toggleClass}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div className={styles.logo_container}>
                <Logo />
            </div>
        </div>
        
    )
}