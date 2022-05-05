import React from 'react'
import { Link } from 'react-router-dom';
import styles from './reqHistory.module.css'

export default function RequestHistory({ fullName, requestId, event, description, time, employeeId, isOpen }) {

    return (
        <Link to={`/history/${requestId}`} style={{ textDecoration: 'none' }}>
            <div className={styles.request}>
                <div>{fullName}</div>
                <div>{time.slice(0,-9)}</div>
            </div>
        </Link>
    )
}