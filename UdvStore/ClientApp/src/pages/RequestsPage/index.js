import React from 'react';
import { Navbar } from '../../components/Navbar';
import styles from './requests.module.css';

export const RequestsPage = () => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                
                </div>
            </div>
            
        </div>

    )
    
}