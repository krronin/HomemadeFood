import { IonItem, IonText } from "@ionic/react";

import './index.css';

interface Props {
    location: any,
    // openMenu: Function
}

const Location: React.FC<Props> = ({ location }) => {
    return (
        <IonItem lines="none" className="user-location">
            <IonText className="ion-margin-start">{location.name}</IonText>
        </IonItem>
    );
}

export default Location;
