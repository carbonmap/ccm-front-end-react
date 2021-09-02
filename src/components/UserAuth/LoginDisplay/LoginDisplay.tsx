import React, { useState } from 'react';
import { IonRow, IonCol, IonButton, IonInput, IonLabel, IonItem, IonText } from '@ionic/react';
import './LoginDisplay.css';

interface PageProps {
    switchDisplay: Function,
    login: boolean
}

function validateEmail(email: string) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

const LoginDisplay: React.FC<PageProps> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [iserror, setIserror] = useState<boolean>(false)

    const handleClick = async() => {
        if (!email) {
            setMessage("Please enter a valid email");
            setIserror(true);
            return;
        } else {
            setMessage("");
            setIserror(false);
        }
        if (validateEmail(email) === false) {
            setMessage("Please enter a valid email");
            setIserror(true);
            return;
        } else {
            setMessage("");
            setIserror(false);
        }
        if (!password || password.length < 6) {
            setMessage("Please enter a valid password");
            setIserror(true);
            return;
        } else {
            setMessage("");
            setIserror(false);
        }
    
        const loginData = {
            "email": email,
            "password": password
        }

        if(props.login) {
            fetch("https://reqres.in/api/login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then((res) => console.log(res))
            .catch(error => {
                console.log(error)
            }) 
        } else {
            fetch("https://reqres.in/api/register", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then((res) => console.log(res))
            .catch(error => {
                console.log(error)
            }) 
        }
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
                {iserror ?
                    <IonRow>
                        <IonText className="login-warn">{message}</IonText>
                    </IonRow>
                :
                    null
                }
                <IonRow>
                    <IonCol>
                        {/* <p style={{ fontSize: "small" }}>
                            By clicking LOGIN you agree to our <a href="#">Policy</a>
                        </p> */}
                        <IonButton expand="block" onClick={handleClick}>
                            {props.login ?
                                <p>Login</p>
                            :
                                <p>Register</p>
                            }
                        </IonButton>
                        <p style={{ fontSize: "medium", textAlign: 'center' }}>
                            {props.login ?
                                <span>Don't have an account yet?</span>
                            :
                                <span>Already have an account?</span>
                            }
                            {props.login ?
                                <span className="switch-login-display" onClick={() => props.switchDisplay()}>Sign up!</span>
                            :
                                <span className="switch-login-display" onClick={() => props.switchDisplay()}>Login</span>
                            }
                        </p>
                    </IonCol>
                </IonRow>
        </div>
    );
};

export default LoginDisplay;