import React, { useEffect, useState } from "react";

export default function FcmFullDebug() {
  const [data, setData] = useState({});

  const checkAll = async () => {
    // 1. permission
    const permission = Notification.permission;

    // 2. service workers
    const registrations = await navigator.serviceWorker.getRegistrations();

    const swRegistration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    // 🔥 NEW: detailed SW info
    const swDetails = await Promise.all(
      registrations.map(async (r) => ({
        scope: r.scope,
        scriptURL: r.active?.scriptURL,
      }))
    );

    // 3. check SW file exists
    let swFileStatus = "unknown";
    try {
      const res = await fetch("/firebase-messaging-sw.js", {
        cache: "no-store",
      });
      swFileStatus = res.status;
    } catch (e) {
      swFileStatus = "error";
    }

    // 4. browser info
    const userAgent = navigator.userAgent;

    // 5. origin
    const origin = window.location.origin;

    // 6. capabilities
    const notificationSupport = "Notification" in window;
    const swSupport = "serviceWorker" in navigator;

    setData({
      permission,
      swCount: registrations.length,
      swRegistered: !!swRegistration,
      swFileStatus,
      origin,
      userAgent,
      notificationSupport,
      swSupport,

      // 🔥 ADD THIS
      swDetails,
    });
  };

  useEffect(() => {
    checkAll();
  }, []);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "monospace",
        background: "#111",
        color: "#0f0",
      }}
    >
      <h2>🔥 FCM Debug Panel</h2>

      <button onClick={checkAll} style={{ marginBottom: 20 }}>
        Refresh Debug
      </button>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      <hr />

      <h3>🧠 Quick Meaning</h3>

      <ul>
        <li>permission = must be "granted"</li>
        <li>swRegistered = true لازم</li>
        <li>swFileStatus = 200 لازم</li>
        <li>swCount = ≥ 1</li>
        <li>swDetails = shows duplicate service workers</li>
      </ul>
    </div>
  );
}