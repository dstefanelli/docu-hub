import { NotificationMessage } from "../types/notification";

export function connectToNotifications(
  onMessage: (msg: NotificationMessage) => void
) {
  const wsUrl = import.meta.env.VITE_WS_URL;
  const socketUrl = `${wsUrl}/notifications`;
  const socket = new WebSocket(socketUrl);

  socket.addEventListener("open", () => {
    console.log("[WS] Connected to notifications");
  });

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data) as NotificationMessage;
    onMessage(data);
  });

  socket.addEventListener("close", () => {
    console.warn("[WS] Disconnected from notifications");
  });

  socket.addEventListener("error", (e) => {
    console.error("[WS] Error:", e);
  });

  return socket;
}
