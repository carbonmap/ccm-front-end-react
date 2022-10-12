import React, { useState } from 'react';
import { IonRow, IonCol, IonButton, IonInput, IonLabel, IonItem, IonText } from '@ionic/react';
import './LoginDisplay.css';
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../authSlice";
import { RootState } from "src/redux/reducers";
import { SET_CURRENT_USER } from "src/constants";

interface PageProps {
  switchDisplay: Function;
  login: boolean;
}

function validateEmail(email: string) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const LoginDisplay: React.FC<PageProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const loginData = {
    username: email,
    email: email,
    password: password,
  };

  const fetchUserDetails = (auth: any) => {
    fetch(`${process.env.REACT_APP_AUTH_URL}/carbonmap/current_user/`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${auth.token}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        dispatch({
          type: SET_CURRENT_USER,
          payload: {
            firstName: result?.first_name,
            lastName: result?.last_name,
            username: result?.username,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = () => {
    fetch(`${process.env.REACT_APP_AUTH_URL}/token-auth/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        // user details returned here after login
        const result = await res.json();
        dispatch(
          authSlice.actions.loginUser({
            token: result.token,
            user: result.user,
          })
        );
        fetchUserDetails(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerUser = () => {
    fetch(`${process.env.REACT_APP_AUTH_URL}/carbonmap/users/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        loginUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    } else {
      setMessage("");
      setIsError(false);
    }
    if (validateEmail(email) === false) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    } else {
      setMessage("");
      setIsError(false);
    }
    if (!password || password.length < 6) {
      setMessage("Please enter a valid password");
      setIsError(true);
      return;
    } else {
      setMessage("");
      setIsError(false);
    }

    if (props.login) {
      loginUser();
    } else {
      registerUser();
    }
  };

  const handleLogOut = () => {
    dispatch(authSlice.actions.logout());
  };

  return (
    <div style={{ padding: 10 }}>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating"> Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      {isError ? (
        <IonRow>
          <IonText className="login-warn">{message}</IonText>
        </IonRow>
      ) : null}
      <IonRow>
        <IonCol>
          <IonButton expand="block" onClick={handleClick}>
            {props.login ? <p>Login</p> : <p>Register</p>}
          </IonButton>
          <p style={{ fontSize: "medium", textAlign: "center" }}>
            {props.login ? (
              <span>Don't have an account yet?</span>
            ) : (
              <span>Already have an account?</span>
            )}
            {props.login ? (
              <span
                className="switch-login-display"
                onClick={() => props.switchDisplay()}
              >
                Sign up!
              </span>
            ) : (
              <span
                className="switch-login-display"
                onClick={() => props.switchDisplay()}
              >
                Login
              </span>
            )}
          </p>
          {/* {props.login ? (
            <p
              onClick={() => handleLogOut()}
              style={{
                textDecoration: "underline",
                textAlign: "center",
                color: "red",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Log Out
            </p>
          ) : null} */}
        </IonCol>
      </IonRow>
    </div>
  );
};

export default LoginDisplay;