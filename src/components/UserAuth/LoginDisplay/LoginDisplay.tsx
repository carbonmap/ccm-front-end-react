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
interface InputProps {
  label: string;
  type: any;
  value: string;
  onChange: EventListener;
}

function validateEmail(email: string) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const FormInput: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <IonRow>
      <IonCol>
        <IonItem>
          <IonLabel position="floating">{label}</IonLabel>
          <IonInput type={type} value={value} onIonChange={onChange} />
        </IonItem>
      </IonCol>
    </IonRow>
  );
};

const LoginDisplay: React.FC<PageProps> = (props) => {
  const [userDetails, setUserDetails] = useState<any>({
    organisation: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const authDetails = useSelector((state: RootState) => state.auth);

  const loginData = {
    username: userDetails.email,
    email: userDetails.email,
    password: userDetails.password,
  };

  const fetchUserDetails = (auth: any) => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/carbonmap/current_user/`, {
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
            first_name: result?.first_name,
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
    fetch(`${process.env.REACT_APP_DATABASE_URL}/token-auth/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
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
    fetch(`${process.env.REACT_APP_DATABASE_URL}/carbonmap/users/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userDetails, username: userDetails.email }),
    })
      .then((res) => {
        loginUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    if (!userDetails.email) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    } else {
      setMessage("");
      setIsError(false);
    }
    if (validateEmail(userDetails.email) === false) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    } else {
      setMessage("");
      setIsError(false);
    }
    if (!userDetails.password || userDetails.password.length < 6) {
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

  return (
    <div style={{ padding: 10 }}>
      {!props.login ? (
        <>
          <FormInput
            label="Organisation"
            type="text"
            value={userDetails.organisation}
            onChange={(e: any) =>
              setUserDetails({ ...userDetails, organisation: e.detail.value! })
            }
          />
          <FormInput
            label="First Name"
            type="text"
            value={userDetails.first_name}
            onChange={(e: any) =>
              setUserDetails({ ...userDetails, first_name: e.detail.value! })
            }
          />
          <FormInput
            label="last_name"
            type="text"
            value={userDetails.last_name}
            onChange={(e: any) =>
              setUserDetails({ ...userDetails, last_name: e.detail.value! })
            }
          />
        </>
      ) : null}
      <FormInput
        label="Email"
        type="email"
        value={userDetails.email}
        onChange={(e: any) =>
          setUserDetails({ ...userDetails, email: e.detail.value! })
        }
      />
      <FormInput
        label="Password"
        type="password"
        value={userDetails.password}
        onChange={(e: any) =>
          setUserDetails({ ...userDetails, password: e.detail.value! })
        }
      />
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
        </IonCol>
      </IonRow>
    </div>
  );
};

export default LoginDisplay;