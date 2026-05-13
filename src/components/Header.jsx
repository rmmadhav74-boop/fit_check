import { SvgFB, SvgIG, SvgYT, SvgTW, SvgSearch, SvgUser, SvgBag } from './Icons';

export default function Header({
  navItems,
  activeCategory,
  setActiveCategory,
  view,
  goGrid,
  goReturns,
  cartCount,
  setCartOpen,
  MQ,
  scrolled,
  mobileMenu,
  setMobileMenu
}) {
  return (
    <header>
      <div className="top-strip">
        <div className="top-strip-inner">
          <div className="top-strip-socials"><SvgFB /><SvgIG /><SvgYT /><SvgTW /></div>
          <div className="top-strip-logo" onClick={goGrid}>-FITCHECK.</div>
          <div className="top-strip-actions">
            <button aria-label="Search"><SvgSearch /></button>
            <button aria-label="Account"><SvgUser /></button>
            <button aria-label="Cart" style={{ position: 'relative' }} onClick={() => setCartOpen(true)}>
              <SvgBag />
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="main-nav-inner">
          {navItems.map(n => (
            <span key={n} className={`nav-link ${n === activeCategory ? 'active' : ''}`} onClick={() => { setActiveCategory(n); if (view !== 'grid') goGrid(); }}>
              {n}
            </span>
          ))}
          <span className="nav-link track" onClick={goReturns}>TRACK ORDER</span>
          <button className="hamburger-btn" onClick={() => setMobileMenu(true)}>☰</button>
        </div>
      </nav>

      <div className="marquee">
        <div className="marquee-inner">
          {Array.from({ length: 16 }).map((_, i) => <span key={i}>{MQ}</span>)}
        </div>
      </div>

      {mobileMenu && (
        <div className="mobile-menu-overlay">
          <button className="mobile-menu-close" onClick={() => setMobileMenu(false)}>✕</button>
          {navItems.map(n => (
            <div key={n} className={`mobile-menu-link ${n === activeCategory ? 'active' : ''}`} onClick={() => { setActiveCategory(n); setMobileMenu(false); if (view !== 'grid') goGrid(); }}>
              {n}
            </div>
          ))}
          <div className="mobile-menu-link track" onClick={() => { setMobileMenu(false); goReturns(); }}>TRACK ORDER</div>
        </div>
      )}
    </header>
  );
}
