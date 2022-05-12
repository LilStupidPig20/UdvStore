import React, { useContext, useEffect, useState } from 'react';
import RequestLayout from '../../components/layouts/RequestLayout';
import { Navbar } from '../../components/Navbar';
import { Request } from '../../components/Request';
import { AuthContext } from '../../context/AuthContext';
import styles from './requests.module.css';

export default function RequestsPage () {
    const [newReqs, setNewReqs] = useState([]); 
    const auth = useContext(AuthContext);
    const data = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => { 
        if(data.role === 0) {
            fetch('https://localhost:5001/coinRequest/getOpenRequests', 
            {
                headers: { 
                    'Authorization': `Bearer ${data === null ? auth.token :data.token}`
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
                            return <RequestLayout
                                    event={req.request.event}
                                    requestId={req.request.id}
                                    description={req.request.description}
                                    employeeId={req.request.employeeId}
                                    time={req.request.eventDate}
                                    key={req.request.id}
                                >
                                    <Request
                                        
                                        fullName={req.fio}
                                        time={(req.request.timeSent).slice(0,-16)}
                                    />
                            </RequestLayout>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}