import * as Firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAjyMTj7gZlq1vc6f3xI75ORkTW3VEQ03k",
  authDomain: "exchange-fb353.firebaseapp.com",
  projectId: "exchange-fb353",
  storageBucket: "exchange-fb353.appspot.com",
  messagingSenderId: "522387785996",
  appId: "1:522387785996:web:054d3d0182992cfe4a2129",
  measurementId: "G-Y0V0XJGR32",
};

if (!Firebase.getApps().length) {
  Firebase.initializeApp(firebaseConfig);
}

export default Firebase;
