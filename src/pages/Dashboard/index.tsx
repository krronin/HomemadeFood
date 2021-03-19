import React, { useEffect, useState }from "react";
import { useHistory } from "react-router-dom"

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
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";

// Utils
import { EnumCategory } from '../../utils/enums';
import { getFoodCategories } from '../../utils/firebaseConfig'

// Components
import Modal from '../../components/Modal';
import Location from '../../components/Location';
import CategoryList from '../../components/CategoryList';
import CardList from '../../components/CardList';

// Styles
import './index.css';
import { menuSharp } from "ionicons/icons";


const results: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

interface Props { }

const Dashboard: React.FC<Props> = () => {
    const actions = [EnumCategory.POST, EnumCategory.ORDER];
    const [userAction, setUserAction] = useState('');

    const [isFetchingData, setIsFetchingData] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({ name: 'current user location' });
    
    const [foodCategories, setFoodCategories]: Array<any> = useState([]);
    const [foodCategory, setFoodCategory]: any = useState(null);
    const [items, setItems] = useState(results);

    const history = useHistory();

    function didSelectCategory(action: string) {
        setUserAction(action);
        if (action === EnumCategory.ORDER) {
            setIsFetchingData(true);
            updateFoodCategories();
        } else {
            history.push('/foodHome');
        }
    }

    async function updateFoodCategories() {
        const categories: Array<any> = await getFoodCategories();
        setFoodCategories(categories);
        setFoodCategory(categories[0]);
        setIsFetchingData(false);
    }

    function resultsForOrder() {
        if (foodCategories && foodCategories.length) {
            return (
                <div className="results">
                    <CategoryList
                        categories={foodCategories}
                        selected={foodCategory}
                        selectCategory={(category: any) => setFoodCategory(category)} />
                    <IonItem className="results-count">
                        <IonText>Available from <strong>{results.length}</strong> homes</IonText>
                    </IonItem>
                    <CardList items={items}/>
                </div>
            )
        }
    }
    
    return (
        <IonPage id="dashboard">
            <IonHeader>
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
            </IonHeader>
            <IonContent>
                <Modal
                    classes="categories"
                    showModal={!userAction.length}
                    closeModal={() => { }}
                    backdropDismiss={false}>
                    <IonGrid>
                        {
                            actions.map((action, index) => {
                                return (
                                    <IonRow key={`category-${index}`}>
                                        <IonCol>
                                            <IonButton
                                                expand="block"
                                                size="large"
                                                onClick={() => didSelectCategory(action)}>{action}</IonButton>
                                        </IonCol>
                                    </IonRow>
                                );
                            })
                        }
                    </IonGrid>
                </Modal>
                {
                    resultsForOrder()
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