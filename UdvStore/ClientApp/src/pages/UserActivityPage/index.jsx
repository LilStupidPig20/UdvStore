import React, { useContext, useEffect, useState } from 'react';
import styles from './activity.module.css';
import { Navbar } from '../../components/Navbar';
import RequestHistory from '../../components/RequestHistory';
import UserActivityItem from '../../components/UserActivityItem';
import { Link } from 'react-router-dom';

export default function UserActivityPage() {
    const [history, setHistory] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        fetch(`https://localhost:5001/coins/getHistoryOfEmployee?employeeId=${data.userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            })
            .then(res => res.json())
            .then(items => setHistory(items))

    }, [])

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                    <Link to='/profile' className={styles.close}>
                        <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                    <h1 className={styles.title}>Моя активность</h1>
                    <div className={styles.requestsTitle}>
                        <div>Мероприятие</div>
                        <div>Дата</div>
                        <div>Баллы</div>
                    </div>
                    <div className={styles.requests}>
                        {history.map((req) => {
                            let yyyy = req.dateTime.slice(0,4);
                            let mm = req.dateTime.slice(5,7);
                            let dd = req.dateTime.slice(8,10);
                            return <UserActivityItem
                            title={req.name}
                            date = {`${dd}.${mm}.${yyyy}`}
                            coinsAsString = {req.coinsAsString}
                             />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}