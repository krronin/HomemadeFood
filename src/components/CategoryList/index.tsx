import React from "react";
import { IonText, IonGrid, IonRow, IonCol } from "@ionic/react";

import './index.css';

interface Props {
    categories: Array<any>,
    selected: any,
    selectCategory: Function
}

const CategoryList: React.FC<Props> = ({
    categories,
    selected,
    selectCategory
}) => {

    const selectedCategory = selected ? selected : categories[0];
    return (
        <IonGrid id="category-list">
            <IonRow className="ion-justify-content-between ion-align-items-center ion-nowrap">
                {
                    categories.map((category: any, index: number) => {
                        return (
                            <IonCol
                                key={category.id}
                                className={"ion-text-center " + (category.id === selectedCategory.id ? "selected" : "")}
                                onClick={() => selectCategory(category)}>
                                <IonText>{category.name}</IonText>
                            </IonCol>
                        )
                    })
                }
            </IonRow>
        </IonGrid>
    );
}

export default CategoryList
