import React, { useState, useContext, useEffect } from 'react';
import styles from './transfer.module.css';
import { Link } from 'react-router-dom';
import { Navbar } from './../../components/Navbar/index';
import { AuthContext } from '../../context/AuthContext';
import { SendFormChecker } from '../../context/SendFormChecker';

export default function TransferPage() {
    const auth = useContext(AuthContext);
    const data = JSON.parse(localStorage.getItem('userData'));
    const [form, setForm] = useState({ currentEmployeeId: data.userId, receiver: 0, coinsCount: 0, comment: '' });
    // , currentEmployeeId: data.userId 
    const [users, setUsers] = useState([]);
    const toggleSent = useContext(SendFormChecker).toggleSent;
    console.log(form);

    let list = document.getElementById('users');

    if (users.length !== 0 && list.childElementCount === 0) {
        for (let elem of users) {
            let opt = document.createElement('option');
            opt.value = elem.fio;
            opt.id = elem.id;
            list.append(opt);
        }
    }

    useEffect(() => {
        fetch('https://localhost:5001/coins/getEmployeesToTransfer', {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
            .then(res => res.json())
            .then(items => setUsers(items))
    }, []);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const sendRequest = () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify(form)
        };
        console.log(options);
        fetch(`https://localhost:5001/coins/transferToAnotherUser`, options)
            // ?currentEmployeeId=${form.currentEmployeeId}?receiver=${form.receiver}?coinsCount=${form.coinsCount}?currentEmployeeId=${form.comment}
            .then(response => {
                if (response.status === 200) {
                    toggleSent(true)
                }
                else {
                    console.log(response.status)
                    toggleSent(false);
                }
            })
            .catch(error => {
                console.log(error);
                toggleSent(false);
            })
    };

    const addReceiverId = (event) => {
        let inp = document.getElementById(event.target.id);
        let opts = document.getElementById('users').childNodes;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === inp.value) {
                setForm({ ...form, receiver: Number(opts[i].id) })
                break;
            }
        }
    }



    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.align}>

                <div className={styles.container}>
                    <h1 className={styles.title}>Форма</h1>
                    <h2 className={styles.subTitle}>для перевода UCoins другому сотруднику</h2>
                    <div className={styles.eventCont}>
                        <label htmlFor='receiver' className={styles.eventTitle}>ФИО сотрудника:</label>
                        <input
                            className={styles.eventInput}
                            id="receiver"
                            name='receiver'
                            required
                            autoFocus
                            autoComplete='off'
                            placeholder='Текст...'
                            onChange={addReceiverId}
                            list='users'
                        />
                        <datalist id='users' />
                    </div>
                    <div className={styles.eventCont}>
                        <label htmlFor='coinsCount' className={styles.eventTitle}>Баллы:</label>
                        <input
                            className={styles.numberInput}
                            type='number'
                            id="coinsCount"
                            name='coinsCount'
                            required
                            autoComplete='off'
                            onChange={(e) => setForm({ ...form, coinsCount: Number(e.target.value) })}
                        />
                        <span className={styles.eventTitle}>UC</span>

                    </div>
                    <div className={styles.eventCont}>
                        <label htmlFor='comment' className={styles.eventTitle}>Комментарий:</label>
                        <textarea
                            className={styles.commentInput}

                            id="comment"
                            name='comment'
                            required
                            autoComplete='off'
                            placeholder='Текст...'
                            onChange={changeHandler}
                        />
                    </div>

                    <Link to="/transferResult" className={styles.link}>
                        <button
                            className={styles.sendButton}
                            type='submit'
                            onClick={() => { sendRequest() }}>
                            Отправить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}