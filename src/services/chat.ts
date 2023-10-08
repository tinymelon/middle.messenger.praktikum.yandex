import ChatApi from "../api/chat";
import UserApi from "../api/user";
import { apiHasError } from "../utils/apiHasError";
import {transformChats, transformMessage} from "../utils/apiTransformers";
import WsTransport, {WsTransportEvents} from "../core/wsTransport";
import {Chat, Message} from "../type";
import {MessageDTO} from "../api/type";
import cloneDeep from "../utils/cloneDeep";

const chatApi = new ChatApi();

const getChats = async () => {
    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw new Error(responseChat.reason);
    }
    const transformedChats = transformChats(responseChat);
    getChatsMessages(transformedChats);

    return transformedChats;
}

const createChat = async (title: string) => {
    const response = await chatApi.create({title});
    if (apiHasError(response)) {
        throw new Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw new Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({chats})
}

const deleteChat = async (chatId: number) => {
    const response = await chatApi.delete({chatId});
    if (apiHasError(response)) {
        throw new Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw new Error(responseChat.reason);
    }

    const chats = await getChats();
    window.store.set({
        chats,
        activeChat: null
    })
}

const addChatUser = async (userLogin: string, chatId: number) => {
    const userApi = new UserApi();
    const user = await userApi.search({
        login: userLogin
    });
    if (apiHasError(user)) {
        throw new Error(user.reason);
    }
    if (user.length === 0) {
        throw new Error('Пользователь не найден');
    }
    const userId = user[0].id;
    const response = await chatApi.addUser({
        users: [userId],
        chatId
    });
    if (apiHasError(response)) {
        throw new Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw new Error(responseChat.reason);
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
        throw new Error(user.reason);
    }
    const userId = user[0].id;
    if (!userId) {
        throw new Error('Пользователь не найден');
    }
    const response = await chatApi.removeUser({
        users: [userId],
        chatId
    });
    if (apiHasError(response)) {
        throw new Error(response.reason);
    }

    const responseChat = await chatApi.getChats();
    if (apiHasError(responseChat)) {
        throw new Error(responseChat.reason);
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
        throw new Error(response.reason);
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
        const chats = cloneDeep(window.store.getState().chats);
        const activeChat = window.store.getState().activeChat;
        let message: Message;
        if (!messages[chatId]) messages[chatId] = [];
        if (Array.isArray(data)) {
            if (data.length === 0) {
                window.store.set({
                    gettingMessages: false,
                    noNewMessages: true
                })
                return;
            }
            for (let index in data) {
                messages[chatId].unshift(transformMessage(data[index]));
            }
            message = messages[chatId].at(-1) as Message;

        } else {
            message = transformMessage(data);
            messages[chatId].push(message);
        }
        //messages[chatId].reverse();
        const object: Record<string, any> = {
            messages,
            wsChats,
            gettingMessages: false,
            noNewMessages: false
        }
        const chat = chats.find((element) => {
            return element.id == chatId;
        });
        if (chat && chat.lastMessage) {
            chat.lastMessage.time = message.time;
            chat.lastMessage.content = message.content;
        }
        if (activeChat == chatId) {
            object.activeMessages = cloneDeep(messages[chatId]).reverse();
        } else if (chat && !message.isRead) {
            chat.unreadCount++;
        }
        object.chats = chats;
        window.store.set(object)
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
    const chats = cloneDeep(window.store.getState().chats);
    const chat = chats.find((element) => {
        return element.id == chatId;
    });
    if (chat) chat.unreadCount = 0;
    window.store.set({
        activeMessages: cloneDeep(messages[chatId]).reverse(),
        activeChat: chatId,
        chatScroll: 0,
        noNewMessages: false,
        chats
    });
}

const getOlderMessages = (scroll: number): void => {
    const state = window.store.getState();
    if (state.gettingMessages || state.noNewMessages) return;
    const messagesLength = state.activeMessages.length;
    const activeChat = state.activeChat;
    const chat = state.wsChats[activeChat!.toString()];
    window.store.set({
        gettingMessages: true,
        chatScroll: scroll
    })
    chat.send({
        content: messagesLength.toString(),
        type: 'get old',
    });
}



export {
    createChat,
    deleteChat,
    getChats,
    addChatUser,
    removeChatUser,
    sendMessage,
    changeActiveChat,
    getOlderMessages
}
