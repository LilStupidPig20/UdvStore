import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './adminHistory.module.css';

export default function AdminHistory({
    event,
    description,
    coins,
    eventDate,
    employees,
    timeSent
}) {
    const [isClicked, setClicked] = useState(false);
    
    return (
        <>
            {isClicked ? 
                <> 
                    <div className={styles.historyPopup} onClick={() => setClicked(false)}>
                        <div className={styles.historyContainer}>
                            <Link to='/charge/history' className={styles.close}>
                                <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>Мероприятие:</div>
                                <div className={styles.historyInfo}>{event}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>Описание:</div>
                                <div className={styles.historyInfo}>{description}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>Дата мероприятия:</div>
                                <div className={styles.historyInfo}>{eventDate}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>ФИО сотрудников:</div>
                                <div className={styles.historyInfo}>{employees.join(', ')}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>Дата заявки:</div>
                                <div className={styles.historyInfo}>{timeSent}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.historyTitle}>Количество коинов:</div>
                                <div className={styles.historyInfo}>{coins}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.history} onClick={() => {setClicked(true)}}>
                        <div>{event}</div>
                        <div style={{textAlign:'center'}}>{employees.length}</div>
                        <div style={{textAlign:'right'}}>{eventDate}</div>
                    </div>
                </>
            : 
                <>
                    <div className={styles.history} onClick={() => {setClicked(true)}}>
                        <div>{event}</div>
                        <div style={{textAlign:'center'}}>{employees.length}</div>
                        <div style={{textAlign:'right'}}>{eventDate}</div>
                    </div>
                </>
            }
        </>
    )
}