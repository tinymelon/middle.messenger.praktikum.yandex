import HttpTransport from "../core/httpTransport";
import { APIError, ChatDTO, CreateChat } from "./type";

const chatApi = new HttpTransport('/chats');

export default class ChatApi {
    async create(data: CreateChat): Promise<void | APIError> {
        return chatApi.post<void>('/', {data})
    }

    async getChats(): Promise<ChatDTO[] | APIError > {
        return chatApi.get<ChatDTO[]>('')
    }
}
