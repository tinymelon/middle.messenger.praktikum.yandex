import HttpTransport from "../core/httpTransport";
import { APIError, ChatDTO, CreateChat, DeleteChat, AddUser, Token } from "./type";

const chatApi = new HttpTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat): Promise<void | APIError> {
        return chatApi.post<void>('/', {
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async delete(data: DeleteChat): Promise<void | APIError> {
        return chatApi.delete<void>('/', {
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async addUser(data: AddUser): Promise<void | APIError> {
        return chatApi.put<void>('/users', {
            data,
            headers: { 'Content-Type': 'application/json' }
        }).then((data) => {
            console.log(data);
        });
    }

    async removeUser(data: AddUser): Promise<void | APIError> {
        return chatApi.delete<void>('/users', {
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async getChats(): Promise<ChatDTO[] | APIError > {
        return chatApi.get<ChatDTO[]>('')
    }

    async getToken(chatId: string): Promise<Token | APIError> {
        return chatApi.post<Token>(`/token/${chatId}`)
    }
}
