import React, { useState } from 'react'
import styles from './rules.module.css'
import { Navbar } from '../../components/Navbar';

export default function RulesPage() {
    const [flag, setFlag] = useState(true);

    return (
        <div className={styles.wrapper} >
            <Navbar />
            {
                flag
                ?
                <img src="/imgs/rulesArrow.svg" className={styles.rightArrow} alt="" onClick={() => setFlag(!flag)} />
                :
                <img src="/imgs/rulesArrow.svg" className={styles.leftArrow} alt="" onClick={() => setFlag(!flag)} />
            }
            {
                flag
                    ?
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
                                <p>VK - <a href='https://vk.com/ussc_group' className={styles.greenText} >vk.com/ussc_group</a></p>
                                <p>Instagram - <a href='https://www.instagram.com/usscltd/' className={styles.greenText} >@usscltd</a></p>
                                <p>Facebook - <a href='https://www.facebook.com/USSCru/' className={styles.greenText} >facebook.com/USSCru/</a></p>
                            </div>

                        </div>
                        <p className={styles.subText} >*Сториз с указанием компании должны быть закреплены, а посты должны быть открыты для всех.</p>
                    </div>
                    :
                    <div className={styles.content}>
                        <h1 className={styles.title}>Правила получения UDV-coins</h1>
                        <table className={styles.rulesTable} cellPadding={'10px'}>
                            <tr>
                                <td>
                                    UCoins
                                </td>
                                <td>
                                    Мероприятие
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    0,5
                                </td>
                                <td>
                                    Закреплённые сториз о работе в во внешних соц. сетях
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    Развлекательные/короткие посты/заметки/репосты о работе во внешних соц. сетях
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    3
                                </td>
                                <td>
                                    <ul>
                                        <li>Информационные посты о работе/мероприятиях  во внешних соц. сетях (Vkontakte, Instagram, Facebook)</li>
                                        <li>Отзыв в Дайджест</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    5
                                </td>
                                <td>
                                    <ul>
                                        <li>Информационные посты/статья во внутренних ресурсах (Staff, Дайджест) - истории о походах, профильные статьи;</li>
                                        <li>Отзывы о работе в Компании на сторонних ресурсах;</li>
                                        <li>Экспертный комментарий на запрос прессы;</li>
                                        <li>Помощь и участие в организации внутренних/внешних активностей;</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    10
                                </td>
                                <td>
                                    <ul>
                                        <li>Профильный материал на внешних ресурсах (аналитика, обзор, тематическая статья);</li>
                                        <li>Идея и организация активности, одобренной руководством (спортивное, интеллектуальное, благотворительное мероприятие, SPEECH-ка, мастер-класс);</li>
                                        <li>Профильный материал на внешних ресурсах (аналитика, обзор, тематическая статья);</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Различное
                                </td>
                                <td>
                                    Участие в нестандартных внутренних/внешних активностях, добрые дела, сумма которых начисляется по факту                                </td>
                            </tr>
                        </table>
                    </div>
            }
        </div>
    );
}