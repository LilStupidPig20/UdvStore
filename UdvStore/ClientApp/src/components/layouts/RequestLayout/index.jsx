import React, { useContext, useState } from 'react';
import styles from './requestLayout.module.css';
import { AuthContext } from '../../../context/AuthContext';
import { RequestStateContext } from '../../../context/RequestStateContext';

export default function RequestLayout ({ children, requestId, event, description, time, employeeId, isOpen}) {
    const auth = useContext(AuthContext);
    const isClicked = useContext(RequestStateContext).isClicked;
    const [num, setNum] = useState(0);
    const [isModal, setModal] = useState(false);
    const [result, setResult] = useState(false);
    const [isError, setError] = useState(false);

    const changeHandler = (event) => {
        setNum(event.target.value);
    };

    const denyRequest = async () => {
        if(auth.role === 0) {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
            };
            fetch(`https://localhost:5001/coinRequest/rejectRequest?idRequest=${requestId}`, options)
            .then(response => {
                //if(response.ok) toggleSent(true);
            })
            .catch(error => {
                console.log(error);
                //toggleSent(false);
            })
        }
    }


    const approveRequest = async () => {
        if(auth.role === 0) {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
            };
            if (num !== 0) {
                fetch(`https://localhost:5001/coinRequest/acceptRequest?idRequest=${requestId}&coinsNumber=${num}`, options)
                .then(response => {
                    if(response.ok) setError(false);
                })
                .catch(error => {
                    console.log(error);
                    setError(true);
                })
            }
            setError(true);
        }
    }

    return (
        <div className={styles.layout}>
            {children}
                {isModal && result === true && isError === false &&
                    <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                        <div className={styles.modalActive}>
                            <h1 className={styles.modalTitle}>Баллы начислены!</h1>
                            <button 
                                type='button'
                                onClick={()=>{setModal(false); window.location.reload()}}
                                className={styles.modalButton}
                            >Готово</button>
                        </div>
                    </div>
                }

                {isModal && result === true && isError === true &&
                    <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                        <div className={styles.modalActive}>
                            <h1 className={styles.modalTitle}>Возникла ошибка!</h1>
                            <button 
                                type='button'
                                onClick={()=>{setModal(false); window.location.reload()}}
                                className={styles.modalButton}
                            >Повторить</button>
                        </div>
                    </div>
                }

                {isModal && result === false &&
                    <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                        <div className={styles.modalActive}>
                            <h1 className={styles.modalTitle}>Заявка отклонена!</h1>
                            <button 
                                type='button'
                                onClick={()=>{setModal(false); window.location.reload()}}
                                className={styles.modalButton}
                            >Готово</button>
                        </div>
                    </div>
                }
                {isClicked && 
                    <div className={styles.requestCont}>
                        <div>Мероприятие: {event}</div>
                        <div>Описание активности: {description}</div>
                        <div>Дата проведения мероприятия: {time.slice(0,-9)}</div>
                        <div className={styles.scoreCont}>
                            <label htmlFor='score'>Баллы: </label>
                            <input 
                                type='number' 
                                id='score' 
                                required
                                onChange={changeHandler}
                                className={styles.inputScore}
                            />
                            <div className={styles.score}>UC</div>
                        </div>
                        <div className={styles.buttons}>
                            <button 
                                type='submit' 
                                className={styles.buttonAccept} 
                                onClick={()=>{
                                    approveRequest(); 
                                    setModal(true);
                                    setResult(true)}}
                            >Принять</button>
                            <button 
                                type='submit' 
                                className={styles.buttonDeny} 
                                onClick={()=>{
                                    denyRequest(); 
                                    setModal(true);
                                    setResult(false)}}
                            >Отклонить</button>
                        </div>
                    </div>
                }
        </div>
    )
}
