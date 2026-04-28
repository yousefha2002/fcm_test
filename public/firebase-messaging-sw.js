/* eslint-env serviceworker */
/* global importScripts, firebase, clients */
/* eslint-disable no-restricted-globals */

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyATF4vMFhrS4lEqTxBJUbCeFGECVR52ehI",
  authDomain: "lahent-dev.firebaseapp.com",
  projectId: "lahent-dev",
  storageBucket: "lahent-dev.appspot.com",
  messagingSenderId: "639249203537",
  appId: "1:639249203537:web:047d6ffa52bef76ad79370",
});

const messaging = firebase.messaging();

// 🔥 background notification
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "New Notification";

  self.registration.showNotification(title, {
    body: payload.notification?.body || "",
    icon: "/firebase-logo.png",
    badge: "/firebase-logo.png",
    data: payload.data || {},
  });
});

// 🔥 click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.click_action || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

// 🔥 clean activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await clients.claim();

      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    })()
  );
});