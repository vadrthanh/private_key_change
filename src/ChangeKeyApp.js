import React, { useState } from "react";
import { ethers } from "ethers";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const { Wallet, TxType, AccountKeyType } = require("@kaiachain/ethers-ext");

function ChangeKeyApp() {
  const [status, setStatus] = useState("");
  const [oldPrivateKey, setOldPrivateKey] = useState(""); // Input for old private key
  const [walletAddress, setWalletAddress] = useState(""); // Input for wallet address
  const [newPrivateKey, setNewPrivateKey] = useState("");
  const [accountKey, setAccountKey] = useState("");
  const [showAccountKey, setShowAccountKey] = useState(false); // State for toggling account key visibility
  const [showPrivateKey, setShowPrivateKey] = useState(false); // State for toggling private key visibility

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleChangeKey = async () => {
    try {
      setStatus("Processing transaction...");

      // Validate inputs
      if (!oldPrivateKey || !walletAddress) {
        setStatus("Please provide both the old private key and wallet address.");
        return;
      }

      // Create a wallet using the manually entered old private key
      const provider = new ethers.providers.JsonRpcProvider("https://public-en.kairos.node.kaia.io");
      const oldWallet = new Wallet(oldPrivateKey, provider);
      console.log("Old Wallet Address:", oldWallet.address);
      console.log("Old private key:", oldWallet.privateKey);

      // Generate a new private key
      const newWallet = ethers.Wallet.createRandom();
      const newPrivateKey = newWallet.privateKey;
      console.log(`New Private Key: ${newPrivateKey}`);

      // Compute the new public key from the new private key
      const senderNewPub = ethers.utils.computePublicKey(newPrivateKey, true);
      console.log("New Public Key:", senderNewPub);

      // Construct the AccountUpdate transaction object (Kaia-specific structure)
      const updateTx = {
        type: TxType.AccountUpdate, // Ensure TxType.AccountUpdate is correct
        from: walletAddress, // Ensure this is a valid wallet address
        key: {
          type: AccountKeyType.Public, // Ensure AccountKeyType.Public is a valid type
          key: senderNewPub, // Ensure this key is computed correctly using ethers.utils.computePublicKey
        },
      };

      console.log("Transaction Object:", updateTx);

      // Send the transaction using the manually created wallet
      setStatus("Signing and sending transaction automatically...");
      const sentTx = await oldWallet.sendTransaction(updateTx);
      console.log("Transaction sent, hash:", sentTx.hash);

      // Wait for confirmation
      const receipt = await sentTx.wait();
      console.log("Transaction confirmed, receipt:", receipt);

      // Display the new private key and AccountKey to the user
      setNewPrivateKey(newPrivateKey);
      setAccountKey(`${newPrivateKey}0x00${walletAddress}`);
      setStatus("Key change successful!");
    } catch (err) {
      console.error("Error occurred during key change:", err);
      setStatus("Error: Key change failed.");
    }
  };

  return (
    <div className="app-container">
      <h1>Change Your Private Key</h1>

      {/* Input for old private key */}
      <div>
        <label>Old Private Key:</label>
        <input
          type="text"
          value={oldPrivateKey}
          onChange={(e) => setOldPrivateKey(e.target.value)}
          placeholder="Enter your old private key"
        />
      </div>

      {/* Input for wallet address */}
      <div>
        <label>Wallet Address:</label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter your wallet address"
        />
      </div>

      {/* Button to trigger key change */}
      <button onClick={handleChangeKey}>Change Your Key</button>
      <p>Status: {status}</p>

      {/* Display the AccountKey with toggle visibility button */}
      {accountKey && (
        <div className="output-box">
          <span className="output-text">Please Copy and Change This Key in your Wallet</span>
          <p>
            {showAccountKey ? accountKey : "••••••••••••••••"}
            <button className="toggle-button" onClick={() => setShowAccountKey(!showAccountKey)}>
              {showAccountKey ? <FaEyeSlash /> : <FaEye />}
            </button>
          </p>
          <button className="copy-button" onClick={() => copyToClipboard(accountKey)}>
            Copy AccountKey
          </button>
        </div>
      )}

      {/* Display the new PrivateKey with toggle visibility button */}
      {newPrivateKey && (
        <div className="output-box">
          <span className="output-text">PrivateKey:</span>
          <p>
            {showPrivateKey ? newPrivateKey : "••••••••••••••••"}
            <button className="toggle-button" onClick={() => setShowPrivateKey(!showPrivateKey)}>
              {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
            </button>
          </p>
          <button className="copy-button" onClick={() => copyToClipboard(newPrivateKey)}>
            Copy PrivateKey
          </button>
        </div>
      )}
    </div>
  );
}

export default ChangeKeyApp;
