import ChatApi from "../api/chat";
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

const addChatUser = async (userId: number, chatId: number) => {
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
    window.store.set({chats})
}

const removeChatUser = async (userId: number, chatId: number) => {
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
    window.store.set({chats})
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
    websocket.on(WsTransportEvents.MESSAGE, (data: MessageDTO) => {
        const messages = cloneDeep(window.store.getState().messages);
        const activeChat = window.store.getState().activeChat;
        if (!messages[chatId]) messages[chatId] = [];
        messages[chatId].push(transformMessage(data));
        const activeMessages = (activeChat == chatId) ? messages[chatId] : [];
        window.store.set({
            messages,
            activeMessages,
            wsChats
        })
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
