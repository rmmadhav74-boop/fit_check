export default function ReviewsSection({ activeFilter, toggleFilter, hideFake }) {
  return (
    <div className="reviews-section">
      <div className="reviews-heading">Customer Reviews</div>
      <div className="reviews-stars-row">
        <span className="stars">★★★★☆</span>
        <span className="rating">4.3</span>
        <span className="count">(127 reviews)</span>
      </div>
      <div className="filter-pills">
        <span className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => toggleFilter('all')}>All Reviews ✓</span>
        <span className="filter-pill" onClick={() => toggleFilter('photos')}>📷 With Photos</span>
        <span className="filter-pill" onClick={() => toggleFilter('body')}>👤 Same Body Type</span>
        <span className={`filter-pill ${activeFilter === 'fake' ? 'active' : ''}`} onClick={() => toggleFilter('fake')}>🚫 Hide Fake</span>
      </div>

      <div className="review-card">
        <div className="review-header">
          <div className="review-avatar" style={{ background: '#2D1A4A', color: '#fff' }}>PR</div>
          <div><span className="review-name">Priya R.</span><span className="review-badge verified">✓ Verified Purchase</span></div>
        </div>
        <div className="review-stars">★★★★★</div>
        <div className="review-text">
          Fits exactly like the AI said! Ordered M as recommended, perfect. Fabric thicker than expected — in a good way. Wore to college, got 3 compliments.
        </div>
        <div className="review-photos"><div className="review-photo">📸</div><div className="review-photo">📸</div></div>
        <span className="fit-tag purple">True to size</span>
      </div>

      <div className={`review-card flagged-card ${hideFake ? 'hidden' : ''}`}>
        <div className="review-header">
          <div className="review-avatar" style={{ background: '#2A0000', color: '#EF4444' }}>??</div>
          <div><span className="review-name" style={{ color: '#EF4444' }}>Rohan S.</span><span className="review-badge fake">🚫 Flagged: likely paid</span></div>
        </div>
        <div className="review-stars">★★★★★</div>
        <div className="review-text struck">Amazing product best quality super fast delivery very happy 100% recommend buy now!!!</div>
        <div className="review-warning">⚠ No purchase history found. Generic language detected. Posted within 1hr of listing.</div>
      </div>

      <div className="review-card">
        <div className="review-header">
          <div className="review-avatar" style={{ background: '#1A2A0A', color: '#10B981' }}>AK</div>
          <div><span className="review-name">Aarav K.</span><span className="review-badge verified">✓ Verified Purchase</span></div>
        </div>
        <div className="review-stars">★★★★☆</div>
        <div className="review-text">
          Runs slim in shoulders if you're broad. Went with L instead of M. The AI actually warned me but I ignored it — my mistake!
        </div>
        <span className="fit-tag warning">Size up if broad shoulders</span>
      </div>
      <button className="btn-load-more">Load More Reviews →</button>
    </div>
  );
}
