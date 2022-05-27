import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import styles from './fullRequest.module.css'

export default function FullRequestPage() {
    const { requestId } = useParams(); 
    const [request, setRequest] = useState({});
    const data = JSON.parse(localStorage.getItem('userData'));
    let isEmpty = Object.keys(request).length !== 0;
    let open;

    useEffect(() => { 
        if(data.role === 0) {
            fetch(`https://localhost:5001/coinRequest/getFullRequest?idRequest=${requestId}`,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${data.token}` }
            })
            .then(res => res.json())
            .then(items => setRequest(items))
        }
    }, [])

    let status = '';
    
    if (isEmpty) {
        open = true;
        if(request.closedEmployeeRequest.status === 2) status = 'Отклонено' 
        else status = 'Принято';

        var yyyyEvent = String(request.closedEmployeeRequest.eventDate).slice(0,4);
        var mmEvent = String(request.closedEmployeeRequest.eventDate).slice(5,7);
        var ddEvent = String(request.closedEmployeeRequest.eventDate).slice(8,10);
        var yyyy = String(request.closedEmployeeRequest.timeSent).slice(0,4);
        var mm = String(request.closedEmployeeRequest.timeSent).slice(5,7);
        var dd = String(request.closedEmployeeRequest.timeSent).slice(8,10);
    }
    

    
    return ( 
        <div className={styles.wrapper}>
            <Navbar /> 
                <div className={styles.align}>
                    <div className={styles.content}>
                        {open &&
                            <div className={styles.requestCont}>
                                <Link to='/requests/history' className={styles.change}>
                                <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                </Link>
                                <div className={styles.title}>Заявка на зачисление UDV-coins</div>
                                
                                <div className={styles.gridCont}>
                                        <div className={styles.text}>ФИО сотрудника:</div>
                                        <div className={styles.requestInfo}>{ request.fio }</div>

                                        <div className={styles.text}>Дата отправления заявки:</div>
                                        <div className={styles.requestInfo}>{ `${dd}.${mm}.${yyyy}` }</div>

                                        <div className={styles.text}>Мероприятие:</div>
                                        <div className={styles.requestInfo}>{ request.closedEmployeeRequest.event }</div>

                                        <div className={styles.text}>Описание активности:</div>
                                        <div className={styles.requestInfo}>{ request.closedEmployeeRequest.description }</div>

                                        <div className={styles.text}>Дата проведения мероприятия:</div>
                                        <div className={styles.requestInfo}>{ `${ddEvent}.${mmEvent}.${yyyyEvent}` }</div>

                                        <div className={styles.text}>Статус заявки:</div>
                                        <div className={styles.requestInfo}>{ status }</div>
                                
                                {request.closedEmployeeRequest.status === 2 && 
                                    <div className={styles.text} style={{marginBottom:'70px'}}>Причина отклонения:</div>
                                }
                                {request.closedEmployeeRequest.status === 2 &&
                                    <div className={styles.requestInfo}>{ request.closedEmployeeRequest.rejectComment }</div>
                                }
                                {request.closedEmployeeRequest.status !== 2 &&
                                        <div className={styles.text}>Баллы: </div>
                                }
                                {request.closedEmployeeRequest.status !== 2 &&
                                        <div className={styles.requestInfo}>{ request.closedEmployeeRequest.coinsAccrued } UC</div>
                                }
                                </div>
                                
                            </div>
                        }
                    </div>
                </div>
        </div>
    )
}