import Handlebars from 'handlebars';
import * as Components from './components/';
import * as Partials from './partials';
import registerComponent from './core/registerComponent';
import Block from './core/block';
import { Store } from './core/store';
import { AppState } from './type';
import {initApp} from "./services/initApp";

declare global {
    interface Window {
        store: Store<AppState>;
    }

    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type Indexed = { [key: string]: any };
}

for (const [name, component] of Object.entries(Partials)) {
    Handlebars.registerPartial(name, component);
}

for (const [ name, component ] of Object.entries(Components)) {
    registerComponent(name, component as typeof Block);
}

Handlebars.registerHelper('ifEquals', (argument1, argument2, options) => ((argument1 == argument2 && argument1 != undefined) ? options.fn(this) : options.inverse(this)));
Handlebars.registerHelper('ifNotEquals', (argument1, argument2, options) => ((argument1 == argument2) ? options.inverse(this) : options.fn(this)));

const initState: AppState = {
    error: null,
    user: null,
    activeChat: null,
    isOpenDialogChat: false,
    isOpenDialogAddUser: false,
    isOpenDialogRemoveUser: false,
    gettingMessages: false,
    noNewMessages: false,
    chatScroll: 0,
    chats: [],
    messages: {},
    activeMessages: [],
    wsChats: {}
}
window.store = new Store<AppState>(initState);

document.addEventListener('DOMContentLoaded', () => initApp());
