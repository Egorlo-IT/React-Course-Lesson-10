import * as types from "./actionTypes";
import { auth } from "../services/firebase";

const signUpStart = () => ({
  type: types.SIGN_UP_START,
});

const signUpSuccess = (user) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: user,
});

const signUpError = (error) => ({
  type: types.SIGN_UP_ERROR,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginError = (error) => ({
  type: types.LOGIN_ERROR,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutError = (error) => ({
  type: types.LOGOUT_ERROR,
  payload: error,
});

export const getAlert = (state) => ({
  type: types.GET_ALERT,
  payload: state,
});

export const logoutInitiate = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch((error) => {
        console.log("error", error);
        dispatch(logoutError(error.toString()));
      });
  };
};

export const loginInitiate = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(loginError(error.toString()));
      });
  };
};

export const signUpInitiate = (displayName, email, password) => {
  return (dispatch) => {
    dispatch(signUpStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({ displayName });
        dispatch(signUpSuccess({ user }));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(signUpError(error.toString()));
      });
  };
};
