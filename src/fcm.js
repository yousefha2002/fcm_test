import { getToken, onMessage } from "firebase/messaging";
import { initMessaging } from "./firebase";

const VAPID_KEY =
  "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A";

// 🔹 get FCM token
export const printFcmToken = async () => {
  try {
    const messaging = await initMessaging();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    let registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    if (!registration) {
      registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
    }

    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);

    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// 🔹 foreground listener
export const listenForegroundMessages = async () => {
  const messaging = await initMessaging();
  if (!messaging) return;

  onMessage(messaging, async (payload) => {
    console.log("Foreground message:", payload);

    const title = payload.notification?.title || "New Notification";
    const body = payload.notification?.body || "";

    const registration = await navigator.serviceWorker.ready;

    registration.showNotification(title, {
      body,
      icon: "/firebase-logo.png",
      badge: "/firebase-logo.png",
      data: payload.data || {},
    });
  });
};