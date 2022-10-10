import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyATTTv196BSkbkcnlkt8naw78KUZIfMYyo',
    authDomain: 'vocobaka.firebaseapp.com',
    databaseURL:
        'https://vocobaka-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'vocobaka',
    storageBucket: 'vocobaka.appspot.com',
    messagingSenderId: '1007094563230',
    appId: '1:1007094563230:web:7618d0fac7807b5258168f',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
