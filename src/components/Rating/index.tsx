import React from "react";
import { IonIcon, IonItem, IonText } from "@ionic/react";

import './index.css';
import { starSharp } from "ionicons/icons";

interface Props {
    ratings: any
}
const Rating: React.FC<Props> = ({ ratings }) => {
    return (
        <IonItem id="ratings" lines="none">
            <IonIcon icon={starSharp} color="warning" />
            <IonText>{ratings.stars}/5 ({ratings.reviews})</IonText>
        </IonItem>
    );
}

export default Rating
