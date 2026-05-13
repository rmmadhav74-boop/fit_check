import { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { P, SZ, MQ, navItems, qsBars, washItems } from './data/products';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PV from './components/ProductView';
import TShirtScene from './components/TShirtScene';
import AICalculator, { getAI } from './components/AICalculator';
import ProductAccordions from './components/ProductAccordions';
import ReviewsSection from './components/ReviewsSection';
import ReturnsPage from './components/ReturnsPage';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('grid');
  const [sel, setSel] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', msg: '' });
  const [tIdx, setTIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [hideFake, setHideFake] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [accOpen, setAccOpen] = useState({ core: true, qs: false, wash: false, ret: false });
  const [show360, setShow360] = useState(false);
  const [angle360, setAngle360] = useState(0);
  const [renderMode, setRenderMode] = useState('laser');
  const [activePreset, setActivePreset] = useState('Front');
  const [activeCategory, setActiveCategory] = useState('NEW DROPS');
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const baseAngle = useRef(0);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);

  const showToast = useCallback((t, m) => {
    setToast({ show: true, type: t, msg: m });
    setTimeout(() => setToast({ show: false, type: '', msg: '' }), 2000);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ai = getAI(weight);

  const openDetail = (p) => {
    setSel(p);
    setSize(null);
    setQty(1);
    setTIdx(0);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goGrid = () => {
    setView('grid');
    setSel(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goReturns = () => {
    setView('returns');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSize = (s) => {
    if (sel?.oos.includes(s)) return;
    setSize(p => p === s ? null : s);
  };

  const addToCart = () => {
    if (!size) {
      showToast('error', 'Please select a size first');
      return;
    }
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === sel.id && i.size === size);
      if (idx > -1) return prev.map((it, i) => i === idx ? { ...it, qty: it.qty + qty } : it);
      return [...prev, { ...sel, size, qty }];
    });
    showToast('success', '✓ Added to cart!');
  };

  const removeFromCart = (id, sz) => setCart(prev => prev.filter(i => !(i.id === id && i.size === sz)));

  const toggleFilter = (f) => {
    if (f === 'fake') {
      setHideFake(p => !p);
      setActiveFilter(p => p === 'fake' ? 'all' : 'fake');
    } else setActiveFilter(f);
  };

  const toggleAcc = (k) => setAccOpen(p => ({ ...p, [k]: !p[k] }));

  const setPreset = (label, deg) => {
    setAngle360(deg);
    setActivePreset(label);
  };

  return (
    <>
      <Header 
        navItems={navItems}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        view={view}
        goGrid={goGrid}
        goReturns={goReturns}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        MQ={MQ}
        scrolled={scrolled}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />

      {view === 'grid' && (
        <>
          <HeroBanner setActiveCategory={setActiveCategory} />
          <h2 className="section-heading">{activeCategory}</h2>
          <div className="product-grid pipeline-effect">
            {(activeCategory === 'SHOP ALL' ? P : P.filter(p => p.category === activeCategory)).map((p, i) => (
              <div className="product-card pipeline-card" style={{ animationDelay: `${i * 0.05}s` }} key={p.id} onClick={() => openDetail(p)}>
                <div className="card-img" style={{ background: p.bg }}><PV p={p} /></div>
                <div className="card-body">
                  <div className="card-name">{p.name}</div>
                  <div className="card-price">Rs. {p.price.toLocaleString('en-IN')}</div>
                  <div className="card-badges">
                    <span className="badge-verified">✓ 134 verified</span>
                    <span className="badge-aifit">AI Fit: M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'detail' && sel && (
        <div className="detail-page">
          <div className="detail-grid">
            <div>
              <div className="detail-main-img" style={{ background: sel.bg, position: 'relative' }}>
                <PV p={sel} />
                <button className="view360-btn" onClick={() => setShow360(v => !v)}>▶ 360° View</button>
              </div>
              <div className="detail-thumbs">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`detail-thumb ${tIdx === i ? 'active' : ''}`} style={{ background: sel.bg }} onClick={() => setTIdx(i)}>
                    <PV p={sel} size="thumb" />
                  </div>
                ))}
              </div>
              {show360 && (
                <div className="view360-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div className="view360-title" style={{ margin: 0 }}>▶ 360° 3D PRODUCT PROTOTYPE</div>
                  </div>
                  <div className="view360-stage" style={{ height: 340, background: '#000000', position: 'relative', borderRadius: 8, border: '1px solid #2A1A4A', overflow: 'hidden' }}>
                    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ background: '#000000' }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[10, 10, 12]} intensity={1.5} />
                      <pointLight position={[-10, -10, -10]} intensity={0.5} />
                      <TShirtScene sel={sel} presetAngle={angle360} renderMode={renderMode} />
                    </Canvas>
                    <div style={{ position: 'absolute', top: 12, left: 12, pointerEvents: 'auto', display: 'flex', gap: 4 }}>
                      <button style={{ fontSize: 9, padding: '2px 6px', borderRadius: 2, background: renderMode === 'laser' ? '#10B981' : '#1A0033', color: '#fff', border: renderMode === 'laser' ? '1px solid #34D399' : '1px solid #333' }} onClick={() => setRenderMode('laser')}>Laser Scan</button>
                      <button style={{ fontSize: 9, padding: '2px 6px', borderRadius: 2, background: renderMode === 'wireframe' ? '#8B5CF6' : '#1A0033', color: '#fff', border: renderMode === 'wireframe' ? '1px solid #A78BFA' : '1px solid #333' }} onClick={() => setRenderMode('wireframe')}>AI Wireframe</button>
                      <button style={{ fontSize: 9, padding: '2px 6px', borderRadius: 2, background: renderMode === 'pbr' ? '#3B82F6' : '#1A0033', color: '#fff', border: renderMode === 'pbr' ? '1px solid #60A5FA' : '1px solid #333' }} onClick={() => setRenderMode('pbr')}>Clean PBR</button>
                    </div>
                  </div>
                  <div className="view360-hint">Drag to rotate in 3D · Scroll to zoom</div>
                  <div className="view360-presets">
                    {[['Front', 0], ['Side', 45], ['Back', 90], ['Detail', 135]].map(([l, d]) => (
                      <button key={l} className={`view360-preset ${activePreset === l ? 'active' : ''}`} onClick={() => setPreset(l, d)}>{l}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="back-link" onClick={goGrid}>← Back to shop</div>
              <h1 className="detail-name">{sel.name}</h1>
              <div className="detail-price">Rs. {sel.price.toLocaleString('en-IN')}</div>
              <div className="detail-divider" />

              <div className="size-header"><span className="size-label">Size</span><span className="size-chart-link">Size Chart ✏</span></div>
              <div className="size-row">
                {SZ.map(s => (
                  <button key={s} className={`size-btn ${size === s ? 'selected' : ''} ${sel.oos.includes(s) ? 'oos' : ''}`} onClick={() => toggleSize(s)}>
                    {s}
                  </button>
                ))}
              </div>

              <AICalculator height={height} setHeight={setHeight} weight={weight} setWeight={setWeight} ai={ai} />

              <div className="qty-row">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <div className="stock-badge">
                <span className={`stock-dot ${sel.stock === 'in' ? 'in' : 'low'}`} />
                {sel.stock === 'in' ? 'In Stock' : 'Low Stock'}
              </div>
              <div className="action-btns">
                <button className="btn-atc" onClick={addToCart}>Add To Cart</button>
                <button className="btn-buy">Buy It Now</button>
                <div className="payment-icons"><span>PhonePe</span><span>GPay</span><span>Cards</span></div>
              </div>
              <div className="trust-row">
                <div className="trust-item"><span className="trust-icon">🚚</span>Free Shipping</div>
                <div className="trust-item"><span className="trust-icon">🔄</span>Hassle Free Returns</div>
                <div className="trust-item"><span className="trust-icon">✅</span>Moneyback Guarantee</div>
              </div>
              <div className="promo-strip">🏷 Flat 5% off your first order — Use Code: FIRSTSPANK</div>
              
              <ProductAccordions 
                sel={sel}
                qsBars={qsBars}
                washItems={washItems}
                accOpen={accOpen}
                toggleAcc={toggleAcc}
              />

              <ReviewsSection activeFilter={activeFilter} toggleFilter={toggleFilter} hideFake={hideFake} />
            </div>
          </div>
        </div>
      )}

      {view === 'returns' && <ReturnsPage showToast={showToast} />}

      <CartDrawer 
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
      />

      <Footer 
        goGrid={goGrid}
        goReturns={goReturns}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
      />

      <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>{toast.msg}</div>
    </>
  );
}
