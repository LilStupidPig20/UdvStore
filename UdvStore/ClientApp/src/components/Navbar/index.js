import React, { useContext, useState } from 'react';
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import { Logo } from '../Logo';
import styles from './navbar.module.css';

export const Navbar = () => {
    const context = useContext(ButtonStatesContext);
    const isActive = context.isActive;
    const toggle = context.toggleActive;
    
    return (
        <div className={styles.navbar}>
            <div className={isActive ? styles.change : styles.container} onClick={toggle}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div className={styles.logo_container}>
                <Logo/>
            </div>
        </div>
    )
}