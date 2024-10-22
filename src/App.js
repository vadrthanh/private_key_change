import React from "react";
import ChangeKeyApp from "./ChangeKeyApp";
import './App.css'; // Import the CSS for styling
import newlogo from './newlogo.jpg'; // Import the new logo

function App() {
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="logo-title-container">
          <img src={newlogo} alt="Kaia Logo" className="app-logo" />
          <h1>Kaia Key Manager</h1>
        </div>
        <p>Easily update your Kaia wallet's private key securely.</p>
      </header>

      {/* Main Content Section */}
      <div className="app-content">
        <ChangeKeyApp />
      </div>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>Powered by KaiaChain &amp; Ethereum. Ensure your private keys are managed securely.</p>
      </footer>
    </div>
  );
}

export default App;
