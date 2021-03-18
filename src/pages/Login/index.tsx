import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCol,
	IonContent,
	IonGrid,
	IonIcon,
	IonImg,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
    IonLoading,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
    IonToast,
} from "@ionic/react"

import { logoFacebook, logoGoogle } from "ionicons/icons"
import { Facebook } from "@ionic-native/facebook"

import { login } from '../../utils/firebaseConfig'

// Styles
import "./index.css"

const Login: React.FC = () => {
    const [userData, setUserData] = useState({ username: "", password: "" })
    const [showLoading, setShowLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

	function updateUserData(data: object) {
		setUserData({ ...userData, ...data })
    }

    function onLoaderDismiss(event: any) {
        event.preventDefault();
        history.push('/dashboard');
    }

    function signInWithFacebook() {
        const permissions: Array<string> = ['public_profile', 'user_friends', 'email'];
        Facebook.login(permissions)
            .then((response) => {
                if (response.status === 'connected') {
                    // Facebook.getUserDetail(response.authResponse.userID)
                }
            });
    }

    async function loginUser() {
        setShowLoading(true);
        const user = await login(userData.username, userData.password);
        if (user && user.code) {
            setToastMessage(user.message);
        } else {
            setToastMessage('User successfully loggedIn');
            history.push('/dashboard')
        }
        setShowLoading(false);
        setShowToast(true);
    }

	return (
		<IonPage id="login-page">
            <IonContent>
                <IonLoading
                    isOpen={showLoading}
                    onWillDismiss={() => setShowLoading(false)}
                    onDidDismiss={e => onLoaderDismiss(e)}
                    message={'Please wait...'}
                    duration={3000}
                    spinner="circular"
                />
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                />
				<IonGrid fixed>
					<IonRow className="logo ion-align-items-center">
						<IonCol size="12">
							<IonImg
								src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
								alt="logo"
							/>
						</IonCol>
					</IonRow>
					<IonRow className="ion-text-center ion-padding-top">
						<IonCol size="12">
							<IonCard>
								<IonCardHeader>
									<IonTitle>Sign In</IonTitle>
								</IonCardHeader>
								<IonCardContent>
									<IonList>
										<IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Username</IonLabel>
											<IonInput
												type="email"
												value={userData.username}
												onIonChange={e => updateUserData({ username: e.detail.value! })}
												required
											/>
										</IonItem>
										<IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Password</IonLabel>
											<IonInput
												type="password"
												value={userData.password}
												onIonChange={e => updateUserData({ password: e.detail.value! })}
												required
											/>
										</IonItem>
									</IonList>
									<IonButton
										fill="solid"
										expand="block"
                                        className="ion-margin-top"
                                        onClick={() => loginUser()}>
										<IonText>Sign In</IonText>
									</IonButton>
									<IonButton
										fill="clear"
										expand="block"
										className="ion-margin-top">
										<IonText>Problem Signing in?</IonText>
                                    </IonButton>
                                    <IonButton
										fill="clear"
                                        expand="block"
                                        onClick={() => history.push('/register')}>
										<IonText>New User</IonText>
									</IonButton>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow className="ion-text-center ion-margin-top signup">
						<IonCol>
							<IonText color="dark">Register</IonText>
						</IonCol>
					</IonRow>
					<IonRow className="ion-text-center ion-padding-top social">
						<IonCol>
							<IonIcon icon={logoFacebook} color="primary" onClick={() => signInWithFacebook()}/>
							<IonIcon icon={logoGoogle} color="danger" />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Login
