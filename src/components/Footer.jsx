import { SvgFB, SvgIG, SvgYT, SvgTW } from './Icons';

export default function Footer({ goGrid, goReturns, setCartOpen, cartCount }) {
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">-FITCHECK.</div>
              <div className="footer-desc">Drop-worthy fits for Gen Z</div>
              <div className="footer-socials"><SvgFB /><SvgIG /><SvgYT /><SvgTW /></div>
            </div>
            <div className="footer-col">
              <h4>SHOP</h4>
              <span onClick={goGrid}>New Drops</span>
              <span>Crop Tops</span>
              <span>Baby Tees</span>
              <span>Oversized</span>
              <span>Polos</span>
              <span onClick={goGrid}>Shop All</span>
            </div>
            <div className="footer-col">
              <h4>SUPPORT</h4>
              <span>Track Order</span>
              <span onClick={goReturns}>Returns</span>
              <span>Size Guide</span>
              <span>Contact</span>
              <span>FAQs</span>
            </div>
            <div className="footer-col">
              <h4>FOLLOW US</h4>
              <span>Instagram</span>
              <span>YouTube</span>
              <span>Twitter</span>
            </div>
          </div>
          <div className="footer-bottom">© 2025 FitCheck. All rights reserved — Made with ♥ for Gen Z</div>
        </div>
      </footer>

      <div className="bottom-nav">
        <div className="bottom-nav-item" onClick={goGrid}><span>🏠</span><span>Home</span></div>
        <div className="bottom-nav-item" onClick={goGrid}><span>🛍</span><span>Shop</span></div>
        <div className="bottom-nav-item" onClick={() => setCartOpen(true)}>
          <span>🛒</span><span>Cart</span>
          {cartCount > 0 && <span className="bottom-nav-badge">{cartCount}</span>}
        </div>
        <div className="bottom-nav-item"><span>👤</span><span>Account</span></div>
      </div>
    </>
  );
}
