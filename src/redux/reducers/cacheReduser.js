import * as types from "../actionTypes";

const initialState = {
  count: 0,
  messageList: [],
  listChat: [],
  galleryCats: [],
  currentChatID: 1,
  loading: false,
  error: null,
  currentUser: null,
  showAlert: false,
};

export const cacheReduser = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.SET_CHAT_ID_FIRST:
      return {
        ...state,
        currentChatID: 1,
      };
    case types.GET_DECREMENT:
      return { ...state, count: state.count - 1 };
    case types.GET_CLEAR:
      return { ...state, count: 0 };
    case types.GET_INCREMENT_CHAT_ID:
      return {
        ...state,
        currentChatID: state.currentChatID + 1,
      };
    case types.ADD_CHAT_LIST:
      return { ...state, listChat: [...state.listChat, action.payload] };
    case types.ADD_MESSAGE:
      return { ...state, messageList: [...state.messageList, action.payload] };
    case types.REMOVE_CHAT:
      return { ...state, listChat: action.payload };
    case types.REMOVE_MESSAGE_LIST:
      return { ...state, messageList: action.payload };
    case types.GET_CATS:
      return {
        ...state,
        galleryCats: action.payload,
        loading: false,
      };
    case types.GET_CATS_LOADING:
      return { ...state, loading: true };
    case types.GET_CATS_ERROR:
      return { ...state, error: action.payload };
    case types.GET_CATS_CLEAR_ERROR:
      return { ...state, error: null };
    case types.LOGOUT_START:
    case types.LOGIN_START:
    case types.SIGN_UP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        showAlert: true,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        showAlert: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        showAlert: false,
      };
    case types.LOGIN_ERROR:
    case types.SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        showAlert: true,
      };
    case types.LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case types.GET_ALERT:
      return { ...state, showAlert: action.payload };
    case types.GET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
