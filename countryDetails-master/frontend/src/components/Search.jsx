import React, { useState, useRef, useEffect } from "react";

const Search = ({ onSearch }) => {
  const [currencyCode, setCurrencyCode] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(currencyCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={currencyCode}
        onChange={(e) => setCurrencyCode(e.target.value)}
        placeholder="Enter currency code"
        ref={inputRef}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
