import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AIChatProPlus.css";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { assets } from "../../assets/assets";

const AIChatProPlus = () => {
  const apiKey = process.env.REACT_APP_OPENAI_KEY
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom automatically
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "आप एक मददगार सहायक हैं।" },
            { role: "user", content: input },
          ],
        },
        {
         headers: {
  "Authorization": `Bearer ${apiKey}`,
  "Content-Type": "application/json",
}
        }
      );

      const botText = response.data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText, time: new Date() },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "क्षमा करें, कुछ गलती हो गई।", time: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating Robot or Close Button */}
      <div className="ai-helper-icon" onClick={toggleChat}>
        {!open ? (
          <>
            <img src={assets.banner_image3} alt="AI Robot" className="robot-img" />
            <div className="help-text">AI Helper 🤖</div>
          </>
        ) : (
          <div className="close-icon"><IoMdCloseCircleOutline /></div>
        )}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="ai-chat-pro-plus open">
          <div className="chat-header">
            💬 Chat Assistant
          </div>

          <div className="chat-body">
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  <span className="text">{msg.text}</span>
                  <span className="time">
                    {msg.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {loading && <div className="message bot typing">Typing...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={input}
                placeholder="टाइप करें..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button onClick={handleSend}>↑</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatProPlus;
