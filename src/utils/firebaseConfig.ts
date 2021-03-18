import Firebase from "firebase"

const config = {
    apiKey: "AIzaSyBsqxyYqu-_eK62fAisPz6pZ4IkzHHWlRc",
    authDomain: "homemadefood-20145.firebaseapp.com",
    projectId: "homemadefood-20145",
    storageBucket: "homemadefood-20145.appspot.com",
    messagingSenderId: "943651886495",
    appId: "1:943651886495:web:06382757f1883999d759aa",
    measurementId: "G-2G6KDJXXVZ"
};

Firebase.initializeApp(config)

const Database = Firebase.firestore();

export async function registerNewUser(email: string, password: string) {
    return await Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => Firebase.auth().currentUser)
        .catch(error => error);
}

export async function login(email: string, password: string) {
    return await Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => Firebase.auth().currentUser)
        .catch(error => error);
}

export async function getFoodCategories() {
    let categories: Array<any> = [];
    await Database.collection("foodCategories").get()
        .then(querySnapshot => querySnapshot.forEach((doc: any) => categories.push(doc.data())))
        .catch(() => categories = []);
    return categories;
}
