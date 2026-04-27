import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const printFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("❌ Permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BKE3t8pmI3ehjmTfITQXI2MV7HMa3bmE5RZW6IXSjhnarRNtFlJGppbuLWbchtB3xtOpcpnY6n6gPFFM7foLA-A",
    });

    console.log("🔥 FCM TOKEN:");
    console.log(token);

    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};