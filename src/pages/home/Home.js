import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import {
  Alert,
  Box,
  Collapse,
  Container,
  styled,
  TextField,
  ListItem,
  Divider,
} from "@mui/material";
import TalkingRobot from "../../components/talking-robot/TalkingRobot";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import { getListChat } from "../../redux/store/selectors/getListChat";
import { getMessageList } from "../../redux/store/selectors/getMessageList";
import { getCurrentChatID } from "../../redux/store/selectors/getCurrentChatID";

import * as types from "../../redux/actionTypes";

import { getCurrentUser } from "../../redux/store/selectors/getCurrentUser";
import { getShowAlert } from "../../redux/store/selectors/getShowAlert";
import { getError } from "../../redux/store/selectors/getError";
import { getAlert } from "../../redux/actions";

import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError());
  const messageList = useSelector(getMessageList());
  const listChat = useSelector(getListChat());
  const currentChatID = useSelector(getCurrentChatID());
  const currentUser = useSelector(getCurrentUser());
  const showAlert = useSelector(getShowAlert());
  const [statusNewChat, setStatusNewChat] = useState(false);
  const [name, setName] = useState();
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);

  const elInputName = useRef(null);
  const elInputMessage = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm();

  const FormTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7c5b70",
        border: "2px solid #7c5b70",
      },
      "&:hover fieldset": {
        borderColor: "#7c5b70",
      },
    },
  });

  const calcId = (type) => {
    let res;
    switch (type) {
      case "mess": {
        return messageList.length !== 0 ? messageList.length + 1 : 1;
      }
      default:
        break;
    }
    return res;
  };

  const addChat = () => {
    setStatusNewChat(true);
    setName("");
    setMessage("");
    dispatch({ type: types.GET_INCREMENT_CHAT_ID });
    elInputMessage.current.focus();
    reset();
  };

  const removeChat = (id, uid) => {
    if (currentUser.uid === uid) {
      const filterChat = listChat.filter((list) => list.id !== +id);
      dispatch({ type: types.REMOVE_CHAT, payload: filterChat });
      const filterMessageList = messageList.filter(
        (list) => list.chatId !== +id
      );
      dispatch({ type: types.REMOVE_MESSAGE_LIST, payload: filterMessageList });
    }
  };

  const onSubmit = (data) => {
    setProgress(true);
    setName(data.nameUser);
    setMessage(data.textMessage);
    resetField("textMessage");
  };

  useEffect(() => {
    if (name?.trim() !== "" && message?.trim() !== "") {
      if (listChat.length === 0 && currentChatID === 1) {
        dispatch({
          type: types.ADD_CHAT_LIST,
          payload: {
            id: currentChatID,
            uid: currentUser.uid,
            name: name,
            date: new Date(),
          },
        });
      }
      if (statusNewChat) {
        dispatch({
          type: types.ADD_CHAT_LIST,
          payload: {
            id: currentChatID,
            uid: currentUser.uid,
            name: name,
            date: new Date(),
          },
        });
        setStatusNewChat(false);
      }

      dispatch({
        type: types.ADD_MESSAGE,
        payload: {
          id: calcId("mess"),
          uid: currentUser.uid,
          author: name,
          text: message,
          chatId: currentChatID,
        },
        calcId,
        setProgress,
      });
    }
    // eslint-disable-next-line
  }, [name, message]);

  useEffect(() => {
    if (listChat.length === 0 && currentChatID > 1) {
      dispatch({ type: types.SET_CHAT_ID_FIRST });
    }
    // eslint-disable-next-line
  }, [listChat, messageList]);

  return (
    <div className="home">
      <Container className="main-container" maxWidth="sm">
        <List
          className="chat-list"
          sx={{
            width: "100%",
            maxWidth: 360,
            minWidth: 250,
            bgcolor: "background.paper",
          }}
        >
          <Collapse className="collapse-custom" in={showAlert}>
            <Alert
              className="alert"
              severity={error ? "error" : "success"}
              onClick={() => {
                dispatch(getAlert(false));
              }}
            >
              {error ? error.toString() : "Successfully"}
            </Alert>
          </Collapse>
          {listChat && listChat?.length > 0 ? (
            listChat.map((chat) => (
              <div className="chat-wrap" key={chat.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={chat.name} src="../../image/robot.gif" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={
                      <React.Fragment>
                        <Moment format="DD.MM.YYYY HH:mm">{chat.date}</Moment>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <div
                  onClick={() => removeChat(chat.id, chat.uid)}
                  className="btn-remove"
                >
                  +
                </div>
                <div className="wrap-icons">
                  <Link className="link" to={"chat/" + chat.id}>
                    <ArticleIcon className="icon-open" />
                  </Link>
                </div>

                <Divider variant="inset" component="li" />
              </div>
            ))
          ) : (
            <div className="no-chat">No chat</div>
          )}
        </List>
        <Box
          className="box"
          sx={{
            bgcolor: "#fef6e4",
          }}
        >
          <h2 className="text">Ask the robot Max something:</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              inputRef={elInputName}
              className="input"
              label="Type your name"
              value={currentUser ? currentUser.displayName : "Type your name"}
              id="custom-css-outlined-input"
              name="nameUser"
              fullWidth
              {...register("nameUser", {
                required: "Name is required.",
              })}
              error={Boolean(errors.nameUser)}
              helperText={errors.nameUser?.message}
            />

            <FormTextField
              inputRef={elInputMessage}
              label="Type your message"
              id="custom-css-outlined-input"
              name="textMessage"
              className="input"
              fullWidth
              {...register("textMessage", {
                required: "Message is required.",
              })}
              error={Boolean(errors.textMessage)}
              helperText={errors.textMessage?.message}
            />

            <div className="group-btn">
              <button type="submit" className="btn btn-submit">
                SEND
              </button>
              <button
                onClick={addChat}
                type="button"
                className="btn btn-newchat"
              >
                NEW CHAT
              </button>
            </div>
          </form>
          <button type="button" className="btn btn-cats">
            <Link className="link" to={"cats/"}>
              <span className="text-btn">Click on this button to see cats</span>
              <SentimentVerySatisfiedIcon className="icon-smile" />
            </Link>
          </button>
          <TalkingRobot
            chat={messageList}
            progress={progress}
            currentChatID={currentChatID}
            uid={currentUser.uid}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
