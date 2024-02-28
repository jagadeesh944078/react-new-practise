import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastExecutionTime = useRef(Date.now());

  useEffect(() => {
    const handle = setTimeout(() => {
      const time = Date.now();
      const timeLastExecuted = time - lastExecutionTime.current;
      if (timeLastExecuted >= delay) {
        setThrottleValue(value);
        lastExecutionTime.current = time;
      }
    }, delay - (Date.now() - lastExecutionTime.current));

    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);

  return throttleValue;
};

export default useThrottle;
