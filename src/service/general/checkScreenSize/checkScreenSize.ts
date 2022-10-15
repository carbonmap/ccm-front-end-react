import { Dispatch } from "react";
import { Action } from "redux";
import { screenLg, screenSm } from "src/redux/actions";
import { mobileDeviceWidth } from "src/constants";

export function handleWindowSizeChange(dispatch: Dispatch<Action>) {
  if (window.innerWidth < mobileDeviceWidth) {
    dispatch(screenSm());
  } else {
    dispatch(screenLg());
  }
}
