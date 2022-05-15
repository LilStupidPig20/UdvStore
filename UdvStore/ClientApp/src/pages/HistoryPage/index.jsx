import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import RequestHistory from '../../components/RequestHistory';
import { AuthContext } from '../../context/AuthContext';
import styles from './history.module.css'

export const HistoryPage = () => {
    const [closedReqs, setClosedReqs] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));
    const auth = useContext(AuthContext);
    useEffect(() => { 
        if(data === null ? (auth.role === 0) : (data.role === 0)) {
            fetch('https://localhost:5001/coinRequest/getClosedRequests',
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setClosedReqs(items))
                .catch(error => auth.logout())
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
                            let yyyy = req.timeSend.slice(0,4);
                            let mm = req.timeSend.slice(5,7);
                            let dd = req.timeSend.slice(8,10);
                            return <RequestHistory
                                        key={req.id}
                                        fullName={req.fio}
                                        time={`${dd}.${mm}.${yyyy}`}
                                        requestId={req.id}
                                    />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}