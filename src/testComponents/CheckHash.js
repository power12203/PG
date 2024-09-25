import React, { useState } from "react";

const CheckHash = () => {
  const [hashValue, setHashValue] = useState("");
  const [message, setMessage] = useState("");

  const generateHash = async () => {
    if (!message) {
      alert("Message cannot be empty.");
      return;
    }

    try {
      const secretKey = process.env.REACT_APP_API_KEY;

      // Convert secretKey to an ArrayBuffer
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secretKey);
      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      // Convert message to an ArrayBuffer
      const messageData = encoder.encode(message);

      // Generate HMAC SHA-256 hash
      const signature = await crypto.subtle.sign("HMAC", key, messageData);

      // Convert the signature to a Base64 string
      const hashArray = Array.from(new Uint8Array(signature));
      const hashBase64 = btoa(String.fromCharCode(...hashArray));

      setHashValue(hashBase64);
    } catch (error) {
      console.error("Error generating hash:", error);
      alert("An error occurred while generating the hash.");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={generateHash}>Generate Hash</button>
      <div>
        <label htmlFor="checkHash">Hash Value:</label>
        <input
          type="text"
          id="checkHash"
          name="checkHash"
          value={hashValue}
          readOnly
        />
      </div>
    </div>
  );
};

export default CheckHash;
