import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Automated Time Display</h1>
      <h3>CurrentTime : {currentTime.toLocaleTimeString()}</h3>
    </div>
  );
}

export default App;
