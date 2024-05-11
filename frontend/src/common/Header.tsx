import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { AddUserDialog } from "../users/AddUserDialog";
import { useUserContext } from "./UserContext";

export const Header = (): React.JSX.Element => {
    const { userInfo } = useUserContext();

    return (
        <Box
            sx={{
                backgroundColor: "#383A40",
                color: "lightgrey",
                padding: "16px 0",
                position: "sticky",
                top: 0,
                zIndex: 2,
            }}
        >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                MyFantasticMoviesWebsite
            </Typography>
            {userInfo && (
                <Typography sx={{ position: "absolute", right: 64, top: 20 }}>
                    Welcome {userInfo.username}
                    <SettingsMenu />
                </Typography>
            )}
        </Box>
    );
};

const SettingsMenu = (): React.JSX.Element => {
    const { userInfo, updateUserInfo } = useUserContext();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const [addUserOpened, setAddUserOpened] = useState<boolean>(false);

    const handleAddUser = () => {
        setAddUserOpened(true);
        closeMenu();
    };

    const handleLogout = () => {
        updateUserInfo(null);
        closeMenu();
    };

    return (
        <>
            <IconButton
                onClick={openMenu}
                sx={{ top: "-2px", color: "lightgrey" }}
            >
                <SettingsIcon />
            </IconButton>
            <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
                {userInfo?.isAdmin && (
                    <MenuItem onClick={handleAddUser}>Add user</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            {userInfo?.isAdmin && (
                <AddUserDialog
                    isOpened={addUserOpened}
                    closeHandler={() => setAddUserOpened(false)}
                />
            )}
        </>
    );
};
