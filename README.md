## Модуль 1. Мессенджер

### Ссылка на проект в Netlify:
https://lambent-kelpie-e2e1ec.netlify.app/

### Команды, использующиеся в проекте:
- `npm run dev` – запуск Vite hot reload dev server
- `npm run start` – сборка проекта и запуск сервера, раздающего статику на 3000 порту
- `npm run build` – сборка проекта

### Ссылки на статичные страницы
- https://lambent-kelpie-e2e1ec.netlify.app/index – экран формы логина
- https://lambent-kelpie-e2e1ec.netlify.app/registration – экран формы регистрации
- https://lambent-kelpie-e2e1ec.netlify.app/profile – экран профиля пользователя
- https://lambent-kelpie-e2e1ec.netlify.app/profile_edit – экран редактирования профиля
- https://lambent-kelpie-e2e1ec.netlify.app/profile_password – экран смены пароля
- https://lambent-kelpie-e2e1ec.netlify.app/profile_popup – попап загрузки аватара
- https://lambent-kelpie-e2e1ec.netlify.app/list – страница со списком чатов
- https://lambent-kelpie-e2e1ec.netlify.app/list_active – страница с выбранным чатом
- https://lambent-kelpie-e2e1ec.netlify.app/list_search – страница с активным поиском (чаты пока не фильтруются)
- https://lambent-kelpie-e2e1ec.netlify.app/error404 – страница с ошибкой 404
- https://lambent-kelpie-e2e1ec.netlify.app/error500 – страница с ошибкой 500

### Макет
Для вёрстки использовался макет от Яндекса, ссылка – https://www.figma.com/file/cwgeD98Q3YHHHRnhtN2WPT/Chat_external_link

### Примечания
Модульность пока минимальна, а именно – все шаблоны кучей лежат в partials, все стили отбиты комментариями в main.less 
по тому, как они будут разнесены в будущем. В следующем спринте, когда я перейду с серверного рендера на пререндер, 
проект будет разбит на модули уже как надо.

Навигация происходит по нажатию на ссылки или же при отправке форм (нажатие на соответствующую кнопку или же на Enter внутри input).
