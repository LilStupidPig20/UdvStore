import React, { useState, useEffect } from "react";
import styles from "./orders.module.css";
import StoreNavBar from './../../components/StoreNavBar/index';
import OrderItem from "../../components/OrderItem";
import NavArrow from "../../components/NavArrow";

export default function UserOrdersPage() {


    const [flag, setFlag] = useState(false);

    const [orders, setOrders] = useState([]);

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
                                    orders.map((order) => {
                                        return <OrderItem
                                            key={order.id}
                                            id={order.id}
                                            products={order.productsInOrders}
                                            status={order.status}
                                            totalPrice={order.totalPrice}
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