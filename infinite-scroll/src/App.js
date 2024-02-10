import { useCallback, useRef, useState } from "react";
import "./App.css";
import { useBookSearch } from "./useBookSearch.";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  // return (
  //   <div>
  //     <input type="text" value={query} onChange={handleSearch} />

  //     {books.map((title, index) => {
  //       if (books.length === index + 1) {
  //         return <div ref={lastElementRef}>{title}</div>;
  //       } else {
  //         return <div>{title}</div>;
  //       }
  //     })}
  //     {loading && <div>Loading...</div>}
  //     {error && <div>Error</div>}
  //   </div>
  // );
  return (
    <div>
      <InfiniteScroll />
    </div>
  );
}

export default App;
