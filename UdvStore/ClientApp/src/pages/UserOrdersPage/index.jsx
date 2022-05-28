import React, { useState, useEffect, useContext } from "react";
import styles from "./orders.module.css";
import StoreNavBar from './../../components/StoreNavBar/index';
import OrderItem from "../../components/OrderItem";
import { AuthContext } from "../../context/AuthContext";

export default function UserOrdersPage() {
    const context = useContext(AuthContext);

    const [flag, setFlag] = useState(false);

    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        fetch(`https://localhost:5001/order/getEmployeeHistory?idEmployee=${context.userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${context.token}`
                }
            })
            .then(res => res.json())
            .then(orders => {
                setOrders(orders);
            })
            .catch(error => console.log(error))
    }, []);

    const cancelOrder = (id) => {
        console.log(`Этот мудак хочет отменить заказ ${id}!!!`)
    };

    return (
        <>
            {
                orders.length !== 0
                    ?
                    <>
                        <StoreNavBar />
                        <div className={styles.wrapper}>
                            <h1>Мои заказы</h1>
                            <div className={styles.container}>
                                {
                                    orders.map((order) => {
                                        return <OrderItem
                                            id={order.id}
                                            products={order.productsInOrders}
                                            status={order.status}
                                            CancelOrder={cancelOrder}
                                            totalPrice={order.totalPrice}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </>
                    :
                    <p>Загружаем заказы...</p>
            }
        </>
    );
}