import React from 'react';
import ProductItem from '../../components/ProductItem';
import StoreNavBar from '../../components/StoreNavBar';
import styles from './storeAdmin.module.css';

export default function StoreAdminPage({ products = [] }) {
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
                            id={product.id} />
                    })}
                </div>
            </div>
        </div>
    );
}