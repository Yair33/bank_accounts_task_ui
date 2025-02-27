import React, { useState } from "react";
import Home from "./components/Home";
import Account from "./components/Account";

function App() {
  const [accountNumber, setAccountNumber] = useState(null);

  return (
    <div>
      {!accountNumber ? (
        <Home setAccountNumber={setAccountNumber} />
      ) : (
        <Account accountNumber={accountNumber} setAccountNumber={setAccountNumber} />
      )}
    </div>
  );
}

export default App;
