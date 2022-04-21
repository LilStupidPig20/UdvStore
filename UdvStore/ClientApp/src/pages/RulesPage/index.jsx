import React from 'react'
import styles from './rules.module.css'

export default function RulesPage() {
    return (
        <div className={styles.wrapper} >
            <img src="./imgs/backgroundUdv.jpg" alt="" className={styles.bgImage} />
            <div className={styles.content}>
                <h1 className={styles.title}>Правила получения UDV-coins</h1>
                <div className={styles.text}>
                    <ul className={styles.rules}>
                        <li>Участие в мероприятии от лица Компании считается в качестве докладчика, либо архитектора мероприятия. Участие в конференциях в качестве слушателя не считается внешней активностью.</li>
                        <li>Для начисления баллов необходимо написать об участии в активности сотрудник Х отдела маркетинга.</li>
                        <li>Участие сотрудника в спортивных и развлекательных мероприятиях (Спартакиада Айтишников, Ночной забег и т.д.), которые оплачиваются компанией, также не считаются внешней активностью.</li>
                        <li>Если в анонсе внутренней активности не указано, что за неё начисляются UCoins (участие в Laser Night Run), то UCoins за неё не начисляются.</li>
                        <li>Для начисления юкоинов в соцсетях в любом посте/сториз должен быть <span className={styles.greenText} >хэштег #usscltd + название компании или ссылка на наш аккаунт</span>:</li>
                    </ul>
                    <div className={styles.contacts}>
                        <p>VK - <span className={styles.greenText} >vk.com/ussc_group</span></p>
                        <p>Instagram - <span className={styles.greenText} >@usscltd</span></p>
                        <p>Facebook - <span className={styles.greenText} >facebook.com/USSCru/</span></p>
                    </div>

                </div>
                <p className={styles.subText} >*Сториз с указанием компании должны быть закреплены, а посты должны быть открыты для всех.</p>
            </div>
        </div>
    );
}