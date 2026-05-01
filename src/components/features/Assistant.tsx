"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, X, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@/context/LocationContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { logger } from "@/services/logger";
import { AssistantMessage, UserProfile } from "@/types";

const INITIAL_SUGGESTIONS = [
  "Am I eligible to vote?",
  "How do I register?",
  "Where is my polling booth?",
  "What documents do I need?",
];

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "1",
      text: "Hello! I'm VoteBuddy, your intelligent election assistant. I can help you with eligibility, registration, and finding your polling station. What's on your mind?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const { location } = useLocation();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch profile for context-aware responses
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (err) {
        logger.error("Assistant failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = useCallback((userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response = "I'm sorry, I'm specialized in election-related queries. Could you ask about registration, eligibility, polling stations, or deadlines?";
    let quickActions: string[] = [];

    if (lowerInput.includes("eligible") || lowerInput.includes("can i vote")) {
      if (profile?.age && parseInt(profile.age) < 18) {
        response = `Based on your profile, you are ${profile.age} years old. You must be at least 18 to vote in general elections. However, you might be able to pre-register depending on your state.`;
      } else if (profile?.age) {
        response = `Yes! Since you are ${profile.age}, you meet the age requirement. You also need to be a citizen and meet residency requirements in ${profile.state || "your state"}.`;
      } else {
        response = "To be eligible, you must be 18+, a citizen, and a resident of your voting district. Would you like to check the Eligibility tool for a guided check?";
        quickActions = ["Check Eligibility Tool"];
      }
    } else if (lowerInput.includes("register") || lowerInput.includes("how to vote")) {
      if (profile?.registrationStatus === "active") {
        response = "Your profile shows you are already registered! That's great. The next step is preparing your documents or finding your polling station.";
        quickActions = ["What documents?", "Find polling booth"];
      } else {
        response = `Registration for ${profile?.state || "your area"} can usually be done online. Would you like the link to the official portal?`;
        quickActions = ["Official Registration Link", "Registration Checklist"];
      }
    } else if (lowerInput.includes("polling") || lowerInput.includes("where") || lowerInput.includes("location")) {
      if (location.city || profile?.city) {
        response = `I see you are in ${location.city || profile?.city}. You can find the nearest polling stations in our 'Polling Booths' tab. Most booths open at 7:00 AM.`;
        quickActions = ["Open Polling Locator"];
      } else {
        response = "I can help you find your booth! Please provide your zip code or city, or enable GPS in the Polling Booths tab.";
      }
    } else if (lowerInput.includes("document") || lowerInput.includes("id")) {
      response = `In ${profile?.state || "most states"}, you'll need a photo ID like a Driver's License or Passport. Some states also require proof of residency.`;
      quickActions = ["See Full Document List"];
    } else if (lowerInput.includes("deadline")) {
      response = "The General Municipal Election is on November 4, 2026. Registration typically closes 15-30 days before that. In your case, aim for mid-October!";
    }

    return { response, quickActions };
  }, [profile, location]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: AssistantMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    logger.trackAction("Assistant Query", { query: messageText });

    // Simulate thinking
    setTimeout(() => {
      const { response, quickActions } = generateResponse(messageText);
      const botMsg: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        quickActions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className="btn btn-primary" 
        style={{ 
          position: "fixed", bottom: "2rem", right: "2rem",
          width: "60px", height: "60px", borderRadius: "var(--radius-full)", 
          fontSize: "1.5rem", boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
          zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass"
            style={{ 
              position: "fixed", bottom: "6rem", right: "2rem", 
              width: "400px", height: "550px", borderRadius: "var(--radius-lg)",
              display: "flex", flexDirection: "column", zIndex: 101, overflow: "hidden"
            }}
          >
            {/* Header */}
            <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--primary)", color: "white" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.5rem", borderRadius: "50%" }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", lineHeight: 1 }}>VoteBuddy AI</h3>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>Guided Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close" style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "1.25rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ 
                    padding: "0.875rem 1rem", borderRadius: "var(--radius-md)", 
                    background: msg.sender === "user" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                    color: msg.sender === "user" ? "white" : "inherit",
                    fontSize: "0.875rem", border: msg.sender === "bot" ? "1px solid var(--glass-border)" : "none"
                  }}>
                    {msg.text}
                  </div>
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {msg.quickActions.map((action, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleSend(action)}
                          style={{ 
                            fontSize: "0.75rem", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-full)", 
                            background: "rgba(79, 70, 229, 0.1)", border: "1px solid rgba(79, 70, 229, 0.2)",
                            color: "var(--primary)", cursor: "pointer", transition: "all 0.2s"
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: "flex-start", padding: "0.5rem 1rem", background: "rgba(255, 255, 255, 0.05)", borderRadius: "var(--radius-md)", display: "flex", gap: "0.25rem" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "currentColor", opacity: 0.5 }} />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div style={{ padding: "0 1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "0.25rem" }}>Try asking:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {INITIAL_SUGGESTIONS.map((s, i) => (
                    <button key={i} onClick={() => handleSend(s)} style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--glass-border)", cursor: "pointer" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "1.25rem", borderTop: "1px solid var(--glass-border)", display: "flex", gap: "0.75rem" }}>
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend("")}
                placeholder="Type your question..."
                style={{
                  flex: 1, padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)", color: "inherit", outline: "none", fontSize: "0.875rem"
                }}
              />
              <button onClick={() => handleSend("")} className="btn btn-primary" style={{ padding: "0 1.25rem" }}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
