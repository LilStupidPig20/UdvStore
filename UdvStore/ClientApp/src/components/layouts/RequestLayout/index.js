import React, { useContext, useState } from 'react';
import styles from './requestLayout.module.css';
import { AuthContext } from '../../../context/AuthContext';
import { RequestStateContext } from '../../../context/RequestStateContext';

export default function RequestLayout ({ children, requestId, event, description, time, employeeId, isOpen}) {
    const auth = useContext(AuthContext);
    const isClicked = useContext(RequestStateContext).isClicked;
    const [num, setNum] = useState(0);

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
            fetch(`https://localhost:5001/coinRequest/acceptRequest?idRequest=${requestId}&coinsNumber=${num}`, options)
            .then(response => {
                //if(response.ok) toggleSent(true);
            })
            .catch(error => {
                console.log(error);
                //toggleSent(false);
            })
        }
    }

    return (
        <div className={styles.layout}>
            {children}
                {isClicked && 
                    <div className={styles.requestCont}>
                        <div>Мероприятие: {event}</div>
                        <div>Описание активности: {description}</div>
                        <div>Дата проведения мероприятия: {time.slice(0,-9)}</div>
                        <div>
                            <label htmlFor='score'>Баллы:</label>
                            <input 
                                type='number' 
                                id='score' 
                                required
                                onChange={changeHandler}
                                className={styles.inputScore}
                            />
                        </div>
                        <div className={styles.buttons}>
                            <button 
                                type='submit' 
                                className={styles.buttonAccept} 
                                onClick={()=>approveRequest()}
                            >Принять</button>
                            <button 
                                type='submit' 
                                className={styles.buttonDeny} 
                                onClick={()=>denyRequest()}
                            >Отклонить</button>
                        </div>
                        
                    </div>
            }
            
        </div>
    )

}