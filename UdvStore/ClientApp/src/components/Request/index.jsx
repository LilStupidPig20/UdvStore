import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './request.module.css'

export default function Request({ 
    fullName, 
    time, 
    requestId, 
    event, 
    description, 
    timeEvent 
}) {
    const auth = useContext(AuthContext);
    const [num, setNum] = useState(0);
    const [comment, setComment] = useState('');
    const [isModal, setModal] = useState(false);
    const [result, setResult] = useState(false);
    const [isError, setError] = useState(false);
    const [isDeny, setDeny] = useState(false);
    const [isClicked, setClicked] = useState();

    console.log(isModal);
    console.log(result);
    console.log(isError);
    console.log(isDeny);
    console.log(isClicked);
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
            if(comment !== '') {
                fetch(`https://localhost:5001/coinRequest/rejectRequest?idRequest=${requestId}&comment=${comment}`, options)
                    .then(response => {
                        if(response.status === 200) setError(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setError(true);
                    })
            }
            setError(true);   
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
                        if(response.status === 200) setError(false);
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
        <>
            {isModal && result === true && isError === false &&
                <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                    <div className={styles.modalActive}>
                        <h1 className={styles.modalTitle}>Баллы начислены!</h1>
                        <button 
                            type='button'
                            onClick={()=>{setModal(false); setClicked()}}
                            className={styles.modalButton}
                        >Готово</button>
                    </div>
                </div>
            }
            {isModal && result === false && isError === false && isDeny === true &&
                <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                    <div className={styles.modalActive}>
                        <h1 className={styles.modalTitle}>Заявка отклонена!</h1>
                        <button 
                            type='button'
                            onClick={()=>{setModal(false); setClicked()}}
                            className={styles.modalButton}
                        >Готово</button>
                    </div>
                </div>
            }

            {isModal && result === false && isError === false && isDeny === false &&
                <div className={styles.modalLayout}>
                    <div className={styles.denyActive}>
                        <h1 className={styles.denyTitle}>Причина отказа:</h1>
                        <textarea 
                            placeholder='Текст...' 
                            className={styles.infoArea}
                            onChange={(event) => setComment(event.target.value)}/>
                        <button 
                            type='button'
                            onClick={()=>{
                                denyRequest();
                                setDeny(true);
                            }}
                            className={styles.modalButton}
                        >Отправить</button>
                    </div>
                </div>
            }
            {isModal && isError === true &&
                <div className={styles.modalLayout} onClick={()=>setModal(false)}>
                    <div className={styles.modalActive}>
                        <h1 className={styles.errorModalTitle}>Ошибка заполнения!</h1>
                        <h2 className={styles.errorModalSubTitle}>Попробуйте заполнить анкету снова.</h2>
                        <button 
                            type='button'
                            onClick={()=>{setModal(false); setDeny(false); setResult(false); setError(false);}}
                            className={styles.modalButton}
                        >Повторить</button>
                    </div>
                </div>
            }
        {isClicked ?
            <>
                <div className={styles.requestPopup}>
                    <div className={styles.requestContainer}>
                        <Link to='/requests' className={styles.close} onClick={()=>setClicked()}>
                            <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <div className={styles.flexCont}>
                            <div className={styles.requestTitle}>ФИО сотрудника:</div>
                            <div className={styles.requestInfo}>{fullName}</div>
                        </div>
                        <div className={styles.flexCont}>
                            <div className={styles.requestTitle}>Мероприятие:</div>
                            <div className={styles.requestInfo}>{event}</div>
                        </div>
                        <div className={styles.flexCont}>
                            <div className={styles.requestTitle}>Описание активности:</div>
                            <div className={styles.requestInfo}>{description}</div>
                        </div>
                        <div className={styles.flexCont}>
                            <div className={styles.requestTitle}>Дата проведения мероприятия:</div>
                            <div className={styles.requestInfo}>{timeEvent}</div>
                        </div>
                        <div className={styles.flexCont}>
                            <div className={styles.requestTitle}>Дата заявки:</div>
                            <div className={styles.requestInfo}>{time}</div>
                        </div>
                        <div className={styles.flexCont}>
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
                                    setModal(true);
                                    setResult(false);
                                    setDeny(false)}}
                            >Отклонить</button>
                        </div>
                    </div>
                </div>
                <div className={styles.request}>
                    <div>{fullName}</div>
                    <div>{time}</div>
                </div>
            </>
        :
        <div className={styles.request} onClick={() => setClicked(true)}>
            <div>{fullName}</div>
            <div>{time}</div>
        </div>
        }
        
        </>
    )
}