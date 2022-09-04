import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Moment from "react-moment";

import "./Chat.css";

const Chat = (props) => {
  const { id } = useParams();
  const dataFilter = props.messageList.filter((item) => item.chatId === +id);
  const chatList = props.listChat.filter((list) => list.id === +id);

  return (
    <Container className="chat">
      <h1 className="title">Chat listing with user: {chatList[0].name}</h1>

      {chatList && chatList.length > 0 && (
        <div className="chat-inner-wrap" key={chatList.id}>
          <List
            className="chat-list"
            sx={{
              width: "100%",
              maxWidth: 360,
              minWidth: 250,
              bgcolor: "background.paper",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={chatList[0].name} src="../../image/robot.gif" />
              </ListItemAvatar>

              <div className="list-chat">
                <ListItemText
                  primary={chatList[0].name}
                  secondary={
                    <>
                      <Moment format="DD.MM.YYYY HH:mm">{chatList.date}</Moment>
                    </>
                  }
                />
                {dataFilter.map((list) => (
                  <ul key={list.id}>
                    <li>
                      <b>{list.author}:</b> {list.text}
                    </li>
                  </ul>
                ))}
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      )}

      <Link className="link" to={"/"}>
        <HomeIcon className="icon-home" />
      </Link>
    </Container>
  );
};

export default Chat;
