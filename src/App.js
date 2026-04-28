import React, { useEffect, useState } from "react";
import { printFcmToken, listenForegroundMessages } from "./fcm";
import FcmFullDebug from "./FcmFullDebug";

export default function FcmButton() {
  const [token, setToken] = useState("");

  useEffect(() => {
    listenForegroundMessages();
  }, []);

  const handleGetToken = async () => {
    const t = await printFcmToken();
    if (t) setToken(t);
  };

  const handleCopy = async () => {
    if (!token) return;

    await navigator.clipboard.writeText(token);
    alert("Token copied!");
  };

  return (
    <div style={{ padding: 20 }}>
      <FcmFullDebug/>
      <button onClick={handleGetToken}>Get FCM Token</button>

      {token && (
        <div style={{ marginTop: 20 }}>
          <p style={{ wordBreak: "break-all" }}>{token}</p>
          <button onClick={handleCopy}>Copy Token</button>
        </div>
      )}
    </div>
  );
}