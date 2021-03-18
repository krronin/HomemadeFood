import React, { useState }from "react";
import { Geolocation } from '@capacitor/core';


import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonToolbar
} from "@ionic/react";

// Utils
import { EnumCategory } from '../../utils/enums';

// Components
import Modal from '../../components/Modal';
import Location from '../../components/Location';
import CategoryList from '../../components/CategoryList';
import CardList from '../../components/CardList';

// Styles
import './index.css';
import { menuSharp } from "ionicons/icons";

const foodCategories: Array<string> = ['All', 'Food1', 'Food2', 'Food3', 'Food4', 'Food5', 'Food6', 'Food7', 'Food8', 'Food9'];
const results: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

interface Props { }

const Dashboard: React.FC<Props> = () => {
    const [category, setCategory] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({ name: 'current user location' });
    
    const [foodCategory, setFoodCategory] = useState(foodCategories[0]);
    const [items, setItems] = useState(results);

    const isShowModal = Boolean(category.length === 0);
    const categories = [EnumCategory.POST, EnumCategory.ORDER];

    async function getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
    }

    function didSelectCategory(category: string) {
        setCategory(category);
        setIsFetchingData(true);
    }

    function updateFoodCategory(foodCategory: string) {
        setFoodCategory(foodCategory);
    }
    
    return (
        <IonPage id="dashboard">
            <IonHeader>
                { !isShowModal &&
                    <IonToolbar color="secondary" className="ion-text-center ion-text-capitalize">
                        {/* <IonButton fill="clear" slot="start" onClick={async () => await menuController.toggle()}>
                            <IonIcon icon={menuSharp} size="large" color="light" />
                        </IonButton> */}
                        <Location
                            location={currentLocation} />
                        {/* <IonButtons slot="secondary">
                            <IonButton slot="icon-only">
                                <IonIcon icon={funnelSharp} />
                            </IonButton>
                        </IonButtons> */}
                    </IonToolbar>
                }
            </IonHeader>
            <IonContent>
                { isShowModal &&
                    <Modal
                        classes="categories"
                        showModal={true}
                        closeModal={() => { }}
                        backdropDismiss={false}>
                        <IonGrid>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <IonRow key={`category-${index}`}>
                                            <IonCol>
                                                <IonButton
                                                    expand="block"
                                                    size="large"
                                                    onClick={() => didSelectCategory(category)}>{category}</IonButton>
                                            </IonCol>
                                        </IonRow>
                                    );
                                })
                            }
                        </IonGrid>
                    </Modal>
                }
                { !isShowModal &&
                    <div>
                        <CategoryList
                            categories={foodCategories}
                            selected={foodCategory}
                            selectCategory={(category: string) => updateFoodCategory(category)} />
                        <IonItem className="results-count">
                            <IonText>Available from <strong>{results.length}</strong> homes</IonText>
                        </IonItem>
                        <CardList items={items}/>
                    </div>
                }
                <IonLoading
                    isOpen={isFetchingData}
                    onDidDismiss={() => setIsFetchingData(false)}
                    message={'Fetching your apetites...'}
                    duration={2000}
                    spinner="circular"
                />
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;