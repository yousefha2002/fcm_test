/* eslint-env serviceworker */
/* global importScripts, firebase */
/* eslint-disable no-restricted-globals */

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyATF4vMFhrS4lEqTxBJUbCeFGECVR52ehI",
  authDomain: "lahent-dev.firebaseapp.com",
  projectId: "lahent-dev",
  storageBucket: "lahent-dev.firebasestorage.app",
  messagingSenderId: "639249203537",
  appId: "1:639249203537:web:047d6ffa52bef76ad79370",
});

const messaging = firebase.messaging();

// 🔥 Background messages
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message:", payload);

  const notificationTitle =
    payload.notification?.title || "New Notification";

  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// 🔍 Debug SW install
self.addEventListener("install", () => {
  console.log("🔥 Firebase SW installed");
});

self.addEventListener("activate", () => {
  console.log("🔥 Firebase SW activated");
});