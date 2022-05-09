import React from 'react'
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import styles from './fullRequest.module.css'

export default function FullRequestPage({ requests=[] }) {
    const { requestId } = useParams();
    const request = requests.find(req => req.employeeRequest.id === Number(requestId));
    const data = JSON.parse(sessionStorage.getItem('requestData'));
    if (requests.length !== 0) {
        sessionStorage.setItem('requestData', JSON.stringify({
            request: request
        }))
    }
    
    return ( 
        <div className={styles.wrapper}>
            <Navbar /> 
                <div className={styles.align}>
                    <div className={styles.content}>
                        <div className={styles.requestCont}>
                            <div className={styles.title}>Заявка на зачисление UDV-coins</div>
                            <div className={styles.gridCont}>
                                    <div className={styles.text}>ФИО сотрудника:</div>
                                    <div className={styles.requestInfo}>{ requests.length === 0 ? data.request.fio : request.fio}</div>

                                    <div className={styles.text}>Мероприятие:</div>
                                    <div className={styles.requestInfo}>{ requests.length === 0 ? data.request.employeeRequest.event : request.employeeRequest.event }</div>

                                    <div className={styles.text}>Описание активности:</div>
                                    <div className={styles.requestInfo}>{ requests.length === 0 ? data.request.employeeRequest.description : request.employeeRequest.description }</div>

                                    <div className={styles.text}>Дата проведения мероприятия:</div>
                                    <div className={styles.requestInfo}>{requests.length === 0 ? (data.request.employeeRequest.time).slice(0,-9) : (request.employeeRequest.time).slice(0,-9)}</div>
                            </div>
                            
                            <div className={styles.scoreCont}>
                                <div className={styles.text}>Баллы: </div>
                                <div className={styles.score}>UC</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}