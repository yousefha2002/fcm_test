import { useEffect } from "react";
import { printFcmToken } from "./fcm";

export default function App() {
  useEffect(() => {
    printFcmToken();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
  }, []);

  return <h1>FCM Test</h1>;
}