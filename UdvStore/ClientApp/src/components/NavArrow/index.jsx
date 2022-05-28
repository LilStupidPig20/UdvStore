import React from 'react';
import styles from './arrow.module.css';
import { Link } from 'react-router-dom';

export default function NavArrow({
    to
}) {
    return (
        <Link to={`/${to}`}>
            <div className={styles.arrow}>
                <div></div>
            </div>
        </Link>
    );
}