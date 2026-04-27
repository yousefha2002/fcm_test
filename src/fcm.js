import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export const printFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") return null;

    // 🔥 تأكد SW واحد فقط
    let registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    if (!registration) {
      registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
    }

    await navigator.serviceWorker.ready;

    // 🔥 مهم جدًا: انتظار استقرار SW
    await new Promise((r) => setTimeout(r, 1000));

    const token = await getToken(messaging, {
      vapidKey:
        "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A",
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (err) {
    console.error(err);
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