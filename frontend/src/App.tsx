import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./common/Header";
import { UserContextProvider, useUserContext } from "./common/UserContext";
import { Movies } from "./movies/Movies";
import { Login } from "./users/Login";

const queryClient = new QueryClient();

export const App = (): React.JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <Header />
                <AppContent />
            </UserContextProvider>
        </QueryClientProvider>
    );
};

const AppContent = (): React.JSX.Element => {
    const { userInfo } = useUserContext();

    // for this test purpose no need for routes lets keep it simple with either login or movies display

    if (!userInfo) {
        return <Login />;
    }

    return <Movies />;
};
