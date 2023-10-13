import { BrowserRouter } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import jwt_decode from "jwt-decode";
import { useLocalStorage } from "@mantine/hooks";

import { setUserLoading, setCurrentUser } from "./features/user/userSlice";
import { setMyProfileLoading, getMyProfile } from "./features/profile/profileSlice";
import setAuthToken from "./utils/setAuthToken";
import theme from "./utils/theme";
import store from "./app/store";
import "./App.css";
import AppSkeleton from "./components/Layout/AppSkeleton";

if (localStorage.mjwt) {
  store.dispatch(setUserLoading(true));
  store.dispatch(setMyProfileLoading(true));
  const token = localStorage.mjwt;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getMyProfile());
}

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
            <Notifications />
            <AppSkeleton toggleColorScheme={toggleColorScheme} />
          </MantineProvider>
        </ColorSchemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
