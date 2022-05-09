import React from 'react';
import { Navbar } from '../../components/Navbar';
import RequestHistory from '../../components/RequestHistory';
import styles from './history.module.css'

export const HistoryPage = ({requests=[]}) => {

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
                        {requests.map((request) => {
                            if(!request.employeeRequest.isOpen) {
                                return <RequestHistory
                                            key={request.employeeRequest.id}
                                            fullName={request.fio}
                                            time={request.employeeRequest.time}
                                            event={request.employeeRequest.event}
                                            requestId={request.employeeRequest.id}
                                            description={request.employeeRequest.description}
                                            employeeId={request.employeeRequest.employeeId}
                                            isOpen={request.employeeRequest.isOpen}
                                        />
                            } return '';
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}