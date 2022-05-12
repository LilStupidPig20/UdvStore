import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import styles from './fullRequest.module.css'

export default function FullRequestPage() {
    const { requestId } = useParams(); 
    const [request, setRequest] = useState({});
    const data = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => { 
        if(data.role === 0) {
            fetch(`https://localhost:5001/coinRequest/getFullRequest?idRequest=${requestId}`,
            {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then(res => res.json())
                .then(item => setRequest(item))
        }
    }, [])
    
    console.log(request)
    return ( 
        <div className={styles.wrapper}>
            <Navbar /> 
                <div className={styles.align}>
                    <div className={styles.content}>
                        <div className={styles.requestCont}>
                            <div className={styles.title}>Заявка на зачисление UDV-coins</div>
                            <div className={styles.gridCont}>
                                    <div className={styles.text}>ФИО сотрудника:</div>
                                    <div className={styles.requestInfo}>{ request.employeeId}</div>

                                    <div className={styles.text}>Дата отправления заявки:</div>
                                    <div className={styles.requestInfo}>{ String(request.eventDate).slice(0,10) }</div>

                                    <div className={styles.text}>Мероприятие:</div>
                                    <div className={styles.requestInfo}>{ request.event }</div>

                                    <div className={styles.text}>Описание активности:</div>
                                    <div className={styles.requestInfo}>{ request.description }</div>

                                    <div className={styles.text}>Дата проведения мероприятия:</div>
                                    <div className={styles.requestInfo}>{ String(request.timeSent).slice(0,10)}</div>
                            </div>
                            
                            <div className={styles.scoreCont}>
                                <div className={styles.text}>Баллы: { request.coinsAccrued}</div>
                                <div className={styles.score}>UC</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}