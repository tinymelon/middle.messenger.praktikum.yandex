import HttpTransport from "../core/httpTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";

const authApi = new HttpTransport('/auth');

export default class AuthApi {
    async create(data: CreateUser): Promise<SignUpResponse> {
        return authApi.post<SignUpResponse>('/signup', {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async login(data: LoginRequestData): Promise<void | APIError> {
        return authApi.post('/signin', {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async me(): Promise<UserDTO | APIError> {
        return authApi.get('/user');
    }

    async logout(): Promise<void | APIError> {
        return authApi.post('/logout')
    }
}
