/* eslint-env serviceworker */
/* global importScripts, firebase */
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

// 🔥 Background notifications
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "New Notification";

  self.registration.showNotification(title, {
    body: payload.notification?.body || "",
    icon: "/firebase-logo.png",
    data: payload.data || {},
  });
});