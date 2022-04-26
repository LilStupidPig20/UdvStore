import React, { useContext } from "react";
import styles from "./store.module.css"
import ProductItem from "../../components/ProductItem";
import StoreNavBar from "../../components/StoreNavBar";
import { AuthContext } from "../../context/AuthContext";

export default function StorePage() {
    console.log(useContext(AuthContext).role);

    return (
        <div>
            <StoreNavBar />
            <div className={styles.wrapper}>
                <input type="text" placeholder="Поиск по UDV-товарам" className={styles.inputBlock} />
                <div className={styles.products}>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>

        </div>
    );
}