import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RobotPicture from "../../image/robot.gif";

import "./TalkingRobot.css";

const TalkingRobot = (props) => {
  const progress = props.progress;

  const dataFilter = props.chat.filter(
    (item) => item.chatId === +props.currentChatID && item.uid === props.uid
  );

  return (
    <div className="talkingRobot">
      <div className="animation-wrap">
        {progress ? (
          <CircularProgress className="robot" />
        ) : (
          <img className="robot" src={RobotPicture} alt="robot" />
        )}
      </div>
      <div className="wrap">
        <p className="answer">
          Hey bro, I am robot Max! Ask me any question and I will answer! :)
        </p>

        {props?.chat?.length > 0 &&
          dataFilter.map((item) => (
            <p className="answer" key={item.id}>
              {item.author === "Robot" ? (
                <span className="mess-robot">
                  {item.author}: <i>{item.text}</i>
                </span>
              ) : (
                <span className="mess-guest">
                  {item.author}: <i>{item.text}</i>
                </span>
              )}
            </p>
          ))}
      </div>
    </div>
  );
};

export default TalkingRobot;
