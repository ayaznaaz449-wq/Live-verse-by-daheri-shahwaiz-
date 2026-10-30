// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_XMBtMaAgXTQTYBPQFowibqaaHO9NJDE",
  authDomain: "liveverse-by-daheri.firebaseapp.com",
  projectId: "liveverse-by-daheri",
  storageBucket: "liveverse-by-daheri.firebasestorage.app",
  messagingSenderId: "371484439827",
  appId: "1:371484439827:web:84adaf075667149aefd6e6"
};

if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  window.lifeVerseFirebase = {
    app: firebase.app(),
    auth: firebase.auth(),
    db: firebase.firestore()
  };
}
