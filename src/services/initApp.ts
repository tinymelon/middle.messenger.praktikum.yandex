import Router from "../core/router";
import { getUser } from "./auth";
import { getChats } from "./chat";
import * as Pages from "../pages";


const initApp = async () => {
    const router = new Router('#app');
    router
        .use("/", Pages.LoginPage)
        .use("/sign-up", Pages.RegistrationPage)
        .use("/settings", Pages.ProfilePage)
        .use("/messenger", Pages.ChatsPage)
        .start();

    let me = null;
    try {
        me = await getUser();
    } catch (error) {
        router.go('/');
        return;
    }

    if (me) {
        window.store.set({user: me});
        //router.go('/messenger');
    } else {
        router.go('/');
    }
    return;
}

const initChatPage = async () => {
    const chats = await getChats();
    window.store.set({chats});
}

export {
    initApp,
    initChatPage
}
