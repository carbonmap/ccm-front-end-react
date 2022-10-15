import { IonText } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

const DB_URL = process.env.REACT_APP_DATABASE_URL;

const FeaturedLocationEl: React.FC<PageProps> = (props) => {
  const [actionCount, setActionCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const { navigateDrawer } = useNavigateBottomDrawer();
  const dispatch = useDispatch();

  const selectEntity = (id: string) => {
    props.setInputVal("");
    navigateDrawer(`/${id}`);
    props.openMenu();
    dispatch({ type: "SET_LOCATION", payload: props.entity });
  };

  const getDataCount = async (entity: any, type: string) => {
    const response = await fetch(`${DB_URL}/${type}/${entity.id}.json`);

    const data = await response.json();

    return data;
  };

  const handleMetaData = useCallback(async () => {
    const actions = await getDataCount(props.entity, "entity_action");
    const posts = await getDataCount(props.entity, "entity_post");

    setActionCount(actions.actions.length);
    setPostCount(posts.posts.length);
  }, [props.entity]);

  useEffect(() => {
    handleMetaData();
  }, [props.entity, handleMetaData]);

  return (
    <div
      className="featured-el-selector"
      onClick={() => selectEntity(props.entity.id)}
    >
      <IonText className="featured-el-title" color="dark">
        {props.title}
      </IonText>
      <div className="featured-el-details">
        {actionCount > 0 ? (
          <IonText color="primary" className="featured-el-text">
            {actionCount} Actions
          </IonText>
        ) : null}
        {postCount > 0 ? (
          <IonText color="primary" className="featured-el-text">
            {postCount} Posts
          </IonText>
        ) : null}
      </div>
    </div>
  );
};

export default FeaturedLocationEl;
