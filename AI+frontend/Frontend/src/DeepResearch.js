import React, { useState } from 'react';

function DeepResearch() {
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleDeepResearch = async (e) => {
    e.preventDefault();
    
    if (!contractAddress.trim()) {
      setError('Please enter a contract address');
      return;
    }

    // Validate address format
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) {
      setError('Invalid address format. Must be 42 characters starting with 0x');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);
    setAiSummary(null);

    try {
      const response = await fetch('http://localhost:8000/scan-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contract_address: contractAddress,
          network: 'bsc'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAISummary = async () => {
    setAiLoading(true);
    setAiSummary(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: "Provide a comprehensive analysis of this contract's security and investment potential"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAiSummary(data);
    } catch (err) {
      setError(`AI Summary Error: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 70) return '#dc3545'; // Red
    if (riskScore >= 50) return '#ffc107'; // Yellow
    if (riskScore >= 30) return '#17a2b8'; // Blue
    return '#28a745'; // Green
  };

  // Utility to clean irrelevant lines from summary
  const cleanIrrelevantLines = (summary) => {
    if (!summary) return '';
    return summary
      .split('\n')
      .filter(line => !line.trim().startsWith('Irrelevant to crypto/finance:'))
      .join('\n');
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      fontFamily: "sans-serif",
      padding: "20px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        🔍 Deep Research - Find Similar Contracts
      </h2>
      
      <div style={{
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <form onSubmit={handleDeepResearch}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Contract Address:
            </label>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px"
              }}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !contractAddress.trim()}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#6c757d" : "#007bff",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "🔍 Researching..." : "🔍 Start Deep Research"}
          </button>
        </form>
      </div>

      {error && (
        <div style={{
          background: "#f8d7da",
          color: "#721c24",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      {results && (
        <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>
            📊 Analysis Results for {results.contract_address}
          </h3>
          
          {/* Risk Score */}
          <div style={{
            background: getRiskColor(results.risk_score) === '#dc3545' ? '#f8d7da' : 
                       getRiskColor(results.risk_score) === '#ffc107' ? '#fff3cd' : '#d1ecf1',
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: `2px solid ${getRiskColor(results.risk_score)}`
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
              Risk Assessment
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{
                background: getRiskColor(results.risk_score),
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                Risk Score: {results.risk_score}/100
              </span>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {results.risk_score >= 70 ? "🔴 HIGH RISK" : 
                 results.risk_score >= 40 ? "🟡 MEDIUM RISK" : "🟢 LOW RISK"}
              </span>
            </div>
          </div>

          {/* Comprehensive Analysis Summary */}
          <div style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            whiteSpace: "pre-line",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "1.5"
          }}>
            {results.analysis_summary}
          </div>

          {/* Detailed Analysis Sections */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "15px", color: "#333" }}>🔍 Detailed Analysis</h4>
            
            {/* Vulnerabilities Section */}
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff"
            }}>
              <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>🚨 Vulnerabilities</h5>
              {results.vulnerability_flags && results.vulnerability_flags.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {results.vulnerability_flags.map((flag, index) => (
                    <li key={index} style={{ marginBottom: "5px", color: "#dc3545" }}>
                      {flag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#28a745", margin: 0 }}>✅ No vulnerabilities detected</p>
              )}
            </div>

            {/* Liquidity Analysis Section */}
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff"
            }}>
              <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>💰 Liquidity Analysis</h5>
              {results.liquidity_data && results.liquidity_data.has_liquidity ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Pair Address:</strong> {results.liquidity_data.pair_address}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Token Reserve:</strong> {results.liquidity_data.token_reserve?.toFixed(2) || 'N/A'}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>BNB Reserve:</strong> {results.liquidity_data.bnb_reserve?.toFixed(4) || 'N/A'} BNB
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Total Liquidity:</strong> {results.liquidity_data.total_liquidity_bnb?.toFixed(4) || 'N/A'} BNB
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>USD Value:</strong> ~${results.liquidity_data.total_liquidity_usd?.toFixed(2) || 'N/A'}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>LP Total Supply:</strong> {results.liquidity_data.lp_total_supply?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Concentration Risk:</strong> {results.liquidity_data.concentration_risk ? "⚠️ Yes" : "✅ No"}
                    </p>
                    {results.liquidity_data.liquidity_locked && (
                      <div>
                        <p style={{ margin: "5px 0" }}>
                          <strong>Liquidity Locked:</strong> {results.liquidity_data.liquidity_locked.is_locked ? "🔒 Yes" : "🔓 No"}
                        </p>
                        <p style={{ margin: "5px 0" }}>
                          <strong>Locked Percentage:</strong> {results.liquidity_data.liquidity_locked.locked_percentage?.toFixed(2) || '0'}%
                        </p>
                        <p style={{ margin: "5px 0" }}>
                          <strong>Safety Score:</strong> {results.liquidity_data.liquidity_locked.liquidity_safety_score?.toFixed(2) || '0'}/100
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p style={{ color: "#ffc107", margin: 0 }}>⚠️ No liquidity found</p>
              )}
            </div>

            {/* Holder Analysis Section */}
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff"
            }}>
              <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>👥 Holder Analysis</h5>
              {results.holder_analysis && results.holder_analysis.total_holders ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Total Holders:</strong> {results.holder_analysis.total_holders}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Top 1 Holder:</strong> {results.holder_analysis.top_1_percentage?.toFixed(2) || 'N/A'}%
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Top 5 Holders:</strong> {results.holder_analysis.top_5_percentage?.toFixed(2) || 'N/A'}%
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Top 10 Holders:</strong> {results.holder_analysis.top_10_percentage?.toFixed(2) || 'N/A'}%
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Concentration Risk:</strong> {results.holder_analysis.concentration_risk ? "⚠️ Yes" : "✅ No"}
                    </p>
                  </div>
                  <div>
                    {results.holder_analysis.holders && results.holder_analysis.holders.length > 0 && (
                      <div>
                        <strong>Top Holders:</strong>
                        <div style={{
                          maxHeight: "100px",
                          overflowY: "auto",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          marginTop: "5px"
                        }}>
                          {results.holder_analysis.holders.map((holder, index) => (
                            <div key={index} style={{ marginBottom: "2px" }}>
                              {holder.address}: {holder.balance?.toLocaleString() || 'N/A'}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p style={{ color: "#6c757d", margin: 0 }}>Unable to analyze holder distribution</p>
              )}
            </div>

            {/* Contract Functions Section */}
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff"
            }}>
              <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>🔧 Contract Functions</h5>
              {results.contract_functions && results.contract_functions.length > 0 ? (
                <div>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Total Functions:</strong> {results.contract_functions.length}
                  </p>
                  <div style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    background: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "5px"
                  }}>
                    {results.contract_functions.map((func, index) => (
                      <div key={index} style={{ marginBottom: "2px" }}>• {func}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ color: "#6c757d", margin: 0 }}>No functions detected</p>
              )}
            </div>
          </div>

          {/* Raw JSON Data Toggle */}
          <div style={{ marginTop: "20px" }}>
            <details style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold", color: "#333" }}>
                📋 Show Full Analysis Details (JSON)
              </summary>
              <pre style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "4px",
                overflowX: "auto",
                fontSize: "12px",
                marginTop: "10px",
                whiteSpace: "pre-wrap"
              }}>
                {JSON.stringify(results, null, 2)}
              </pre>
            </details>
          </div>

          {/* AI Summary Section */}
          <div style={{ marginTop: "20px" }}>
            <div style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              background: "#fff"
            }}>
              <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>🤖 AI Analysis Summary</h4>
              
              {!aiSummary && (
                <div>
                  <p style={{ marginBottom: "15px", color: "#666" }}>
                    Get an AI-powered comprehensive analysis of this contract's security and investment potential.
                  </p>
                  <button
                    onClick={handleGetAISummary}
                    disabled={aiLoading}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "none",
                      background: aiLoading ? "#6c757d" : "#28a745",
                      color: "white",
                      fontWeight: "bold",
                      cursor: aiLoading ? "not-allowed" : "pointer",
                      fontSize: "14px"
                    }}
                  >
                    {aiLoading ? "🤖 Analyzing..." : "🤖 Get AI Summary"}
                  </button>
                </div>
              )}

              {aiSummary && (
                <div>
                  <div style={{
                    background: "#e8f5e8",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    border: "1px solid #28a745"
                  }}>
                    <h5 style={{ margin: "0 0 10px 0", color: "#155724" }}>
                      AI Analysis Results
                    </h5>
                    <div style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.6",
                      color: "#155724",
                      fontSize: "14px"
                    }}>
                      {cleanIrrelevantLines(aiSummary.summary)}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGetAISummary}
                    disabled={aiLoading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #28a745",
                      background: "transparent",
                      color: "#28a745",
                      fontWeight: "bold",
                      cursor: aiLoading ? "not-allowed" : "pointer",
                      fontSize: "12px"
                    }}
                  >
                    {aiLoading ? "🔄 Refreshing..." : "🔄 Refresh Analysis"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeepResearch; 