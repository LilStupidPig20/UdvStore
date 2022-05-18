import React from 'react'
import { Navbar } from '../../components/Navbar'
import styles from './orders.module.css'

export const OrdersPage = () => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                    <h1 className={styles.title}>Заказы сотрудников</h1>
                    <div className={styles.requestsTitle}>
                        <div>ФИО</div>
                        <div>Заказ</div>
                        <div>Статус</div>
                    </div>
                    <div className={styles.orders}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}