export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type UserRequestData = {
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    email: string;
}

export type PasswordRequestData = {
    oldPassword: string,
    newPassword: string
}

export type ChangePassword = {
    oldPassword: string,
    newPassword: string
}

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
    password: string
}

export type CreateChat = {
    title: string
}

export type DeleteChat = {
    chatId: number
}

export type AddUser = {
    users: Array<number>,
    chatId: number
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}

export type MessageDTO = {
    id: number,
    content: string,
    time: string,
    type: string,
    user_id: number,
    is_read?: boolean,
    chat_id?: number
}

export type Token = {
    token: string
}

export type SearchUser = {
    login: string
}

export type UserSearchResponse = UserDTO[];
