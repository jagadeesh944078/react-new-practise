import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Pill from "./components/Pill";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  // https://dummyjson.com/users/search?q=Jo

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.users))
        .catch((err) => console.error("error while loading data" + err));
    };
    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemoveUser = (user) => {};

  console.log(selectedUserSet, "select");

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
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="enter search name"
          />

          {/* Search Suggestions */}
          <ul className="suggestions-list">
            {suggestions?.map((user) =>
              !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img src={user.image} alt={user.username} />
                  <span>{user.username}</span>
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
