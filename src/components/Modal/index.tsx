import React from "react"
import { IonModal, IonContent } from "@ionic/react"
import './index.css';

interface Props {
    showModal: boolean,
    closeModal: any,
    classes: string,
    backdropDismiss: boolean
}

const Modal: React.FC<Props> = ({
    showModal,
    closeModal,
    children,
    classes,
    backdropDismiss
}) => {
	return (
        <IonModal isOpen={showModal} cssClass={['custom-modal', classes]} backdropDismiss={backdropDismiss}>
            <IonContent>
                { children }
            </IonContent>
        </IonModal>
	)
}

export default Modal