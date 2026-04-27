import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export const printFcmToken = async () => {
  try {
    console.log("🔍 Checking permission...");
    const permission = await Notification.requestPermission();
    console.log("🔔 Permission:", permission);

    if (permission !== "granted") {
      console.log("❌ Permission denied");
      return null;
    }

    // 🔥 IMPORTANT: ensure SW is registered
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      console.log("📦 Service Worker registered:", reg);
    }

    // 🔍 debug existing SWs
    const regs = await navigator.serviceWorker.getRegistrations();
    console.log("🧩 All Service Workers:", regs);

    const token = await getToken(messaging, {
      vapidKey:
        "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A",
      forceRefresh: true, // 🔥 مهم جدًا
    });

    console.log("🔥 FCM TOKEN:", token);

    return token;
  } catch (err) {
    console.error("❌ FCM Error:", err);
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