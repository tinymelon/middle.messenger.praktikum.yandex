import UserApi from '../api/user';
import {UserDTO, UserRequestData, PasswordRequestData} from '../api/type';
import { apiHasError } from '../utils/apiHasError'
import {transformUser} from '../utils/apiTransformers';
import merge from "../utils/merge";
import {User} from "../type";

const userApi = new UserApi();

const changeProfileData = async (data: UserRequestData) => {
    const response = await userApi.changeProfile(data);
    if (apiHasError(response)) {
        throw new Error(response.reason)
    }
    const responseUser = transformUser(response as UserDTO);
    const store = window.store.getState();
    const newUser = merge(store.user as Indexed, responseUser as Indexed) as User;
    window.store.set({
        user: newUser
    });
}

const changeProfilePassword = async (data: PasswordRequestData) => {
    const response = await userApi.changePassword(data);
    if (apiHasError(response)) {
        throw new Error(response.reason)
    }
}

const changeProfileAvatar = async (data: FormData) => {
    const response = await userApi.changeAvatar(data);
    if (apiHasError(response)) {
        throw new Error(response.reason)
    }
    const responseUser = transformUser(response as UserDTO);
    const store = window.store.getState();
    const newUser = merge(store.user as Indexed, responseUser as Indexed) as User;
    window.store.set({
        user: newUser
    });
}

export {
    changeProfileData,
    changeProfilePassword,
    changeProfileAvatar
}
