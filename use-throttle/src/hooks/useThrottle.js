import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttleValue, setThrottleValue] = useState(value);
  //   const lastExecutionTime = useRef(Date.now());

  useEffect(() => {
    const handle = setTimeout(() => {
      setThrottleValue(value);
    }, delay);

    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);

  return value;
};

export default useThrottle;
