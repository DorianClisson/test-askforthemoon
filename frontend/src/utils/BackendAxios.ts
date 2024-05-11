import axios from "axios";
import { IUserInfo } from "../common/UserContext";

// axios instance so we do not need to rewrite baseURL each time we fetch our backend
export const BackendAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// userInfo can be null and is used here for logout
export const updateBackendAxiosAccessToken = (userInfo: IUserInfo): void => {
    BackendAxios.defaults.headers.common = userInfo
        ? {
              "x-access-token": userInfo.accessToken,
          }
        : {};
};
