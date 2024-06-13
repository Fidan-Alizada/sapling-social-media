import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCcOuKPODC6E-JXYhhDOYw75kSIIAkIf-U",
    authDomain: "social-media-13512.firebaseapp.com",
    projectId: "social-media-13512",
    storageBucket: "social-media-13512.appspot.com",
    messagingSenderId: "657276219658",
    appId: "1:657276219658:web:65464836bc4414720b0af3",
    measurementId: "G-D3TD0MHE7Z"
  };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
