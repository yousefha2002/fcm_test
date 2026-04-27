import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export const printFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") return null;

    // ✅ 1. register SW مرة واحدة
    const registration = await navigator.serviceWorker.getRegistration("/firebase-messaging-sw.js")
    || await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    // ✅ 2. انتظر جاهزية SW
    await navigator.serviceWorker.ready;

    // ✅ 3. اربط SW مع getToken (مهم جدًا)
    const token = await getToken(messaging, {
      vapidKey:
        "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A",
      serviceWorkerRegistration: registration,
    });

    console.log("🔥 TOKEN:", token);

    return token;
  } catch (err) {
    console.error("FCM ERROR:", err);
    return null;
  }
};

// 🔥 Foreground messages (مهم جدًا)
export const listenForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message:", payload);

    const title = payload.notification?.title || "New Notification";
    const body = payload.notification?.body || "";

    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/firebase-logo.png",
      });
    }
  });
};