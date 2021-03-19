import React, { useState } from "react"
import {
    IonBackButton,
	IonButton,
    IonButtons,
	IonCard,
	IonCardContent,
    IonCheckbox,
	IonCol,
	IonContent,
    IonDatetime,
	IonGrid,
	IonHeader,
	IonInput,
	IonItem,
    IonItemDivider,
    IonItemGroup,
	IonLabel,
	IonList,
	IonLoading,
	IonPage,
	IonRow,
    IonSelect,
    IonSelectOption,
	IonText,
    IonTitle,
	IonToast,
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react"

// Utils
import { getFoodCategories } from '../../utils/firebaseConfig'
import { ImagePicker } from "@ionic-native/image-picker"
// Styles
import "./index.css"

const FoodHome: React.FC = () => {
    const [postData, setPostData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        food: {
            category: "",
            price: "",
            quantitty: "",
            contents: "",
            photos: "",
            availableFrom: "",
            availableTill: ""
        },
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: ""
        },

    })
    const [isAddressAutofill, setIsAddressAutofill] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [foodCategories, setFoodCategories]: Array<any> = useState([]);

    function updatePostData(data: object) {
        setPostData({ ...postData, ...data });
    }

    function updateFoodDetails(data: object) {
        setPostData({ ...postData, food: { ...postData.food, ...data } });
    }

    function updateAddressDetails(data: object) {
        setPostData({ ...postData, address: { ...postData.address, ...data } });
    }

    function postFood() {
        setShowLoading(true);
        setToastMessage('Food successfully posted for orders');
        setTimeout(() => setShowLoading(false), 2000);
    }

    async function updateFoodCategories() {
        setShowLoading(true);
        const categories: Array<any> = await getFoodCategories();
        setFoodCategories(categories);
        setShowLoading(false);
    }

    function foodCategoryOptions() {
        if (foodCategories && foodCategories.length === 0) {
            return <IonSelectOption value="No categories available" disabled></IonSelectOption>
        }
        return foodCategories.map((category: any) => <IonSelectOption value={category.name} key={category.id}>{category.name}</IonSelectOption>)
    }
    useIonViewWillEnter(() => updateFoodCategories())

	return (
		<IonPage id="post-food">
			<IonHeader>
				<IonToolbar
					color="secondary"
					className="ion-text-center ion-text-capitalize"
                >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/dashboard" />
                    </IonButtons>
                    <IonTitle>Post Food for Orders</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonLoading
					isOpen={showLoading}
					message={"Please wait..."}
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
                                    {/* Personal details here */}
                                    <IonList>
                                        <IonItemDivider color="medium">Personal Details</IonItemDivider>
                                        <IonItemGroup>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Firstname</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.firstname}
                                                    onIonChange={(e) =>
                                                        updatePostData({ firstname: e.detail.value! })
                                                    }
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Lastname</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.lastname}
                                                    onIonChange={(e) =>
                                                        updatePostData({ lastname: e.detail.value! })
                                                    }
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Phone Number</IonLabel>
                                                <IonInput
                                                    type="tel"
                                                    value={postData.phone}
                                                    onIonChange={(e) =>
                                                        updatePostData({ phone: e.detail.value! })
                                                    }
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Email (optional)</IonLabel>
                                                <IonInput
                                                    type="email"
                                                    value={postData.email}
                                                    onIonChange={(e) =>
                                                        updatePostData({ email: e.detail.value! })
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
                                                    value={postData.address.line1}
                                                    onIonChange={e => updateAddressDetails({ line1: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Address line 2</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.address.line2}
                                                    onIonChange={e => updateAddressDetails({ line2: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">City</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.address.city}
                                                    onIonChange={e => updateAddressDetails({ city: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">State</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.address.state}
                                                    onIonChange={e => updateAddressDetails({ state: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Pincode</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.address.pincode}
                                                    onIonChange={e => updateAddressDetails({ pincode: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                        </IonItemGroup>
									</IonList>
                                    {/* Food details here */}
                                    <IonList>
                                        <IonItemDivider color="medium">Food Details</IonItemDivider>
                                        <IonItemGroup>
                                            <IonItem className="ion-margin-top ion-margin-bottom" lines="inset">
                                                <IonLabel>Category</IonLabel>
                                                <IonSelect
                                                    value={postData.food.category}
                                                    okText="Select"
                                                    cancelText="Cancel"
                                                    placeholder="Select food type"
                                                    onIonChange={e => updateFoodDetails({ category: e.detail.value! })}>
                                                    { foodCategoryOptions() }
                                                </IonSelect>
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Price</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.food.price}
                                                    onIonChange={e => updateFoodDetails({ price: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Quantity per person</IonLabel>
                                                <IonInput
                                                    type="number"
                                                    value={postData.food.quantitty}
                                                    onIonChange={e => updateFoodDetails({ quantitty: e.detail.value! })}
                                                    required
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Contents (optional)</IonLabel>
                                                <IonInput
                                                    type="text"
                                                    value={postData.food.contents}
                                                    onIonChange={e => updateFoodDetails({ contents: e.detail.value! })}
                                                />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Available from time (optional)</IonLabel>
                                                <IonDatetime
                                                    display-format="h:mm A"
                                                    picker-format="h:mm A"
                                                    value={postData.food.availableFrom}
                                                    onIonChange={e => updateFoodDetails({ availableFrom: e.detail.value! })} />
                                            </IonItem>
                                            <IonItem className="ion-margin-bottom" lines="inset">
                                                <IonLabel position="floating">Available till (optional)</IonLabel>
                                                <IonDatetime
                                                    display-format="h:mm A"
                                                    picker-format="h:mm A"
                                                    value={postData.food.availableTill}
                                                    onIonChange={e => updateFoodDetails({ availableTill: e.detail.value! })} />
                                            </IonItem>
                                            {/* <IonItem className="ion-margin-bottom">Select food photos input here</IonItem> */}
                                        </IonItemGroup>
									</IonList>
									<IonButton
										fill="solid"
										expand="block"
										className="ion-margin-top btn-post-food"
										onClick={() => postFood()}
									>
										<IonText>Post</IonText>
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

export default FoodHome
