import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../style/Message.css";
import { contractMABI } from "../utils/constants";

const Message = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [messagesList, setMessagesList] = useState([]); // 用于存储所有链上的历史消息

  const contractAddress = "0x5b02060CB9f057D4b2D2C576faD2Dc8a5B78350c"; // 替换为实际的合约地址

  // Fetch the current message and history from the blockchain
  const fetchMessages = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractMABI, provider);

      const message = await contract.getMessage();
      setCurrentMessage(message || "No message stored yet");

      // 假设智能合约有一个获取历史消息的函数 getMessages()
      const messages = await contract.getMessages();
      setMessagesList(messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Update the message on the blockchain
  const updateMessage = async () => {
    if (!newMessage) return alert("Please enter a message!");
    setIsUpdating(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractMABI, signer);

      const tx = await contract.setMessage(newMessage);
      await tx.wait();

      alert("Message updated successfully!");
      setNewMessage("");
      fetchMessages(); // Refresh the current and historical messages
    } catch (error) {
      console.error("Error updating message:", error);
      alert("Failed to update the message.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Load the messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="message-board">
      <div className="left-panel">
        <h1 className="title">Blockchain Message Board</h1>

        <div className="current-message">
          <h3>Current Message:</h3>
          <p>{currentMessage}</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter new message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button
            className="update-button"
            onClick={updateMessage}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Post Message"}
          </button>
        </div>
      </div>

      <div className="right-panel">
        <h2>Message History</h2>
        <ul className="messages-list">
          {messagesList.length > 0 ? (
            messagesList.map((msg, index) => (
              <li key={index} className="message-item">
                {msg}
              </li>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Message;
