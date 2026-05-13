export function getAI(w) {
  if (w < 55) return { size: 'S', kept: 88, ret: 12 };
  if (w <= 67) return { size: 'M', kept: 91, ret: 9 };
  if (w <= 78) return { size: 'L', kept: 87, ret: 13 };
  return { size: 'XL', kept: 85, ret: 15 };
}

export default function AICalculator({ height, setHeight, weight, setWeight, ai }) {
  return (
    <div className="ai-box">
      <div className="ai-box-title">✦ AI Fit Recommender</div>
      <div className="ai-slider">
        <div className="ai-slider-header"><span>Height</span><span>{height} cm</span></div>
        <input type="range" min="150" max="190" value={height} onChange={e => setHeight(+e.target.value)} />
      </div>
      <div className="ai-slider">
        <div className="ai-slider-header"><span>Weight</span><span>{weight} kg</span></div>
        <input type="range" min="45" max="100" value={weight} onChange={e => setWeight(+e.target.value)} />
      </div>
      <div className="ai-result">
        Based on your measurements ({height}cm, {weight}kg), we recommend <strong>Size {ai.size}</strong> for this item.
      </div>
      <div className="ai-conf-track"><div className="ai-conf-fill" style={{ width: `${ai.kept}%` }} /></div>
      <div className="ai-conf-text">{ai.kept}% of similar shoppers kept this size</div>
      <div className="ai-stats" style={{ gridTemplateColumns: '1fr' }}>
        <div className="ai-stat kept">
          <div className="ai-stat-label">Kept this size</div>
          <div className="ai-stat-val">{ai.kept}%</div>
        </div>
      </div>
    </div>
  );
}
