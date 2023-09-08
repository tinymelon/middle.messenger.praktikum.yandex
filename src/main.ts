import Handlebars from 'handlebars';
import * as Components from './components/';
import * as Pages from './pages/';

type PagesObject = {
    [key: string]: [string, Record<string, any>?];
};

const pages: PagesObject = {
    'login': [Pages.LoginPage],
    'registration': [Pages.RegistrationPage],
    //'profile': [Pages.ProfilePage],
    //'chats': [Pages.ChatsPage],
    //'error': [Pages.ErrorPage]
}


Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page: string): void {
    const [source, args] = pages[page];

    document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(source)(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));
