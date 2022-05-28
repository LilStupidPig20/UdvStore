import React from 'react';
import styles from './arrow.module.css';
import { Link } from 'react-router-dom';

export default function NavArrow({
    to
}) {
    return (
        <Link to={`/${to}`}>
            <div className={styles.arrow}>
                <img src="/imgs/NavArrow.svg" alt="NavArrow" />
            </div>
        </Link>
    );
}