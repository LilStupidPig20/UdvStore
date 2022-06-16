import React, { useState } from 'react';
import styles from './storeAdmin.module.css';
import AdminProductItem from '../../components/AdminProductItem';
import StoreNavBar from '../../components/StoreNavBar';
import SearchBlock from "../../components/SearchBlock";

export default function StoreAdminPage({ products = [] }) {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div>
            <StoreNavBar />
            <div className={styles.wrapper}>
                <SearchBlock
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <div className={styles.products}>
                    {products
                        .filter(item => new RegExp(searchValue, 'i').test(item.name))
                        .map((product) => {
                            return <AdminProductItem
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