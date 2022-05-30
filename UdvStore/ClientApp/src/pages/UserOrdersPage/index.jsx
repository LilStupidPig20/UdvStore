import React, { useState, useEffect } from "react";
import styles from "./orders.module.css";
import StoreNavBar from './../../components/StoreNavBar/index';
import OrderItem from "../../components/OrderItem";
import NavArrow from "../../components/NavArrow";

export default function UserOrdersPage() {


    const [flag, setFlag] = useState(false);

    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('userData'));
        fetch(`https://localhost:5001/order/getEmployeeHistory?idEmployee=${auth.userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            })
            .then(res => res.json())
            .then(orders => {
                setOrders(orders.reverse());
                setTimeout(() => { setFlag(true) }, 200);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <StoreNavBar />
            <NavArrow to='store' />
            {
                !flag
                    ?
                    <div className={styles.loading}>
                        Подождите загружаем заказы ...
                    </div>
                    :
                    <>
                        <div className={styles.wrapper}>
                            <h1>Мои заказы</h1>
                            <div className={styles.container}>
                                {
                                    orders.sort((a, b) => {
                                        if (a.id > b.id) return -1;
                                        if (a.id < b.id) return 1;
                                        return 0;
                                    }).map((order) => {
                                        let yyyy = order.timeOfPurchase.slice(0, 4);
                                        let mm = order.timeOfPurchase.slice(5, 7);
                                        let dd = order.timeOfPurchase.slice(8, 10);
                                        return <OrderItem
                                            key={order.id}
                                            id={order.id}
                                            products={order.productsInOrders}
                                            status={order.status}
                                            totalPrice={order.totalPrice}
                                            date={`${dd}.${mm}.${yyyy}`}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}