import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import {
    IonAvatar,
	IonBackButton,
    IonButton,
	IonButtons,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonCol,
	IonContent,
	IonGrid,
	IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
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
import { personOutline } from "ionicons/icons";

const Register: React.FC = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        avatarUrl: "",
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: "",
        }
    });
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isAddressAutofill, setIsAddressAutofill] = useState(false);

    function updateUserData(data: object) {
		setUserData({ ...userData, ...data })
    }

    function updateUserAddressDetails(data: object) {
        setUserData({ ...userData, address: { ...userData.address, ...data } });
    }

    function userAvatar() {
        if (userData && userData.avatarUrl.length) {
            return <img src="https://via.placeholder.com/100.png" alt="avatar" />
        }
        return <IonIcon icon={personOutline} size="large" color="medium" />
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
                            <IonAvatar>{ userAvatar() }</IonAvatar>
							<IonCard>
                                <IonCardContent>
                                    {/* Personal details here */}
                                    <IonList>
                                        <IonItemDivider color="medium">Personal Details</IonItemDivider>
                                        <IonItemGroup>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Firstname</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.firstname}
                                                    onIonChange={e => updateUserData({ firstname: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Lastname</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.lastname}
                                                    onIonChange={e => updateUserData({ lastname: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput
                                                    type="email"
                                                    value={userData.email}
                                                    onIonChange={e => updateUserData({ email: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Phone Number</IonLabel>
                                                <IonInput
                                                    type="tel"
                                                    value={userData.phone}
                                                    onIonChange={e => updateUserData({ phone: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
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
                                        </IonItemGroup>
									</IonList>
									{/* Address details here */}
                                    <IonList>
                                        <IonItemDivider color="medium">Address Details</IonItemDivider>
                                        <IonItemGroup>
                                            <IonItem lines="none" className="ion-margin-bottom">
                                                <IonLabel>Autofill address</IonLabel>
                                                <IonCheckbox
                                                    slot="start"
                                                    checked={isAddressAutofill}
                                                    onIonChange={e => setIsAddressAutofill(e.detail.checked)} />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Address line 1</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.address.line1}
                                                    onIonChange={e => updateUserAddressDetails({ line1: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Address line 2</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.address.line2}
                                                    onIonChange={e => updateUserAddressDetails({ line2: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">City</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.address.city}
                                                    onIonChange={e => updateUserAddressDetails({ city: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">State</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.address.state}
                                                    onIonChange={e => updateUserAddressDetails({ state: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Pincode</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={userData.address.pincode}
                                                    onIonChange={e => updateUserAddressDetails({ pincode: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                        </IonItemGroup>
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
