import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
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

    let status = '';
    if(request.status === 2) status = 'Отклонено' 
    else status = 'Принято';

    let yyyyEvent = String(request.eventDate).slice(0,4);
    let mmEvent = String(request.eventDate).slice(5,7);
    let ddEvent = String(request.eventDate).slice(8,10);
    let yyyy = String(request.timeSent).slice(0,4);
    let mm = String(request.timeSent).slice(5,7);
    let dd = String(request.timeSent).slice(8,10);
    console.log(request)
    return ( 
        <div className={styles.wrapper}>
            <Navbar /> 
                <div className={styles.align}>
                    <div className={styles.content}>
                        <div className={styles.requestCont}>
                            <Link to='/history' className={styles.change}>
                                <div className={styles.bar1}></div>
                                <div className={styles.bar2}></div>
                                <div className={styles.bar3}></div>
                            </Link>
                            <div className={styles.title}>Заявка на зачисление UDV-coins</div>
                            <div className={styles.gridCont}>
                                    <div className={styles.text}>ФИО сотрудника:</div>
                                    <div className={styles.requestInfo}>{ request.employeeId}</div>

                                    <div className={styles.text}>Дата отправления заявки:</div>
                                    <div className={styles.requestInfo}>{ `${dd}.${mm}.${yyyy}` }</div>

                                    <div className={styles.text}>Мероприятие:</div>
                                    <div className={styles.requestInfo}>{ request.event }</div>

                                    <div className={styles.text}>Описание активности:</div>
                                    <div className={styles.requestInfo}>{ request.description }</div>

                                    <div className={styles.text}>Дата проведения мероприятия:</div>
                                    <div className={styles.requestInfo}>{ `${ddEvent}.${mmEvent}.${yyyyEvent}` }</div>
                            
                            {request.status === 2 && 
                                <div className={styles.text} style={{marginBottom:'70px'}}>Комментарий:</div>
                            }
                            {request.status === 2 &&
                                <div className={styles.requestInfo}>{ request.rejectComment }</div>
                            }
                            
                            </div>
                            {request.status !== 2 &&
                                <div className={styles.scoreCont}>
                                    <div className={styles.text}>Баллы: { request.coinsAccrued}</div>
                                    <div className={styles.score}>UC</div>
                                </div>
                            }

                            
                            
                            <div className={styles.statusCont}>
                                { status }
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}