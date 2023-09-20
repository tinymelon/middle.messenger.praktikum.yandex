import Handlebars from 'handlebars';
import * as Components from './components/';
import * as Partials from './partials';
import registerComponent from './core/registerComponent';
import * as Pages from "./pages";
import Block from "./core/block";


for (const [name, component] of Object.entries(Partials)) {
    Handlebars.registerPartial(name, component);
}

for (const [ name, component ] of Object.entries(Components)) {
    registerComponent(name, component as typeof Block);
}

Handlebars.registerHelper('ifEquals', (argument1, argument2, options) => ((argument1 == argument2 && argument1 != undefined) ? options.fn(this) : options.inverse(this)));
Handlebars.registerHelper('ifNotEquals', (argument1, argument2, options) => ((argument1 == argument2) ? options.inverse(this) : options.fn(this)));


/** TEMPORARY NAVIGATION **/
const pages:Record<string, any> = {
    'login': Pages.LoginPage,
    'registration': Pages.RegistrationPage,
    'profile': Pages.ProfilePage,
    'chats': Pages.ChatsPage,
    // 'error': [Pages.ErrorPage, {'code': 404, 'text': 'Не туда попали'}]
}

function navigate(page: string) {
    const app = document.querySelector('#app');

    const Component = pages[page];
    const component = new Component();

    app!.innerHTML = '';
    app?.append(component.getContent()!);

}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (event: MouseEvent) => {
    const page = (event.target as HTMLElement)?.dataset.page;

    if (page) {
        navigate(page);

        event.preventDefault();
        event.stopImmediatePropagation();
    }
});

document.addEventListener('submit', (event: SubmitEvent) => {
    const page = (event.target as HTMLFormElement)?.getAttribute('action');
    if (page) {
        navigate(page);

        event.preventDefault();
        event.stopImmediatePropagation();
    }
});
