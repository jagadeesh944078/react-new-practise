import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [count, setCount] = useState(50);
  const [isLoading, setIsloading] = useState(false);

  const element = [];
  for (let i = 1; i <= count; i++) {
    element.push(i);
  }

  const handleScroll = () => {
    // console.log("height:" + document.documentElement.scrollHeight);
    // console.log("Top:" + document.documentElement.scrollTop);
    // console.log("window:" + window.innerHeight);
    const { scrollHeight, scrollTop } = document.documentElement;
    if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
      setIsloading(true);
      setCount((prevCount) => prevCount + 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {element.map((num, index) => (
        <div key={index}>{num}</div>
      ))}
      {isLoading && "Loading...."}
    </div>
  );
};

export default InfiniteScroll;
