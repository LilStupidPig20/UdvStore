import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar'
import { AuthContext } from '../../context/AuthContext';
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import styles from './charge.module.css'


export const ChargePage = () => {
    const [ids, setIds] = useState([]);
    const [form, setForm] = useState({nameOfEvent: '', description: '', coins: '', dateOfEvent: '', employeesIds: []});
    const [fios, setFios] = useState([]);
    let count = 1;

    const auth = useContext(AuthContext);
    let isActive = useContext(ButtonStatesContext).isActive;
    const data = JSON.parse(localStorage.getItem('userData'));

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    console.log(form);
    const addFioInput = () => {
        let cont = document.getElementById('fioCont');
        let inp = document.createElement('input');
        count += 1;
        inp.id = `input${count}`;
        inp.type = 'text';
        inp.name = 'employeesIds'
        inp.className = styles.inputText;
        inp.placeholder = 'Текст...';
        inp.addEventListener('input', addToArray);
        inp.setAttribute('list', 'users');
        cont.appendChild(inp);
    }
    
    const addToArray = (event) => {
        let inp = document.getElementById(event.target.id);
        let opts = document.getElementById('users').childNodes;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === inp.value) {
                setIds(prev => ([...prev, opts[i].id]));
                console.log(ids);
                break;
            }
        }
    }

    useEffect(()=> {
        form.employeesIds = ids;
    }, [ids])

    useEffect(() => {
        if(data.role === 0) {
            fetch('https://localhost:5001/adminAccrual/getAllEmployees', {
                headers: { 
                    'Authorization': `Bearer ${data.token}`
                }
            })
            .then(res => res.json())
            .then(items => setFios(items))
        }
    }, []);
    let list = document.getElementById('users');
    
    if(fios.length !== 0 && list.childElementCount === 0) {
        for(let elem of fios) {
            let opt = document.createElement('option')
            opt.value = elem.fio;
            opt.id = elem.id;
            opt.addEventListener('click', addToArray)
            list.append(opt);
        }
    }
    
    const sendRequest = async () => {
        if(auth.role === 0) {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(form)
            };
            fetch('https://localhost:5001/adminAccrual/accrualCoinsToUsers', options)
            .then(response => {
                if(response.ok) ;
            })
        }
    }

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
                                id="nameOfEvent" 
                                name='nameOfEvent'
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
                                id='dateOfEvent' 
                                name='dateOfEvent'
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
                                    id='input1'
                                    name='employeesIds'
                                    placeholder='Текст...'
                                    className={styles.inputText}
                                    required
                                    list='users'
                                    onInput={addToArray}
                                />
                                <datalist id='users' />
                            </div>
                        </div>
                        <div className={styles.scoreCont}>
                            <label htmlFor='score' className={styles.scoreTitle}>Баллы: </label>
                            <input 
                                type='number' 
                                id='coins' 
                                name='coins'
                                required
                                onChange={changeHandler}
                                className={styles.inputScore}
                            />
                            <div className={styles.score}>UC</div>
                        </div>
                        <Link to="/result" className={styles.link}><button 
                            className={styles.sendButton}
                            type='submit'
                            onClick={()=>{ sendRequest() }}
                        >Начислить</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}