export function initializeFirebase() {
  // Replace with actual Firebase config
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  };
  firebase.initializeApp(firebaseConfig);
}
