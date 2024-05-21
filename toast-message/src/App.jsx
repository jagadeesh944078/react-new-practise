import "./App.css";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";

function App() {
  const { NotificationComponent, triggerNotification } =
    useNotification("bottom-right");
  return (
    <div>
      Notification Message
      <button
        onClick={() =>
          triggerNotification({
            type: "info",
            message: "Information Message",
            duration: 3000,
            animation: "pop",
          })
        }
      >
        Show Info
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "warning",
            message: "Warning Message",
            duration: 3000,
            animation: "pop",
          })
        }
      >
        Show Warning
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "File Sent Successfully",
            duration: 3000,
            animation: "pop",
          })
        }
      >
        Show Success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "File Sent Failed",
            duration: 3000,
            animation: "pop",
          })
        }
      >
        Show Error
      </button>
      {NotificationComponent}
    </div>
  );
}

export default App;
