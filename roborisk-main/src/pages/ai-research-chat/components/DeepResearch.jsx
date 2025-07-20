import React, { useState, useRef, useEffect } from 'react';

const getRiskColor = (riskScore) => {
  if (riskScore >= 70) return 'bg-red-900 border-red-500 text-red-200';
  if (riskScore >= 50) return 'bg-yellow-900 border-yellow-500 text-yellow-200';
  if (riskScore >= 30) return 'bg-blue-900 border-blue-500 text-blue-200';
  return 'bg-green-900 border-green-500 text-green-200';
};

const DeepResearch = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [results, aiSummary]);

  const handleDeepResearch = async (e) => {
    e.preventDefault();
    if (!contractAddress.trim()) {
      setError('Please enter a contract address');
      return;
    }
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract_address: contractAddress, network: 'bsc' })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setResults(data);
      // Automatically fetch AI summary after results
      handleGetAISummary();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: "Provide a comprehensive analysis of this contract's security and investment potential" })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAiSummary(data.summary);
    } catch (err) {
      setError(`AI Summary Error: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col font-sans relative">
      {/* Results area, scrollable, fills space above input */}
      <div ref={resultsRef} className="flex-1 overflow-y-auto p-0 pb-32">
        {/* No heading here */}
        {error && (
          <div className="bg-red-900 border border-red-400 text-red-200 px-4 py-3 rounded mb-4 text-sm">{error}</div>
        )}
        {results && (
          <div className="rounded-lg shadow p-6 mb-6 bg-[#181818]">
            {/* AI Summary on top */}
            {aiLoading ? (
              <div className="bg-blue-900 border border-blue-400 text-blue-200 px-4 py-3 rounded mb-4 animate-pulse text-sm">🤖 Generating AI Summary...</div>
            ) : aiSummary && (
              <div className="bg-blue-900 border border-blue-400 text-blue-100 px-4 py-3 rounded mb-4 whitespace-pre-line text-sm">
                <h4 className="font-semibold mb-2 text-blue-200">AI Summary</h4>
                {aiSummary}
              </div>
            )}
            {/* Collapsible Risk/Details Section */}
            <button
              className="w-full py-2 rounded-lg font-bold text-base mb-4 bg-[#232b3b] text-blue-200 hover:bg-blue-800 transition-colors"
              onClick={() => setShowDetails(v => !v)}
            >
              {showDetails ? 'Hide Details ▲' : 'Show Risk & Details ▼'}
            </button>
            {showDetails && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-200">📊 Analysis Results for {results.contract_address}</h3>
                {/* Risk Score */}
                <div className={`p-4 rounded-lg mb-4 border-2 ${getRiskColor(results.risk_score)} text-sm`}>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">Risk Score: {results.risk_score}/100</span>
                    <span className="font-semibold">
                      {results.risk_score >= 70 ? '🔴 HIGH RISK' : results.risk_score >= 40 ? '🟡 MEDIUM RISK' : '🟢 LOW RISK'}
                    </span>
                  </div>
                </div>
                {/* Vulnerabilities */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-blue-200">🚨 Vulnerabilities</h4>
                  {results.vulnerability_flags && results.vulnerability_flags.length > 0 ? (
                    <ul className="list-disc pl-6">
                      {results.vulnerability_flags.map((flag, idx) => (
                        <li key={idx} className="text-red-300">{flag}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-200">✅ No vulnerabilities detected</p>
                  )}
                </div>
                {/* Liquidity Analysis */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-blue-200">💧 Liquidity Analysis</h4>
                  <pre className="bg-[#111] rounded p-2 text-sm text-blue-100 overflow-x-auto">{JSON.stringify(results.liquidity_data, null, 2)}</pre>
                </div>
                {/* Holder Analysis */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-blue-200">👥 Holder Analysis</h4>
                  <pre className="bg-[#111] rounded p-2 text-sm text-blue-100 overflow-x-auto">{JSON.stringify(results.holder_analysis, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Input fixed at bottom, styled like chat input, full width and responsive to sidebar */}
      <div className="flex w-full">
        <form onSubmit={handleDeepResearch} className="flex-1 bg-[#181818] border-t border-border p-4 flex flex-col gap-1 items-stretch" style={{boxShadow:'none'}}>
          <span className="text-xs text-blue-200 mb-1">write address here</span>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={contractAddress}
              onChange={e => setContractAddress(e.target.value)}
              placeholder="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
              className="w-full px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-0 focus:border-[#222] text-[15px] font-sans min-w-0"
              disabled={loading}
              style={{ boxShadow: 'none' }}
            />
            <button
              type="submit"
              disabled={loading || !contractAddress.trim()}
              className={`px-6 py-3 rounded-xl font-bold text-base transition-colors ${loading ? 'bg-gray-700 text-blue-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              style={{ boxShadow: 'none', minWidth: '110px' }}
            >
              {loading ? '🔍' : 'Go Deep'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeepResearch; 