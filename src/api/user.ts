import HttpTransport from "../core/httpTransport";
import {SearchUser, UserSearchResponse} from "./type";

const userApi = new HttpTransport('/user');

export default class UserApi {
    async search(data: SearchUser): Promise<UserSearchResponse> {
        return userApi.post<UserSearchResponse>('/search', {
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
