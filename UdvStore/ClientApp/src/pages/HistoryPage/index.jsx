import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import RequestHistory from '../../components/RequestHistory';
import styles from './history.module.css'

export const HistoryPage = () => {
    const [closedReqs, setClosedReqs] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => { 
        if(data.role === 0) {
            fetch('https://localhost:5001/coinRequest/getClosedRequests',
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setClosedReqs(items))
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                    <h1 className={styles.title}>Истории заявок</h1>
                    <div className={styles.requestsTitle}>
                        <div>ФИО сотрудника</div>
                        <div>Дата заявки</div>
                    </div>
                    <div className={styles.requests}>
                        {closedReqs.map((req) => {
                            return <RequestHistory
                                        key={req.id}
                                        fullName={req.fio}
                                        time={req.timeSend}
                                        requestId={req.id}
                                    />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}