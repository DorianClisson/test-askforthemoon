import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { updateBackendAxiosAccessToken } from "../utils/BackendAxios";

export type IUserInfo = {
    username: string;
    isAdmin: boolean;
    accessToken: string;
} | null;
interface IUserContext {
    userInfo: IUserInfo;
    updateUserInfo: (userInfo: IUserInfo) => void;
}
const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContextProvider = (
    props: UserContextProviderProps,
): React.JSX.Element => {
    const { children } = props;

    const [userInfo, setUserInfo] = useState<IUserInfo>(() => {
        const valueInLocalStorage = localStorage.getItem("userInfo");

        if (valueInLocalStorage) {
            const parsedValue = JSON.parse(valueInLocalStorage);
            updateBackendAxiosAccessToken(parsedValue);
            return parsedValue;
        }

        return null;
    });

    const updateUserInfo = (userInfo: IUserInfo) => {
        setUserInfo(userInfo);

        // store into localStorage
        if (userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
            localStorage.removeItem("userInfo");
        }

        // change axios headers to include accessToken
        updateBackendAxiosAccessToken(userInfo);
    };

    const userContextValue = useMemo(() => {
        return {
            userInfo,
            updateUserInfo,
        };
    }, [userInfo?.username, userInfo?.isAdmin, userInfo?.accessToken]);

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): IUserContext => {
    return useContext(UserContext) as IUserContext;
};
