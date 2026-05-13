export default function ProductAccordions({ sel, qsBars, washItems, accOpen, toggleAcc }) {
  return (
    <>
      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleAcc('core')}>
          CORE FEATURES & FABRIC DETAILS <span className={`accordion-arrow ${accOpen.core ? 'open' : ''}`}>▼</span>
        </div>
        <div className="accordion-body" style={{ maxHeight: accOpen.core ? '500px' : '0' }}>
          <div className="feature-row"><span className="feature-label">FABRIC</span><span className="feature-value">100% French Terry Loopknit Cotton</span></div>
          <div className="feature-row"><span className="feature-label">FIT</span><span className="feature-value">{sel.fit || 'Oversized Fit'}</span></div>
          <div className="feature-row"><span className="feature-label">GSM</span><span className="feature-value">240 GSM</span></div>
          <div className="feature-row"><span className="feature-label">COLOUR</span><span className="feature-value">{sel.color}</span></div>
          <div className="feature-row"><span className="feature-label">PRINT</span><span className="feature-value">HD Silicon Puff, Screen</span></div>
        </div>
      </div>

      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleAcc('qs')}>
          QUALITY SCORECARD <span className={`accordion-arrow ${accOpen.qs ? 'open' : ''}`}>▼</span>
        </div>
        <div className="accordion-body" style={{ maxHeight: accOpen.qs ? '600px' : '0' }}>
          <div className="qs-sub">Based on 134 verified buyer responses</div>
          {qsBars.map(([label, score, pct]) => (
            <div className="qs-bar" key={label}>
              <div className="qs-bar-header"><span>{label}</span><span>{score}/10</span></div>
              <div className="qs-track"><div className="qs-fill" style={{ width: accOpen.qs ? `${pct}%` : '0%' }} /></div>
            </div>
          ))}
          <div className="qs-warn">⚠ 9% of buyers returned due to size mismatch — use the AI Recommender above before ordering</div>
        </div>
      </div>

      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleAcc('wash')}>
          WASH CARE GUIDE <span className={`accordion-arrow ${accOpen.wash ? 'open' : ''}`}>▼</span>
        </div>
        <div className="accordion-body" style={{ maxHeight: accOpen.wash ? '500px' : '0' }}>
          <div className="wash-grid">
            {washItems.map(([icon, label]) => (
              <div className="wash-item" key={label}><div className="wash-item-icon">{icon}</div><div className="wash-item-label">{label}</div></div>
            ))}
          </div>
          <div className="wash-warn">⚠ The HD Silicon Puff print can crack if ironed directly. Always place a cloth barrier or iron inside-out.</div>
        </div>
      </div>

      <div className="accordion">
        <div className="accordion-header" onClick={() => toggleAcc('ret')}>
          RETURN & FIT GUARANTEE POLICY <span className={`accordion-arrow ${accOpen.ret ? 'open' : ''}`}>▼</span>
        </div>
        <div className="accordion-body" style={{ maxHeight: accOpen.ret ? '800px' : '0' }}>
          <div className="return-grid">
            <div className="return-card covered"><div className="return-card-header">✓ WHAT WE COVER</div><div className="return-card-list">✓ Wrong size delivered<br />✓ Damaged on arrival<br />✓ Colour mismatch from listing<br />✓ Manufacturing defect<br />✓ Size exchange within 7 days</div></div>
            <div className="return-card notcovered"><div className="return-card-header">✕ NOT COVERED</div><div className="return-card-list">✕ Used or washed items<br />✕ Tags removed by buyer<br />✕ Personal colour preference<br />✕ Screen vs real colour variation<br />✕ Claims after 7 days of delivery</div></div>
          </div>
          <div className="return-guarantee"><div className="return-guarantee-header">🛡 FITCHECK FIT GUARANTEE (EXCLUSIVE)</div><div className="return-guarantee-body">If our AI recommends a size and it still doesn't fit — get instant store credit, no courier pickup needed for your first return. Every return makes your future recommendations smarter.</div></div>
        </div>
      </div>
    </>
  );
}
