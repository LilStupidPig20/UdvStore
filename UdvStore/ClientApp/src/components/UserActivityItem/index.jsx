import React, { useState } from 'react';
import styles from './activity.module.css';

export default function UserActivityItem({
    title,
    date,
    coinsAsString,
    comment
}) {
    const [flag, setFlag] = useState(false);
    const predicator = coinsAsString.slice(0, 1);

    if (predicator === '+' || predicator === '-') {
        coinsAsString = coinsAsString.slice(2);
    }

    return (
        <div onClick={() => setFlag(!flag)}>
            <div className={`${styles.container} ${comment !== null && styles.pointer}`}>
                <div className={styles.columns}>
                    <div className={styles.titleItem}>{title}</div>
                    <div className={styles.dateItem}>{date}</div>
                    {
                        coinsAsString !== 'В ожидании'
                            ?
                            predicator === '+'
                                ?
                                <div className={`${styles.coinsItem} ${styles.green}`}>{coinsAsString}</div>
                                :
                                <div className={`${styles.coinsItem} ${styles.red}`}>{coinsAsString}</div>
                            :
                            <div className={`${styles.coinsItem} ${styles.grey}`}>{coinsAsString}</div>
                    }
                </div>
                {
                    flag && comment !== null
                        ?
                        <div>
                            <p className={styles.comment}>Коментарий: <br />{comment}</p>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
}