import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyATF4vMFhrS4lEqTxBJUbCeFGECVR52ehI",
  authDomain: "lahent-dev.firebaseapp.com",
  projectId: "lahent-dev",
  storageBucket: "lahent-dev.appspot.com",
  messagingSenderId: "639249203537",
  appId: "1:639249203537:web:047d6ffa52bef76ad79370",
};

const app = initializeApp(firebaseConfig);

export const initMessaging = async () => {
  const supported = await isSupported();

  if (!supported) {
    console.warn("FCM not supported");
    return null;
  }

  return getMessaging(app);
};