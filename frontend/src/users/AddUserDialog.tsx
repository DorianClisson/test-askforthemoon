import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendAxios } from "../utils/BackendAxios";
import { UserCredentialsForm } from "./UserCredentialsForm";
import { IUserCredentials } from "./types";

const addUser = async (newCredentials: IUserCredentials): Promise<void> => {
    await BackendAxios.post<void>(`/addUser`, newCredentials);
    return;
};

interface AddUserDialogProps {
    isOpened: boolean;
    closeHandler: () => void;
}

export const AddUserDialog = (props: AddUserDialogProps): React.JSX.Element => {
    const { isOpened, closeHandler } = props;

    const { error, mutate } = useMutation<void, AxiosError, IUserCredentials>({
        mutationFn: addUser,
        onSuccess: () => {
            closeHandler();
        },
    });

    return (
        <Dialog
            open={isOpened}
            onClose={closeHandler}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "#B5BAC1",
                },
            }}
        >
            <Typography
                variant="h5"
                sx={{ position: "absolute", top: "16px", left: "120px" }}
            >
                Add a new user
            </Typography>
            <IconButton
                onClick={closeHandler}
                sx={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                }}
            >
                <CloseIcon />
            </IconButton>
            <UserCredentialsForm
                error={error}
                submitHandler={(newUserCredentials) =>
                    mutate(newUserCredentials)
                }
            />
        </Dialog>
    );
};
