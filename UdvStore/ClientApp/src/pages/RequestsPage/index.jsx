import React, { useContext, useEffect, useState } from 'react';
import RequestLayout from '../../components/layouts/RequestLayout';
import { Navbar } from '../../components/Navbar';
import Request from '../../components/Request';
import { AuthContext } from '../../context/AuthContext';
import styles from './requests.module.css';

export default function RequestsPage () {
    const [newReqs, setNewReqs] = useState([]); 
    const auth = useContext(AuthContext);
    const data = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => { 
        if(data === null ? (auth.role === 0) : (data.role === 0)) {
            fetch('https://localhost:5001/coinRequest/getOpenRequests', 
            {
                headers: { 
                    'Authorization': `Bearer ${data === null ? auth.token : data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setNewReqs(items))
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.requestsWindow}>
                    <h1 className={styles.title}>Заявки на зачисление UDV-coins</h1>
                    <div className={styles.requestsTitle}>
                        <div>ФИО сотрудника</div>
                        <div>Дата заявки</div>
                    </div>
                    <div className={styles.requests}>
                        {newReqs.map((req) => {
                            let yyyy = req.request.timeSent.slice(0,4);
                            let mm = req.request.timeSent.slice(5,7);
                            let dd = req.request.timeSent.slice(8,10);
                            let yyyyEvent = req.request.eventDate.slice(0,4);
                            let mmEvent = req.request.eventDate.slice(5,7);
                            let ddEvent = req.request.eventDate.slice(8,10);
                            return <Request
                                        fullName={req.fio}
                                        time={`${dd}.${mm}.${yyyy}`}
                                        event={req.request.event}
                                        requestId={req.request.id}
                                        description={req.request.description}
                                        employeeId={req.request.employeeId}
                                        timeEvent={`${ddEvent}.${mmEvent}.${yyyyEvent}`}
                                        key={req.request.id}
                                    />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}