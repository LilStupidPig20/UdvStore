import React, { useState, useContext, useEffect } from 'react';
import styles from './transfer.module.css';
import { Link } from 'react-router-dom';
import { Navbar } from './../../components/Navbar/index';
import { AuthContext } from '../../context/AuthContext';

export default function TransferPage() {
    const auth = useContext(AuthContext);
    const data = JSON.parse(localStorage.getItem('userData'));
    const [form, setForm] = useState({ currentEmployeeId: data.userId, receiver: '', coinsCount: '', comment: '' });
    const [isSent, setSent] = useState();
    const [users, setUsers] = useState([]);

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
    
    const sendRequest = async () => {
        if(auth.role === 1) {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${data.token}`
                }
            };
            await fetch(`https://localhost:5001/coins/transferToAnotherUser?currentEmployeeId=${form.currentEmployeeId}&receiver=${form.receiver}&coinsCount=${form.coinsCount}&comment=${form.comment}`, options)
            .then(response => {
                if (response.status === 200) setSent(true)
                else setSent(false);
            })
            .catch(error => {
                console.log(error);
                setSent(false);
            })
        }
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
            {isSent === true &&
                <div className={styles.popup}>
                    <div className={styles.align}>
                        <div className={styles.content_true}>
                            <h1 className={styles.title_true}>Баллы отправлены!</h1>
                            <div className={styles.text_true}>Ваш коллега будет рад пополнению счета :)</div>
                            <Link to='/profile' className={styles.link}><button className={styles.button}>Готово</button></Link>
                        </div>
                    </div>
                </div>
            }
            {isSent === false &&
                <div className={styles.popup}>
                    <div className={styles.align}>
                        <div className={styles.content_false}>
                            <h1 className={styles.title_false}>Баллы не отправлены!</h1>
                            <div className={styles.text_false}>Произошла ошибка :( <br></br>Попробуйте ввести данные еще раз.</div>
                            <Link to='/transfer' className={styles.link}><button className={styles.button} onClick={() => setSent()}>Заполнить</button></Link>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.align}>
                <div className={styles.container}>
                    <Link to='/profile' className={styles.close}>
                        <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
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

                    <button
                        className={styles.sendButton}
                        type='submit'
                        onClick={() => { sendRequest() }}
                    >Отправить</button>
                </div>
            </div>
        </div>
    )
}