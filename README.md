# UdvStore для компании UDV
**Веб-приложение — маркетплейс, где  можно покупать мерч за UDV-коины, с автоматизированной системой добавления коинов по определенным правилам.**

**[Полное видео функционала](https://drive.google.com/file/d/16446LgJFto7D9WAYFqetIUwFZ_nXZiuy/view?usp=sharing)**

**[Дизайн-макет](https://www.figma.com/file/Uaty3LYtqSJqmfFDxhjjSk/Проект-UDV?node-id=0%3A1)**

**[Техническое задание](https://docs.google.com/document/d/1SrcDLMaVTt2D3LaWNtZbt4QVN5h1PyC0spefOCvQOps/edit)**

**[Список тест-кейсов](https://docs.google.com/document/d/1V5i62kQ_drBupkwx25-KgQS6UsVCjDjl0-5DYoaFscw/edit)**

**[Доска на Miro](https://miro.com/app/board/uXjVOHz2oq8=/)**

**[Roadmap](https://miro.com/app/board/uXjVO_dBgZU=/?invite_link_id=40036279026)**

# Как поставить базу данных?
<ol>
  <li>Установить SQL версии не меньше 13;</li>
  <li>Создать пустую базу данных с именем <b>UdvStoreDb</b>;</li>
  <li>Сделать Restore с указанием пути до файла <b>backupBd</b>;</li>
  <li>При необходимости изменить строку подключения в UdvStore/appsettings.json;</li>
  <li>Все готово!</li>
</ol>

# Как запустить приложение?
<ol>
  <li>Перейти в папку проекта;</li>
  <li>Установить npm с помощью команды <strong>npm install</strong>;</li>
  <li>Запусить фронт из папки UdvStore/ClientApp командой <strong>npm start</strong>;</li>
  <li>Запустить бэк;</li>
  <li>Открыть в браузере https://localhost:5001/;</li>
  <li>Все супер!</li>
</ol>
