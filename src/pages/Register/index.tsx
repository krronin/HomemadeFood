import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import {
	IonBackButton,
    IonButton,
	IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
	IonContent,
	IonGrid,
	IonHeader,
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
    IonToolbar
} from "@ionic/react"

import { registerNewUser } from '../../utils/firebaseConfig'

import "./index.css"

const Register: React.FC = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
    });
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    function updateUserData(data: object) {
		setUserData({ ...userData, ...data })
    }

    async function registerUser() {
        setShowLoading(true);
        const user = await registerNewUser(userData.email, userData.password);
        if (user && user.code) {
            setToastMessage(user.message);
            history.push('/login');
        } else {
            setToastMessage('User successfully registered');
        }
        setShowLoading(false);
        setShowToast(true);
    }

	return (
		<IonPage id="register">
			<IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center">Register</IonTitle>
					<IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
            <IonContent>
                <IonLoading
                    isOpen={showLoading}
                    message={'Please wait...'}
                    spinner="circular"
                />
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                />
				<IonGrid fixed>
                    <IonRow className="ion-text-center ion-padding-top">
						<IonCol size="12">
							<IonCard>
								<IonCardContent>
                                    <IonList>
                                        <IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Firstname</IonLabel>
											<IonInput
												type="text"
												value={userData.firstname}
												onIonChange={e => updateUserData({ firstname: e.detail.value! })}
												required
											/>
                                        </IonItem>
                                        <IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Lastname</IonLabel>
											<IonInput
												type="text"
												value={userData.lastname}
												onIonChange={e => updateUserData({ lastname: e.detail.value! })}
												required
											/>
										</IonItem>
										<IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Email</IonLabel>
											<IonInput
												type="email"
												value={userData.email}
												onIonChange={e => updateUserData({ email: e.detail.value! })}
												required
											/>
                                        </IonItem>
                                        <IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Phone Number</IonLabel>
											<IonInput
												type="tel"
												value={userData.phone}
												onIonChange={e => updateUserData({ phone: e.detail.value! })}
												required
											/>
										</IonItem>
										<IonItem className="ion-margin-bottom">
											<IonLabel position="floating">Password</IonLabel>
											<IonInput
												type="password"
												value={userData.password}
												onIonChange={(e) =>
													updateUserData({ password: e.detail.value! })
												}
												required
											/>
										</IonItem>
									</IonList>
									<IonButton
										fill="solid"
										expand="block"
                                        className="ion-margin-top btn-register"
                                        onClick={() => registerUser()}>
										<IonText>Register</IonText>
									</IonButton>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

export default Register
