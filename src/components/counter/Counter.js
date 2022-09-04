import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_INCREMENT,
  GET_DECREMENT,
  GET_CLEAR,
} from "../../redux/actionTypes";

import "./Counter.css";

export default React.memo(function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <Container className="counter">
      <hr className="hr-style"></hr>
      <div className="counter-wrap">
        <p className="counter-text">Counter total: </p>
        <span className="counter-total">{count}</span>
      </div>
      <div className="button-group">
        <button
          onClick={() => dispatch({ type: GET_INCREMENT })}
          className="btn button-counter"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: GET_DECREMENT })}
          className="btn button-counter"
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: GET_CLEAR })}
          className="btn button-clear"
        >
          Clear
        </button>
      </div>
    </Container>
  );
});
