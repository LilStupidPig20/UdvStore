import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar'
import { ButtonStatesContext } from '../../context/ButtonStatesContext';
import styles from './charge.module.css'


export const ChargePage = () => {
    const [form, setForm] = useState({eventEntered: '', description: '', time: '', employeeId: ''});
    //const [isSent, toggleSent] = useState(false);
    let isActive = useContext(ButtonStatesContext).isActive;

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
        cont.appendChild(inp);
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
                    <h2 className={styles.subTitle}>для зачисления UDV-coins сотрудников </h2>
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
                                />
                            </div> 
                        </div>
                        
                        <Link to="/result" className={styles.link}><button 
                            className={styles.sendButton}
                            type='submit'
                            //onClick={()=>{ sendRequest() }}
                        >Отправить</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}