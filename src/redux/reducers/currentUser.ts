import { PayloadAction } from "@reduxjs/toolkit";
import { SET_CURRENT_USER } from "src/constants/actionTypes";

type State = {
  firstName: String | null | "";
  lastName: String | null | "";
  username: String | null | "";
};

const initState: State = {
  firstName: "",
  lastName: "",
  username: "",
};

const currentUserReducer = (
  state: State = initState,
  action: PayloadAction<{
    firstName: string;
    lastName: String;
    username: String;
  }>
) => {
  if (action.type === SET_CURRENT_USER) {
    state = action.payload;
    return action.payload;
  } else return null;
};

export default currentUserReducer;
