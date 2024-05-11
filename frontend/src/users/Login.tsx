import { Card } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IUserInfo, useUserContext } from "../common/UserContext";
import { BackendAxios } from "../utils/BackendAxios";
import { UserCredentialsForm } from "./UserCredentialsForm";
import { IUserCredentials } from "./types";

const login = async (credentials: IUserCredentials): Promise<IUserInfo> => {
    const { data } = await BackendAxios.post<IUserInfo>("/login", credentials);

    return data;
};

export const Login = (): React.JSX.Element => {
    const { updateUserInfo } = useUserContext();

    const { error, mutate } = useMutation<
        IUserInfo,
        AxiosError,
        IUserCredentials
    >({
        mutationFn: login,
        onSuccess: (userInfo) => {
            updateUserInfo(userInfo);
        },
    });

    return (
        <Card
            sx={{
                backgroundColor: "#B5BAC1",
                height: "400px",
                margin: "150px auto",
                width: "480px",
            }}
        >
            <UserCredentialsForm
                error={error}
                submitHandler={(userCredentials) => mutate(userCredentials)}
            />
        </Card>
    );
};
