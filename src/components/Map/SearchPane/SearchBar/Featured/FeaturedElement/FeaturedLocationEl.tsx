import { IonText } from "@ionic/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigateBottomDrawer } from "../../../Drawer/drawerUtils";

interface PageProps {
  title: string;
  actions: number;
  posts: number;
  index: number;
  entity: any;
  openMenu: Function;
  setInputVal: Function;
}

const FeaturedLocationEl: React.FC<PageProps> = (props) => {
  const { navigateDrawer } = useNavigateBottomDrawer();
  const dispatch = useDispatch();

  const selectEntity = (id: string) => {
    props.setInputVal("");
    navigateDrawer(`/${id}`);
    props.openMenu();
    dispatch({ type: "SET_LOCATION", payload: props.entity });
  };

  return (
    <div
      className="featured-el-selector"
      onClick={() => selectEntity(props.entity.id)}
    >
      <IonText className="featured-el-title" color="dark">
        {props.title}
      </IonText>
      <div className="featured-el-details">
        <IonText color="primary" className="featured-el-text">
          {props.actions} Actions
        </IonText>
        <IonText color="primary" className="featured-el-text">
          {props.posts} Posts
        </IonText>
      </div>
    </div>
  );
};

export default FeaturedLocationEl;
