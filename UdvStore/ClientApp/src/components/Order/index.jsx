import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./order.module.css";

export default function Order({
    id,
    fio,
    products,
    status,
    time,
    selId,
    isHistory
}) {
    const [isClicked, setClicked] = useState(false);
    const [isRejected, setRejected] = useState(false);
    const [isError, setError] = useState(false);
    const [comment, setComment] = useState('');
    const auth = useContext(AuthContext);
    let allStatuses = ['В обработке', 'Принят', 'Готов к получению', 'Получен', 'Отменен'];
    let statusRus = '';
    
    switch(status) {
        case 'Open':
            statusRus = 'В обработке';
            break;
        case 'Accepted':
            statusRus = 'Принят';
            allStatuses.shift();
            break;
        case 'ReadyToReceive':
            statusRus = 'Готов к получению';
            allStatuses.shift();
            allStatuses.shift();
            break;
        case 'Received':
            statusRus = 'Получен';
            break;
        case 'Cancelled':
            statusRus = 'Отменен';
            break;
    }

    const setStatus = () => {
        if(auth.role === 0) {
            let opts = document.getElementById(selId);
            let status = opts.options[opts.selectedIndex].value;
            switch(status) {
                case 'В обработке':      
                    break;
                case 'Принят':
                    fetch(`https://localhost:5001/order/changeToAccepted?idOrder=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                    })             
                    break;     
                case 'Готов к получению':
                    /*
                    fetch(`https://localhost:5001/order/changeToReady?idOrder=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                    })*/
                    console.log(opts.childElementCount);                  
                    break;
                case 'Получен':
                    fetch(`https://localhost:5001/order/changeToReceived?idOrder=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
                    })                 
                    break;
                case 'Отменен':
                    setRejected(true);              
                    break;
            }
        }
        
    }

    let productsName = '';
    products.map((prod, index) => {
        if(index + 1 !== products.length){
            productsName += `${prod.productName}, `;
        } else productsName += prod.productName;
    })

    return (
        <>
            {isRejected && isError &&
            <div className={styles.modalLayout} onClick={()=>setRejected(false)}>
            <div className={styles.modalActive}>
                <h1 className={styles.errorModalTitle}>Ошибка заполнения!</h1>
                <h2 className={styles.errorModalSubTitle}>Попробуйте заполнить анкету снова.</h2>
                <button 
                    type='button'
                    onClick={()=>{setRejected(false); setError(false);}}
                    className={styles.modalButton}
                >Повторить</button>
                </div>
            </div>
        }
            {isRejected &&
                <div className={styles.modalLayout}>
                <div className={styles.denyActive}>
                    <h1 className={styles.denyTitle}>Заказ отклонен по причине:</h1>
                    <textarea 
                        placeholder='Текст...' 
                        className={styles.infoArea}
                        required
                        onChange={(event) => setComment(event.target.value)}/>
                    <button 
                        type='button'
                        onClick={() => {
                            fetch(`https://localhost:5001/order/cancelOrderByAdmin?idOrder=${id}&cancellationComment=${comment}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${auth.token}`
                                }
                            })
                            .then(response => {
                                if(response.status === 200) {
                                    setError(false); 
                                    setRejected(false);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                setError(true);
                            })
                        }}
                        className={styles.modalButton}
                    >Отправить</button>
                </div>
            </div>
            }
            {isHistory ? 
                <>
                    {isClicked ?
                    <>
                    <div className={styles.orderPopup} onClick={() => setClicked(false)}>
                        <div className={styles.orderContainer}>
                            <Link to='/orders/history' className={styles.close}>
                                <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>ФИО:</div>
                                <div className={styles.orderInfo}>{fio}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Номер заказа:</div>
                                <div className={styles.orderInfo}>{id}</div>
                            </div>
                            <div className={styles.prodCont}>
                                <div className={styles.orderTitle}>Заказ:</div>
                                <div className={styles.orderProducts}>
                                    {products.map((prod) => {
                                        return <div className={styles.orderProducts}>
                                            <div className={styles.prodImg}>
                                                <img src={prod.imageLink} width='90px' height='120px' alt="Фото товара"/>
                                            </div>
                                            <div>
                                                <div className={styles.prodName}>{prod.productName}</div>
                                                {prod.size !== null &&
                                                    <div className={styles.prodSize}>Размер: {prod.size}</div>
                                                }
                                                {prod.size !== null &&
                                                    <div className={styles.prodSize}>Размер: {prod.size}</div>
                                                }
                                                <div className={styles.prodPrice}>Цена: {prod.productPrice} UC</div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Статус:</div>
                                <div className={styles.orderInfo}>{statusRus}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Дата заказа:</div>
                                <div className={styles.orderInfo}>{time}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order} onClick={() => {setClicked(true)}}>
                        <div style={{width:'104px'}}>{time}</div>
                        <div style={{width:'300px'}}>{fio}</div>
                        <div name='name'>{productsName}</div>
                        <div>{statusRus}</div>
                    </div>
                    </>:
                        <div className={styles.order} onClick={() => {setClicked(true)}}>
                            <div style={{width:'104px'}}>{time}</div>
                            <div style={{width:'300px'}}>{fio}</div>
                            <div name='name'>{productsName}</div>
                            <div>{statusRus}</div>
                        </div>
                    }
                </>
            : 
            <>
                {isClicked ?
                    <>
                    <div className={styles.orderPopup} onClick={() => setClicked(false)}>
                        <div className={styles.orderContainer}>
                            <Link to='/orders' className={styles.close}>
                                <svg width="23" height="23" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7781 5.30322L6.17147 15.9098" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.7781 15.9102L6.17148 5.30355" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>ФИО:</div>
                                <div className={styles.orderInfo}>{fio}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Номер заказа:</div>
                                <div className={styles.orderInfo}>{id}</div>
                            </div>
                            <div className={styles.prodCont}>
                                <div className={styles.orderTitle}>Заказ:</div>
                                <div className={styles.orderProducts}>
                                    {products.map((prod) => {
                                        return <div className={styles.orderProducts}>
                                            <div className={styles.prodImg}>
                                                <img src={prod.imageLink} width='90px' height='120px' alt="Фото товара"/>
                                            </div>
                                            <div>
                                                <div className={styles.prodName}>{prod.productName}</div>
                                                {prod.size !== null &&
                                                    <div className={styles.prodSize}>Размер: {prod.size}</div>
                                                }
                                                <div className={styles.prodPrice}>Цена: {prod.productPrice} UC</div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Статус:</div>
                                <div className={styles.orderInfo}>{statusRus}</div>
                            </div>
                            <div className={styles.flexCont}>
                                <div className={styles.orderTitle}>Дата заказа:</div>
                                <div className={styles.orderInfo}>{time}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order}>
                        <div onClick={() => {setClicked(true)}} style={{width:'104px'}}>{time}</div>
                        <div onClick={() => {setClicked(true)}} style={{width:'300px'}}>{fio}</div>
                        <div name='name' onClick={() => {setClicked(true)}}>{productsName}</div>
                        <select name='statusess' id={selId} onChange={setStatus}>
                            <option id={statusRus}>{statusRus}</option>
                        </select>
                    </div>
                    </>
                : 
                    <>
                        <div className={styles.order}>
                            <div onClick={() => {setClicked(true)}} style={{width:'104px'}}>{time}</div>
                            <div onClick={() => {setClicked(true)}} style={{width:'300px'}}>{fio}</div>
                            <div name='name' onClick={() => {setClicked(true)}}>{productsName}</div>
                            <select name='statusess' id={selId} onChange={setStatus} className={styles.orderSelect}>
                                <option id={statusRus}>{statusRus}</option>
                                {allStatuses.map((st) => {
                                        if (st !== statusRus) {
                                            switch (st) {
                                                case 'В обработке':
                                                    
                                                    let select1 = document.getElementById(selId);
                                                        if (select1 !== null) {
                                                            let opt = document.createElement('option');
                                                            opt.id = st;
                                                            opt.textContent = st;
                                                            select1.append(opt);
                                                        }
                                                    break;
                                                case 'Принят':
                                                    let select2 = document.getElementById(selId);
                                                        if (select2 !== null) {
                                                            let opt = document.createElement('option');
                                                            opt.id = st;
                                                            opt.textContent = st;
                                                            select2.append(opt);
                                                        }
                                                    break;
                                                case 'Готов к получению':
                                                    let select3 = document.getElementById(selId);
                                                        if (select3 !== null) {
                                                            let opt = document.createElement('option');
                                                            opt.id = st;
                                                            opt.textContent = st;
                                                            select3.append(opt);
                                                        }
                                                    break;
                                                case 'Получен':
                                                    let select4 = document.getElementById(selId);
                                                        if (select4 !== null) {
                                                            let opt = document.createElement('option');
                                                            opt.id = st;
                                                            opt.textContent = st;
                                                            select4.append(opt);
                                                        }
                                                    break;
                                                case 'Отменен':
                                                    let select5 = document.getElementById(selId);
                                                        if (select5 !== null) {
                                                            let opt = document.createElement('option');
                                                            opt.id = st;
                                                            opt.textContent = st;
                                                            select5.append(opt);
                                                        }
                                                    break;
                                            }
                                        }
                                    })
                                    }
                            </select>
                        </div>
                    </>
                }
            </>
            }
        </>
    );
}