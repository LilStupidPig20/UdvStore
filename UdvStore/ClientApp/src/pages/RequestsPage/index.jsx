import React from 'react';
import RequestLayout from '../../components/layouts/RequestLayout';
import { Navbar } from '../../components/Navbar';
import { Request } from '../../components/Request';
import styles from './requests.module.css';

export default function RequestsPage ({requests=[]}) {

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
                        {requests.map((request) => {
                            if(request.employeeRequest.isOpen) {
                                return <RequestLayout
                                        event={request.employeeRequest.event}
                                        requestId={request.employeeRequest.id}
                                        description={request.employeeRequest.description}
                                        employeeId={request.employeeRequest.employeeId}
                                        isOpen={request.employeeRequest.isOpen}
                                        time={request.employeeRequest.time}
                                    >
                                        <Request
                                            fullName={request.fio}
                                            time={request.employeeRequest.time}
                                        />
                                </RequestLayout>
                            }
                            return '';
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}