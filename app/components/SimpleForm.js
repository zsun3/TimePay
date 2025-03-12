import React, { useState, useEffect } from 'react';

const SimpleFormLocalStorage = ({username}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem(username);
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []); // Run only once on mount

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value (and stored):', inputValue);
    const storedValue = localStorage.getItem(username);
    if (storedValue != null) {
        localStorage.setItem(username, Number(storedValue) + Number(inputValue));
    } else {
        localStorage.setItem(username, inputValue);
    }

    const total = localStorage.getItem("total")
    if (total != null) {
        localStorage.setItem("total", Number(total) + Number(inputValue));
    } else {
        localStorage.setItem("total", localStorage.getItem(username));
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Value:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleFormLocalStorage;