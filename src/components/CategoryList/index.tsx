import React from "react";
import { IonText, IonGrid, IonRow, IonCol } from "@ionic/react";

import './index.css';

interface Props {
    categories: Array<string>,
    selected: string,
    selectCategory: Function
}

const CategoryList: React.FC<Props> = ({ categories, selected, selectCategory }) => {

    return (
        <IonGrid id="category-list">
            <IonRow className="ion-justify-content-between ion-align-items-center ion-nowrap">
                {
                    categories.map(category => {
                        return (
                            <IonCol
                                key={category}
                                className={"ion-text-center " + (category === selected ? "selected" : "")}
                                onClick={() => selectCategory(category)}>
                                <IonText>{category}</IonText>
                            </IonCol>
                        )
                    })
                }
            </IonRow>
        </IonGrid>
    );
}

export default CategoryList
