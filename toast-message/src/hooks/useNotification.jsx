import { useCallback, useEffect, useState } from "react";
import Notification from "../components/Notification";

const useNotification = (position = "top-right") => {
  const [notifications, setNotifications] = useState([]);

  let timer;

  const triggerNotification = useCallback((notificationProps) => {
    debugger;
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      {
        ...notificationProps,
        id,
        animation: notificationProps.animation || "fade-in",
      },
    ]);
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map((notification) =>
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, notification.duration)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications]);

  const NotificationComponent = notifications.length ? (
    <div className={`${position}`}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  ) : null;

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
