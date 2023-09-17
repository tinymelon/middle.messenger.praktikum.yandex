import Handlebars from 'handlebars';
import * as Components from './components/';
import * as Partials from './partials';
import registerComponent from './core/registerComponent';
import * as Pages from "./pages";


Object.entries(Partials).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

Object.entries(Components).forEach(([ name, component ]) => {
    registerComponent(name, component);
});

Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => ((arg1 == arg2 && arg1 != undefined) ? options.fn(this) : options.inverse(this)));
Handlebars.registerHelper('ifNotEquals', (arg1, arg2, options) => ((arg1 != arg2) ? options.fn(this) : options.inverse(this)));


/** TEMPORARY NAVIGATION **/
const pages:Record<string, any> = {
    'login': Pages.LoginPage,
    'registration': Pages.RegistrationPage,
    'profile': Pages.ProfilePage,
    'chats': Pages.ChatsPage,
    // 'error': [Pages.ErrorPage, {'code': 404, 'text': 'Не туда попали'}]
}

function navigate(page: string) {
    const app = document.getElementById('app');

    const Component = pages[page];
    const component = new Component();

    app!.innerHTML = '';
    app?.append(component.getContent()!);

}

document.addEventListener('DOMContentLoaded', () => navigate('profile'));

document.addEventListener('click', (e) => {
    // @ts-ignore
    const page = e.target.getAttribute('data-page');

    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

document.addEventListener('submit', (e) => {
    // @ts-ignore
    const page = e.target.getAttribute('action');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
