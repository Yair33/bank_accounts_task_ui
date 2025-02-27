import React, { useState } from "react";

function Account({ accountNumber, setAccountNumber }) {
  const [balance, setBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  // Get the API URL from the environment variable
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchBalance = async () => {
    const response = await fetch(`${apiUrl}/accounts/${accountNumber}/balance`);
    const data = await response.json();
    setBalance(data.balance);
  };

  const handleDeposit = async () => {
    const response = await fetch(`${apiUrl}/accounts/${accountNumber}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(depositAmount) }),
    });
    if (response.ok) {
      const data = await response.json();
      setBalance(data.balance);
      setDepositAmount(""); // clear input after deposit
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    const response = await fetch(`${apiUrl}/accounts/${accountNumber}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(withdrawAmount) }),
    });
    if (response.ok) {
      const data = await response.json();
      setBalance(data.balance);
      setWithdrawAmount(""); // clear input after withdraw
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Withdrawal failed");
    }
  };

  return (
    <div>
      <h1>Account: {accountNumber}</h1>
      <button onClick={fetchBalance}>Check Balance</button>
      {balance !== null && <p>Balance: ${balance}</p>}

      <div>
        <input
          type="number"
          step="0.01"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div>
        <input
          type="number"
          step="0.01"
          placeholder="Withdraw amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      <button onClick={() => setAccountNumber(null)}>Return to Main Page</button>
    </div>
  );
}

export default Account;
