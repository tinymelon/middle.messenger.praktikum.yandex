import Handlebars from 'handlebars';
import * as Components from './components/';
import * as Pages from './pages/';

type PagesObject = {
    [key: string]: [string, Record<string, any>?];
};

const pages: PagesObject = {
    'login': [Pages.LoginPage],
    'registration': [Pages.RegistrationPage],
    'profile': [Pages.ProfilePage],
    'chats': [Pages.ChatsPage],
    'error': [Pages.ErrorPage, {'code': 404, 'text': 'Не туда попали'}]
}


Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => ((arg1 == arg2 && arg1 != undefined) ? options.fn(this) : options.inverse(this)))

function navigate(page: string): void {
    const [source, args] = pages[page];

    document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(source)(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('profile'));

// @ts-ignore
document.addEventListener('click', (e) => {
    // @ts-ignore
    const page = e.target.getAttribute('data-page');

    if (page && pages[page]) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

// @ts-ignore
document.addEventListener('submit', (e) => {
    // @ts-ignore
    const page = e.target.getAttribute('action');
    if (page && pages[page]) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
