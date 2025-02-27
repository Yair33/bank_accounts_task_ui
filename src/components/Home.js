import React, { useState } from "react";

function Home({ setAccountNumber }) {
  const [inputAccountNumber, setInputAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  // Get the API URL from the environment variable
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/accounts/${inputAccountNumber}/balance`
    );
    if (response.ok) {
      setAccountNumber(inputAccountNumber);
    } else {
      alert("Account not found!");
    }
    setLoading(false);
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    const response = await fetch(`${apiUrl}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: 0 }),
    });
    if (response.ok) {
      const data = await response.json();
      setAccountNumber(data.account_number);
    } else {
      alert("Failed to create account!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Bank Account System</h1>
      <input
        type="text"
        placeholder="Enter Account Number"
        value={inputAccountNumber}
        onChange={(e) => setInputAccountNumber(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        Log In
      </button>
      <button onClick={handleCreateAccount} disabled={loading}>
        Create New Account
      </button>
    </div>
  );
}

export default Home;
