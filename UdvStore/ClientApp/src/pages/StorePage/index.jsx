import React, { useEffect, useState } from "react";
import styles from "./store.module.css"
import ProductItem from "../../components/ProductItem";
import StoreNavBar from "../../components/StoreNavBar";
import { AuthContext } from "../../context/AuthContext";

export default function StorePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5001/store/getAll')
            .then(res => res.json())
            .then(items => setProducts(items))
    }, []);

    return (
        <div>
            <StoreNavBar />
            <div className={styles.wrapper}>
                <input type="text" placeholder="Поиск по UDV-товарам" className={styles.inputBlock} />
                <div className={styles.products}>
                    {products.map((product) => {
                        return <ProductItem
                            key={product.id}
                            title={product.description}
                            price={product.price}
                            imgSrc={product.image} />
                    })}
                    {/* <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem /> */}
                </div>
            </div>

        </div>
    );
}