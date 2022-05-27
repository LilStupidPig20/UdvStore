import React from 'react'
import { Navbar } from '../../components/Navbar'
import styles from './ordersHistory.module.css'

export const OrdersHistoryPage = () => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                    <h1 className={styles.title}>История заказов</h1>
                    <div className={styles.requestsTitle}>
                        <div>Дата заказа</div>
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