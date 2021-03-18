import React from "react";
import { IonCard, IonCardHeader, IonCardContent, IonItem, IonList, IonCardTitle, IonCardSubtitle, IonText, IonImg, IonThumbnail } from "@ionic/react";

import Rating from '../Rating';
import { useHistory } from 'react-router-dom';

import './index.css';

interface Props {
    items: Array<string>
}

const CardList: React.FC<Props> = ({ items }) => {
    const history = useHistory();

    const ratings = {
        stars: Math.floor(Math.random() * 6),
        reviews: Math.floor(Math.random() * 100)
    };

    return (
        <IonList id="results">
            {
                items.map(item => {
                    return (
                        <IonItem key={item} lines="none">
                            <IonCard button onClick={() => history.push('/foodHome')}>
                                <IonCardHeader className="ion-no-padding">
                                    <img src="https://via.placeholder.com/800.png" alt="banner" className="logo-banner"/>
                                    <img src="https://via.placeholder.com/800.png" alt="thumbail" className="logo-thumbnail" />
                                    <IonCardTitle className="ion-padding-start">
                                        <IonText>Card Title</IonText>
                                        <Rating ratings={ratings}/>
                                    </IonCardTitle>
                                    <IonCardSubtitle className="ion-padding-start">Card Subtitle</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent className="ion-padding-start ion-margin-top">
                                    <IonText>
                                        Keep close to Nature's heart... and break clear away, once in awhile,
                                        and climb a mountain or spend a week in the woods. Wash your spirit clean
                                    </IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonItem>
                    );
                })
            }
        </IonList>
    );
}

export default CardList;
