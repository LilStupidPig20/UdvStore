import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import AdminHistory from '../AdminHistory';
import styles from './chargeHistory.module.css';

export default function ChargeHistory() {
    const [history, setHistory] = useState([]);
    const data = JSON.parse(localStorage.getItem('userData'));
    const auth = useContext(AuthContext);
    useEffect(() => { 
        if(data === null ? (auth.role === 0) : (data.role === 0)) {
            fetch('https://localhost:5001/adminAccrual/getAllAccrualsWithFio',
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(items => setHistory(items))
        }
    }, []);

    return(
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>
                <div className={styles.historiesWindow}>
                    <h1 className={styles.title}>История начислений</h1>
                    <div className={styles.historiesTitle}>
                        <div>Мероприятие</div>
                        <div style={{textAlign:'center'}}>Количество человек</div>
                        <div style={{textAlign:'right'}}>Дата мероприятия</div>
                    </div>
                    <div className={styles.histories}>
                        {history.map((his) => {
                            let yyyy = his.timeSent.slice(0,4);
                            let mm = his.timeSent.slice(5,7);
                            let dd = his.timeSent.slice(8,10);
                            let yyyyEvent = his.timeSent.slice(0,4);
                            let mmEvent = his.timeSent.slice(5,7);
                            let ddEvent = his.timeSent.slice(8,10);
                            return <AdminHistory 
                                event={his.nameOfEvent}
                                description={his.description}
                                coins={his.coins}
                                eventDate={`${ddEvent}.${mmEvent}.${yyyyEvent}`}
                                employees={his.employeeNames}
                                timeSent={`${dd}.${mm}.${yyyy}`}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}