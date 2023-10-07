import ChatApi from "../api/chat";
import UserApi from "../api/user";
import { apiHasError } from "../utils/apiHasError";
import {transformChats, transformMessage} from "../utils/apiTransformers";
import WsTransport, {WsTransportEvents} from "../core/wsTransport";
import {Chat} from "../type";
import {MessageDTO} from "../api/type";
import cloneDeep from "../utils/cloneDeep";

const chatApi = new ChatApi();

const getChats = async () => {
    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }
    const transformedChats = transformChats(responseChat);
    getChatsMessages(transformedChats);

    return transformedChats;
}

const createChat = async (title: string) => {
    const response = await chatApi.create({title});
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({chats})
}

const addChatUser = async (userLogin: string, chatId: number) => {
    const userApi = new UserApi();
    const user = await userApi.search({
        login: userLogin
    });
    if (apiHasError(user)) {
        throw Error(user.reason);
    }
    if (!user.length) {
        throw Error('Пользователь не найден');
    }
    const userId = user[0].id;
    const response = await chatApi.addUser({
        users: [userId],
        chatId
    });
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({
        chats,
        isOpenDialogAddUser: false
    })
}

const removeChatUser = async (userLogin: string, chatId: number) => {
    const userApi = new UserApi();
    const user = await userApi.search({
        login: userLogin
    });
    if (apiHasError(user)) {
        throw Error(user.reason);
    }
    const userId = user[0].id;
    if (!userId) {
        throw Error('Пользователь не найден');
    }
    const response = await chatApi.removeUser({
        users: [userId],
        chatId
    });
    if (apiHasError(response)) {
        throw Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({
        chats,
        isOpenDialogRemoveUser: false
    })
}

const getChatsMessages = (chats: Chat[]): void => {
    const userId = window.store.getState().user?.id;
    if (!userId) return;

    chats.map((chat) => {
        getChatMessages(chat.id);
    });
}

const getChatMessages = async (chatId: number) => {
    const userId = window.store.getState().user?.id;
    const response = await chatApi.getToken(chatId.toString());
    if (apiHasError(response)) {
        throw Error(response.reason);
    }
    const token = response.token;
    const url = `/chats/${userId}/${chatId}/${token}`;
    const websocket = new WsTransport(url) as WsTransport;
    await websocket.connect();
    const wsChats = window.store.getState().wsChats;
    wsChats[chatId] = websocket;
    websocket.send({
        content: '0',
        type: 'get old',
    });
    websocket.on(WsTransportEvents.MESSAGE, (data: MessageDTO[] | MessageDTO) => {
        const messages = cloneDeep(window.store.getState().messages);
        const activeChat = window.store.getState().activeChat;
        if (!messages[chatId]) messages[chatId] = [];
        if (Array.isArray(data)) {
            for (let i in data) {
                messages[chatId].unshift(transformMessage(data[i]));
            }

        } else {
            messages[chatId].push(transformMessage(data));
        }
        const obj: Record<string, any> = {
            messages,
            wsChats
        }
        if (activeChat == chatId) {
            obj.activeMessages = messages[chatId];
        }
        window.store.set(obj)
    });
}

const sendMessage = async (chatId: number, message: string) => {
    const chat = window.store.getState().wsChats[chatId.toString()];
    chat.send({
        content: message,
        type: 'message'
    });
}

const changeActiveChat = (chatId: number) => {
    const messages = cloneDeep(window.store.getState().messages);
    if (!messages[chatId]) messages[chatId] = [];
    window.store.set({
        activeMessages: messages[chatId],
        activeChat: chatId
    });
}



export {
    createChat,
    getChats,
    addChatUser,
    removeChatUser,
    sendMessage,
    changeActiveChat
}
