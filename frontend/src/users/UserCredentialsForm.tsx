import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { IUserCredentials } from "./types";

interface UserCredentialsFormProps {
    error: AxiosError | null;
    submitHandler: (credentials: IUserCredentials) => void;
}

export const UserCredentialsForm = (
    props: UserCredentialsFormProps,
): React.JSX.Element => {
    const { error, submitHandler } = props;

    const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
        username: "",
        password: "",
    });

    const handleCredentialsChange = ({
        target: { id, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setUserCredentials((prevUserCredentials) => ({
            ...prevUserCredentials,
            [id]: value,
        }));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (userCredentials.username && userCredentials.password) {
                    submitHandler(userCredentials);
                }
            }}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ padding: "96px" }}
            >
                <TextField
                    id="username"
                    label="Username"
                    required={true}
                    value={userCredentials.username}
                    onChange={handleCredentialsChange}
                />
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    required={true}
                    value={userCredentials.password}
                    onChange={handleCredentialsChange}
                    sx={{ margin: "16px 0 48px" }}
                />
                <Button
                    type="submit"
                    sx={{
                        ":hover": {
                            backgroundColor: "#5865F2",
                        },
                        backgroundColor: "#313338",
                        color: "#B5BAC1",
                        width: "fit-content",
                    }}
                >
                    LOGIN
                </Button>
                {error && (
                    <FormHelperText sx={{ color: "red", marginTop: "24px" }}>
                        {error.response?.data?.toString()}
                    </FormHelperText>
                )}
            </Grid>
        </form>
    );
};
