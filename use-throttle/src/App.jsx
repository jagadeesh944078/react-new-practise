import { useEffect, useState } from "react";
import "./App.css";
import useThrottle from "./hooks/useThrottle";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const throttleResizeWindow = useThrottle(handleResize, 2000);

  useEffect(() => {
    window.addEventListener("resize", throttleResizeWindow);

    return () => {
      window.removeEventListener("resize", throttleResizeWindow);
    };
  }, []);

  return (
    <div>
      {windowSize.width} X {windowSize.height}
    </div>
  );
}

export default App;
