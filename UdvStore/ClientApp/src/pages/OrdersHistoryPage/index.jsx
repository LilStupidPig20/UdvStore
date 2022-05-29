import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import Order from '../../components/Order';
import { AuthContext } from '../../context/AuthContext';
import styles from './ordersHistory.module.css'

export const OrdersHistoryPage = () => {
    const [ordersHistory, setOrdersHistory] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));
    const auth = useContext(AuthContext);
    useEffect(() => { 
        if(data === null ? (auth.role === 0) : (data.role === 0)) {
            fetch('https://localhost:5001/order/getClosedOrders',
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setOrdersHistory(items))
        }
    }, []);

    console.log(ordersHistory);
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.ordersWindow}>
                    <h1 className={styles.title}>История заказов</h1>
                    <div className={styles.ordersTitle}>
                        <div style={{paddingLeft:'18px'}}>Дата</div>
                        <div style={{paddingLeft:'55px'}}>ФИО</div>
                        <div style={{paddingLeft:'67px'}}>Заказ</div>
                        <div style={{paddingLeft:'35px'}}>Статус</div>
                    </div>
                    <div className={styles.orders}>
                        {ordersHistory.map((ord) => {
                            let yyyy = ord.timeOfPurchase.slice(0,4);
                            let mm = ord.timeOfPurchase.slice(5,7);
                            let dd = ord.timeOfPurchase.slice(8,10);
                            return <Order 
                                key={ord.id}
                                id={ord.id}
                                fio={ord.employeeFio}
                                products={ord.productsInOrders}
                                status={ord.status}
                                time={`${dd}.${mm}.${yyyy}`}
                                isHistory={true}
                                comment={ord.cancellationComment}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}