import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar'
import { AuthContext } from '../../context/AuthContext';
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import styles from './charge.module.css'


export const ChargePage = () => {
    const [form, setForm] = useState({eventEntered: '', description: '', time: '', employeeId: ''});
    const [fios, setFios] = useState([]);
    const auth = useContext(AuthContext);
    let isActive = useContext(ButtonStatesContext).isActive;
    const data = JSON.parse(localStorage.getItem('userData'));
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const addFioInput = () => {
        let cont = document.getElementById('fioCont');
        let inp = document.createElement('input');
        inp.type = 'text';
        inp.className = styles.inputText;
        inp.id = 'fio';
        inp.placeholder = 'Текст...';
        inp.setAttribute('list', 'users');
        cont.appendChild(inp);
    }
    
    useEffect(() => {
        if(data.role === 0) {
            fetch('https://localhost:5001/adminAccrual/getAllEmployees', {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
            .then(res => res.json())
            .then(items => setFios(items))
            .catch(error => auth.logout())
        }
    }, []);
    let list = document.getElementById('users');
    if(fios.length !== 0 && list.childElementCount === 0) {
        for(let elem of fios) {
            let opt = document.createElement('option')
            opt.value = elem.fio;
            opt.id = elem.id;
            list.append(opt);
        }
    }

    /*const sendRequest = async () => {
        if(auth.role === 1) {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(form)
            };
            fetch(`/coinRequest/sendToAdmin?eventEntered=${form.eventEntered}&description=${form.description}&employeeId=${form.employeeId}&time=${form.time}T12:00:00`, options)
            .then(response => {
                if(response.ok) toggleSent(true);
            })
            .catch(error => {
                console.log(error);
                toggleSent(false);
            })
        }
    }*/

    return (
        <div className={styles.wrapper}>
            <Navbar /> 
            <div className={styles.align}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Форма</h1>
                    <h2 className={styles.subTitle}>для зачисления UDV-coins сотрудникам </h2>
                    <div className={styles.scroll}>
                        <div className={styles.eventCont}>
                            <label htmlFor='eventEntered' className={styles.eventTitle}>Мероприятие:</label>
                            <input 
                                className={styles.eventInput} 
                                id="eventEntered" 
                                name='eventEntered'
                                required
                                autoFocus
                                autoComplete='off'
                                placeholder='Текст...'
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.dateCont}>
                            <label htmlFor='time' className={styles.inputDateTitle}>Дата проведения:</label>
                            <input 
                                className={styles.inputDate}
                                type='date' 
                                id='time' 
                                name='time'
                                max={new Date().toISOString().substring(0, 10)}
                                required
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.areaCont}>
                            <label htmlFor='description' className={styles.areaTitle}>Опишите активность:</label>
                            <textarea 
                                className={styles.infoArea} 
                                id="description" 
                                name='description'
                                autoComplete='off'
                                required
                                maxLength='100'
                                placeholder='Текст...'
                                onChange={changeHandler}
                            />
                        </div>
                        <div style={{marginTop:'-15px'}}>
                            <button 
                                className={isActive? styles.plusButton_hide :styles.plusButton_act}
                                id='plusButton'
                                onClick={addFioInput}
                            >+</button>
                            <div className={styles.fioCont} id='fioCont'>
                                <label htmlFor='fio' className={styles.inputTextTitle}>ФИО сотрудника:</label>
                                <input 
                                    type='text' 
                                    id='fio' 
                                    placeholder='Текст...'
                                    className={styles.inputText}
                                    required
                                    list='users'
                                />
                                <datalist id='users' />
                            </div>
                        </div>
                        <div className={styles.scoreCont}>
                            <label htmlFor='score' className={styles.scoreTitle}>Баллы: </label>
                            <input 
                                type='number' 
                                id='score' 
                                required
                                onChange={changeHandler}
                                className={styles.inputScore}
                            />
                            <div className={styles.score}>UC</div>
                        </div>
                        <Link to="/result" className={styles.link}><button 
                            className={styles.sendButton}
                            type='submit'
                            //onClick={()=>{ sendRequest() }}
                        >Начислить</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}