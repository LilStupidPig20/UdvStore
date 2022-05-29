import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import Order from '../../components/Order';
import { AuthContext } from '../../context/AuthContext';
import styles from './orders.module.css'

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));
    const auth = useContext(AuthContext);
    let count = -1;
    let selId = `statuses${count}`;
    useEffect(() => { 
        if(data === null ? (auth.role === 0) : (data.role === 0)) {
            fetch('https://localhost:5001/order/getOrdersInWork',
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setOrders(items))
        }
    }, []);
    console.log(orders);

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.ordersWindow}>
                    <h1 className={styles.title}>Заказы сотрудников</h1>
                    <div className={styles.ordersTitle}>
                        <div style={{paddingLeft:'18px'}}>Дата</div>
                        <div style={{paddingLeft:'55px'}}>ФИО</div>
                        <div style={{paddingLeft:'67px'}}>Заказ</div>
                        <div style={{paddingLeft:'35px'}}>Статус</div>
                    </div>
                    <div className={styles.orders}>
                        {orders.map((ord) => {
                            let yyyy = ord.timeOfPurchase.slice(0,4);
                            let mm = ord.timeOfPurchase.slice(5,7);
                            let dd = ord.timeOfPurchase.slice(8,10);
                            count += 1;
                            selId = `statuses${count}`;
                            return <Order 
                                key={ord.id}
                                id={ord.id}
                                fio={ord.employeeFio}
                                products={ord.productsInOrders}
                                status={ord.status}
                                time={`${dd}.${mm}.${yyyy}`}
                                selId={selId} 
                                isHistory={false}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}