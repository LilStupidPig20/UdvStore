import React from 'react';
import styles from './activity.module.css';

export default function UserActivityItem({
    title,
    date,
    coinsAsString
}) {
    const predicator = coinsAsString.slice(0, 1);

    if(predicator === '+' || predicator === '-'){
        coinsAsString = coinsAsString.slice(2);
    }
    
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleItem}>{title}</div>
                <div className={styles.dateItem}>{date}</div>
                {
                    predicator === '+'
                        ?
                        <div className={`${styles.coinsItem} ${styles.green}`}>{coinsAsString}</div>
                        :
                        <div className={`${styles.coinsItem} ${styles.red}`}>{coinsAsString}</div>
                }
            </div>
            <div className={styles.topLine}></div>
        </div>
    );
}