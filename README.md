## Модуль 1. Мессенджер

### Ссылка на проект в Netlify:
https://inquisitive-cucurucho-cc5a25.netlify.app/

### Команды, использующиеся в проекте:
- `npm run dev` – запуск Vite hot reload dev server
- `npm run start` – сборка проекта и запуск сервера, раздающего статику на 3000 порту
- `npm run build` – сборка проекта

### Ссылки на статичные страницы
- https://inquisitive-cucurucho-cc5a25.netlify.app/index.html – экран формы логина
- https://inquisitive-cucurucho-cc5a25.netlify.app/registration.html – экран формы регистрации
- https://inquisitive-cucurucho-cc5a25.netlify.app/profile.html – экран профиля пользователя
- https://inquisitive-cucurucho-cc5a25.netlify.app/profile_edit.html – экран редактирования профиля
- https://inquisitive-cucurucho-cc5a25.netlify.app/profile_password.html – экран смены пароля
- https://inquisitive-cucurucho-cc5a25.netlify.app/profile_popup.html – попап загрузки аватара
- https://inquisitive-cucurucho-cc5a25.netlify.app/list.html – страница со списком чатов
- https://inquisitive-cucurucho-cc5a25.netlify.app/list_active.html – страница с выбранным чатом
- https://inquisitive-cucurucho-cc5a25.netlify.app/list_search.html – страница с активным поиском (чаты пока не фильтруются)
- https://inquisitive-cucurucho-cc5a25.netlify.app/error404.html – страница с ошибкой 404
- https://inquisitive-cucurucho-cc5a25.netlify.app/error500.html – страница с ошибкой 500

### Макет
Для вёрстки использовался макет от Яндекса, ссылка – https://www.figma.com/file/cwgeD98Q3YHHHRnhtN2WPT/Chat_external_link

### Примечания
Модульность пока минимальна, а именно – все шаблоны кучей лежат в partials, все стили отбиты комментариями в main.less 
по тому, как они будут разнесены в будущем. В следующем спринте, когда я перейду с серверного рендера на пререндер, 
проект будет разбит на модули уже как надо.

Навигация происходит по нажатию на ссылки или же при отправке форм (нажатие на соответствующую кнопку или же на Enter внутри input).
