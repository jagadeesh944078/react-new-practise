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
            type: "success",
            message: "File Sent Successfully",
            duration: 5000,
            animation: "pop",
          })
        }
      >
        Trigger Success
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
        Trigger Error
      </button>
      {NotificationComponent}
    </div>
  );
}

export default App;
