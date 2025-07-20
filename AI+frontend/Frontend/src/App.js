import React, { useState, useRef, useEffect } from "react";
import DeepResearch from "./DeepResearch";

function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'research'
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    // Only block if neither chat nor (coinName and coinSymbol) are filled
    if (!(input.trim() || (coinName.trim() && coinSymbol.trim()))) return;

    // Build the messages array
    const newMessages = input.trim()
      ? [...messages, { role: "user", content: input }]
      : messages;

    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(1),
          coin_name: coinName,
          coin_symbol: coinSymbol
        })
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.summary }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: " + err.message }
      ]);
    }
    setInput(""); // Only clear the chat input
    setLoading(false);
  };

  const ChatInterface = () => (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column",
      height: "80vh",
      border: "1px solid #eee",
      borderRadius: 10,
      background: "#fafbfc"
    }}>
      <h2 style={{textAlign: "center"}}>RiskRobo Chat</h2>
      {/* Chat area and input */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        marginBottom: 8,
        background: "#fff",
        borderRadius: 8
      }}>
        {messages.slice(1).map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 8
            }}
          >
            <div
              style={{
                background: msg.role === "user" ? "#d1e7dd" : "#f1f1f1",
                color: "#222",
                padding: "10px 16px",
                borderRadius: 16,
                maxWidth: "75%",
                whiteSpace: "pre-wrap"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* All inputs and send button inside the form */}
      <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ fontSize: 13, marginBottom: 2 }}>Coin Name</label>
            <input
              type="text"
              value={coinName}
              onChange={e => setCoinName(e.target.value)}
              placeholder="e.g. Ethereum"
              style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", minWidth: 120 }}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label style={{ fontSize: 13, marginBottom: 2 }}>Coin Symbol</label>
            <input
              type="text"
              value={coinSymbol}
              onChange={e => setCoinSymbol(e.target.value)}
              placeholder="e.g. ETH"
              style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", minWidth: 80 }}
              required
            />
          </div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about any token, coin, or blockchain..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginRight: 8
            }}
            required
            disabled={loading}
          />
          <button
            type="submit"
            style={{
              padding: "0 24px",
              borderRadius: 8,
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold"
            }}
            disabled={
              loading ||
              (
                !(input.trim() || (coinName.trim() && coinSymbol.trim()))
              )
            }
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Header with tabs */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "20px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
            🤖 RiskRobo - Smart Contract Analysis Platform
          </h1>
          
          {/* Tab Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px"
          }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: activeTab === 'chat' ? "#007bff" : "#f8f9fa",
                color: activeTab === 'chat' ? "#fff" : "#333",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              💬 Chat Analysis
            </button>
            <button
              onClick={() => setActiveTab('research')}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: activeTab === 'research' ? "#007bff" : "#f8f9fa",
                color: activeTab === 'research' ? "#fff" : "#333",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              🔍 Deep Research
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ minHeight: "calc(100vh - 200px)" }}>
        {activeTab === 'chat' ? <ChatInterface /> : <DeepResearch />}
      </div>
    </div>
  );
}

export default App;