"use client";

import React, { useState } from "react";
import { Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm VoteBuddy, your election assistant. How can I help you navigate the voting process today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simple neutral logic/mock response
    setTimeout(() => {
      let botResponse = "I'm sorry, I only have factual information about election processes. Could you please rephrase your question or ask about registration, eligibility, or polling locations?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("eligibility") || lowerInput.includes("can i vote")) {
        botResponse = "To be eligible to vote, you typically need to be at least 18 years old and a citizen of the country. Specific rules vary by location. Would you like to use our Eligibility Checker tool?";
      } else if (lowerInput.includes("register")) {
        botResponse = "Voter registration is the first step! You can usually register online, by mail, or in person at your local election office. Would you like me to find the registration link for your area?";
      } else if (lowerInput.includes("polling") || lowerInput.includes("where to vote")) {
        botResponse = "I can help you find your nearest polling station. Please provide your zip code or address, or use our Polling Locator tool on the dashboard.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-primary" 
        style={{ 
          position: "fixed", 
          bottom: "2rem", 
          right: "2rem",
          width: "60px", 
          height: "60px", 
          borderRadius: "var(--radius-full)", 
          fontSize: "1.5rem", 
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
          zIndex: 100
        }}
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass"
            style={{ 
              position: "fixed", 
              bottom: "6rem", 
              right: "2rem", 
              width: "380px", 
              height: "500px", 
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              zIndex: 101,
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--primary)", color: "white" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Bot size={20} />
                <div>
                  <h3 style={{ fontSize: "1rem", lineHeight: 1 }}>VoteBuddy AI</h3>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Online & Neutral</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "1.25rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ 
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem"
                }}>
                  <div style={{ 
                    padding: "0.75rem 1rem", 
                    borderRadius: "var(--radius-md)", 
                    background: msg.sender === "user" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                    color: msg.sender === "user" ? "white" : "inherit",
                    fontSize: "0.875rem",
                    border: msg.sender === "bot" ? "1px solid var(--glass-border)" : "none"
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: "0.7rem", opacity: 0.5, alignSelf: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "1rem", borderTop: "1px solid var(--glass-border)", display: "flex", gap: "0.75rem" }}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question..."
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--foreground)",
                  outline: "none",
                  fontSize: "0.875rem"
                }}
              />
              <button 
                onClick={handleSend}
                className="btn btn-primary" 
                style={{ padding: "0 1rem" }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
