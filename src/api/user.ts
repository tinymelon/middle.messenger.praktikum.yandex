import HttpTransport from "../core/httpTransport";
import {APIError, SearchUser, UserSearchResponse} from "./type";
import {UserDTO, UploadAvatar, ChangePassword} from "./type";

const userApi = new HttpTransport('/user');

export default class UserApi {
    async changeProfile(data: UserDTO): Promise<UserDTO> {
        return userApi.put<UserDTO>('/profile', {
           data,
           headers: { 'Content-Type': 'application/json' }
        });
    }

    async changeAvatar(data: UploadAvatar): Promise<UserDTO> {
        return userApi.put<UserDTO>('/profile/avatar', {
            data,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async changePassword(data: ChangePassword): Promise<void | APIError> {
        return userApi.put<void>('/password', {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async search(data: SearchUser): Promise<UserSearchResponse> {
        return userApi.post<UserSearchResponse>('/search', {
            data,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
