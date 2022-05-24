import React, { useState } from "react";
import styles from "./orders.module.css";
import StoreNavBar from './../../components/StoreNavBar/index';
import OrderItem from "../../components/OrderItem";

export default function UserOrdersPage() {

    const [orders, setOrders] = useState([
        {
            id: 321,
            products: [{
                id: 1,
                name: "Кружка",
                price: 15,
                count: 1,
                img: "/imgs/ProductImages/Кружка.JPG"
            },
            {
                id: 2,
                name: "Шапка",
                price: 18,
                count: 4,
                img: "/imgs/ProductImages/Шапка.JPG"
            }],
            status: 'В обработке'
        },
        {
            id: 123,
            products: [{
                id: 1,
                name: "Кружка",
                price: 15,
                count: 2,
                img: "/imgs/ProductImages/Кружка.JPG"
            },
            {
                id: 2,
                name: "Ежедневник",
                price: 15,
                count: 2,
                img: "/imgs/ProductImages/Ежедневник.JPG"
            }],
            status: 'Готов к получению'
        }
    ]);

    const cancelOrder = (id) => {
        console.log(`Этот мудак хочет отменить заказ ${id}!!!`)
    };

    return (
        <>
            <StoreNavBar />
            <div className={styles.wrapper}>
                <h1>Мои заказы</h1>
                <div className={styles.container}>
                    {
                        orders.map((order) => {
                            return <OrderItem
                                id={order.id}
                                products={order.products}
                                status={order.status}
                                CancelOrder={cancelOrder}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}