import React from "react";
import styles from "./store.module.css"
import ProductItem from "../../components/ProductItem";
import StoreNavBar from "../../components/StoreNavBar";

export default function StorePage({ products = [] }) {
    console.log(products);

    return (
        <div>
            <StoreNavBar />
            <div className={styles.wrapper}>
                <input type="text" placeholder="Поиск по UDV-товарам" className={styles.inputBlock} />
                <div className={styles.products}>
                    {products.map((product) => {
                        return <ProductItem
                            key={product.id}
                            title={product.name}
                            price={product.price}
                            imgSrc={product.image}
                            id={product.id}
                            quantity={product.currentQuantity} />
                    })}
                </div>
            </div>
        </div>
    );
}