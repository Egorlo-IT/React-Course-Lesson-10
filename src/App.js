import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Page404 from "./pages/page-404/Page404";
import Chat from "./pages/chat/Chat";
import UserProfile from "./pages/user-profile/UserProfile";
import Cats from "./pages/cats/Cats";
import { getListChat } from "./redux/store/selectors/getListChat";
import { useSelector } from "react-redux";
import { getMessageList } from "./redux/store/selectors/getMessageList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./hocs/PrivateRoute";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c5b70",
    },
  },
});

function App() {
  const listChat = useSelector(getListChat());
  const messageList = useSelector(getMessageList());

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/chat/:id"
                element={<Chat listChat={listChat} messageList={messageList} />}
              />
              <Route path="/user-profile/:id" element={<UserProfile />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
