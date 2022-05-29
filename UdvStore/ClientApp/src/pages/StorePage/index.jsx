import React, { useState } from "react";
import styles from "./store.module.css"
import ProductItem from "../../components/ProductItem";
import StoreNavBar from "../../components/StoreNavBar";
import SearchBlock from "../../components/SearchBlock";

export default function StorePage({ products = [] }) {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div>
            <StoreNavBar />
            <div className={styles.logo}>UDV-store</div>
            <div className={styles.wrapper}>
                <SearchBlock
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <div className={styles.products}>
                    {products
                        .filter(item => new RegExp(searchValue, 'i').test(item.name))
                        .map((product) => {
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