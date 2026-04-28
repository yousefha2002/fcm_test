import { getToken, onMessage } from "firebase/messaging";
import { initMessaging } from "./firebase";

const VAPID_KEY =
  "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A";

// 🔥 GET FCM TOKEN (Firebase handles SW automatically)
export const printFcmToken = async () => {
  try {
    const messaging = await initMessaging();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    console.log("🔥 FCM Token:", token);

    return token;
  } catch (err) {
    console.error("FCM Error:", err);
    return null;
  }
};

// 🔥 FOREGROUND MESSAGES
export const listenForegroundMessages = async () => {
  const messaging = await initMessaging();
  if (!messaging) return;

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