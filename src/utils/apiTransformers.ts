import {ChatDTO, MessageDTO, UserDTO} from "../api/type";
import constants from "../constants";
import {Chat, Message, User} from "../type";

const buildPathToResource = (resource: string | null) => {
    if(!resource) {
        return null;
    }

    return `${constants.HOST}/resources/${resource}`
}

export const transformUser = (data: UserDTO): User => {
    return {
        id: data.id,
        login: data.login,
        firstName: data.first_name,
        secondName: data.second_name,
        displayName: data.display_name,
        avatar: buildPathToResource(data.avatar),
        phone: data.phone,
        email: data.email,
    };
};


export const transformChats = (data: ChatDTO[]): Chat[] => {
    return data.map(chat => {
        let time = '';
        if (chat.last_message) {
            const date = new Date(chat.last_message.time);
            time = date.toLocaleString();
        }
        return {
            avatar: buildPathToResource(chat.avatar),
            id: chat.id,
            title: chat.title,
            unreadCount: chat.unread_count,
            lastMessage: chat.last_message ? {
                content: chat.last_message.content,
                time: time,
                user: {
                    id: chat.last_message.user.id,
                    login: chat.last_message.user.login,
                    firstName: chat.last_message.user.first_name,
                    secondName: chat.last_message.user.second_name,
                    displayName: chat.last_message.user.display_name,
                    avatar: chat.last_message.user.avatar,
                    phone: chat.last_message.user.phone,
                    email: chat.last_message.user.email,
                }
            } : null
        }
    });
}

export const transformMessage = (data: MessageDTO): Message => {
    const date = new Date(data.time);
    const time = date.toLocaleString();
    const currentUser = window.store.getState().user?.id
    return {
        content: data.content,
        isRead: data.is_read,
        time,
        class: (data.content.length < 150 ? 'short ' : '') + ((currentUser == data.user_id) ? 'sent' : 'received')
    };
}
