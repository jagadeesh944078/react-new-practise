import { useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Pill from "./components/Pill";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [cacheResult, setCacheResult] = useState({});
  const suggestionsListRef = useRef(null);

  const inputRef = useRef(null);
  // https://dummyjson.com/users/search?q=Jo

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      if (cacheResult[searchTerm]) {
        setSuggestions(cacheResult[searchTerm]);
        return;
      }
      setActiveSuggestion(0);
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.users);
          setCacheResult({ ...cacheResult, [searchTerm]: data.users });
        })
        .catch((err) => console.error("error while loading data" + err));
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const scrollToActiveSuggestion = () => {
    if (suggestionsListRef.current && activeSuggestion >= 0) {
      const suggestionHeight =
        suggestionsListRef.current.children[0].offsetHeight;
      suggestionsListRef.current.scrollTop =
        activeSuggestion * suggestionHeight;
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);
    const updatedEmails = new Set(selectedUsers);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
      scrollToActiveSuggestion();
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      handleSelectUser(suggestions[activeSuggestion]);
    }
  };

  console.log(cacheResult, "cacheResult");

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* Pill */}
        {selectedUsers.map((user) => (
          <Pill
            key={user.email}
            image={user.image}
            text={`${user.firstName}${user.lastName}`}
            onClick={() => handleRemoveUser(user)}
          />
        ))}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="enter search name"
            onKeyDown={handleKeyDown}
          />

          {/* Search Suggestions */}
          <ul className="suggestions-list" ref={suggestionsListRef}>
            {suggestions?.map((user, index) =>
              !selectedUserSet.has(user.email) ? (
                <li
                  className={index === activeSuggestion ? "active" : ""}
                  key={user.email}
                  onClick={() => handleSelectUser(user)}
                >
                  <img src={user.image} alt={user.username} />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
