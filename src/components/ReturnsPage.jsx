export default function ReturnsPage({ showToast }) {
  return (
    <div className="returns-page">
      <h1 className="returns-title">Returns — Our Way vs The Old Way</h1>
      <div className="returns-stats">
        <div className="returns-stat"><div className="returns-stat-val">40–50%</div><div className="returns-stat-label">Return rate on old platforms</div></div>
        <div className="returns-stat"><div className="returns-stat-val">100%</div><div className="returns-stat-label">Surveyed users had returned before</div></div>
        <div className="returns-stat"><div className="returns-stat-val">#1 Reason</div><div className="returns-stat-label">Wrong size / fit in clothing</div></div>
      </div>
      <div className="returns-compare">
        <div className="returns-card old">
          <div className="returns-card-header">❌ Normal Platforms (Flipkart/Myntra)</div>
          {[['Login → navigate 4 screens', 'Confusing multi-step process'], ['Wait 3–5 days for courier pickup', 'Must stay home, no reschedule'], ['Refund takes 5–7 more days', 'Up to 12 days total, money stuck']].map(([t, s], i) => (
            <div className="returns-step" key={i}><div className="step-circle">{i + 1}</div><div><div className="step-title">{t}</div><div className="step-sub">{s}</div></div></div>
          ))}
        </div>
        <div className="returns-card new">
          <div className="returns-card-header">✓ FitCheck Returns</div>
          {[['1-tap return from order screen', 'Done in 10 seconds, no navigation'], ['Instant store credit applied', 'Use it immediately, no courier wait'], ['AI learns your size automatically', 'Next order recommendation improves']].map(([t, s], i) => (
            <div className="returns-step" key={i}><div className="step-circle">{i + 1}</div><div><div className="step-title">{t}</div><div className="step-sub">{s}</div></div></div>
          ))}
        </div>
      </div>
      <div className="returns-cta">
        <button className="returns-cta-btn" onClick={() => showToast('success', '✓ Store credit added instantly!')}>Try Instant Return</button>
      </div>
    </div>
  );
}
