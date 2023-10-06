import WsTransport from "./core/wsTransport";

export type AppState = {
    error: string | null,
    user: User | null,
    activeChat: number | null,
    isOpenDialogChat: boolean,
    isOpenDialogAddUser: boolean,
    isOpenDialogRemoveUser: boolean,
    chats: Chat[],
    messages: Record<string, Message[]>,
    activeMessages: Message[],
    wsChats: Record<string, WsTransport>
}

export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

type LastMessage = {
    user: User,
    time: string,
    content: string
}

export type Chat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unreadCount: number,
    lastMessage: LastMessage | null
}

export type Message = {
    content: string,
    time: string,
    class: string
}
