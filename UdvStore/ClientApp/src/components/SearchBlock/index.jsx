import React from 'react';
import styles from './search.module.css';

export default function SearchBlock({ searchValue, setSearchValue }) {

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    return (
            <input className={styles.searchItem} type="text" value={searchValue} placeholder="Поиск по UDV-товарам" onChange={onChangeSearchInput} />
    );
}