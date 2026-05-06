import { useState, useEffect, useCallback, useRef } from 'react';

const P = [
  { id:1,name:'NO SMOKING',price:1490,bg:'#F5F0DC',stock:'in',color:'Cream',oos:[],
    img:'/images/no-smoking.png' },
  { id:2,name:'EXCLUSIVE 1',price:1990,bg:'#0A0A0A',stock:'low',color:'Black',oos:['XL'],
    vis:{brand:'-FITCHECK. "GLITCH-OP" ®',title:'Sync(it)',titleSz:22,titleCol:'#fff',border:'#1a1a1a'} },
  { id:3,name:'AT THE TOP',price:1090,bg:'#2D2D2D',stock:'low',color:'Charcoal',oos:[],
    vis:{brand:'-FITCHECK. "RISE" ®',title:'See you at the top ↑',titleSz:18,titleCol:'#ccc',border:'#3a3a3a',italic:true} },
  { id:4,name:'WATER ON THE ROCKS',price:1190,bg:'#1A3A8A',stock:'low',color:'Royal Blue',oos:['XS','S','M','L','2XL'],
    vis:{brand:'-FITCHECK. "DEEP-SEA" ®',title:'WATER\nON THE\nROCKS',titleSz:20,titleCol:'#fff',border:'#2a4a9a'} },
  { id:5,name:'FRAGILE',price:590,bg:'#8B1A1A',stock:'low',color:'Red',oos:[],fit:'Crop Fit',
    vis:{brand:'-FITCHECK. "HANDLE" ®',title:'Fragile like a BOMB',titleSz:18,titleCol:'#fff',border:'#a33'} },
  { id:6,name:'ABSOLUT',price:1490,bg:'#D4E8A0',stock:'in',color:'Lime',oos:[],
    vis:{brand:'-FITCHECK. "SOBER" ®',title:'ABSOLUTly\nSOBER',titleSz:22,titleCol:'#1a3a00',border:'#b5d880'} },
];

const PV = ({p,size='full'}) => {
  if(p.img) return <div className="pv" style={{background:p.bg}}><img src={p.img} alt={p.name+' tee'}/></div>;
  if(!p.vis) return <div className="pv" style={{background:p.bg}}><div className="pv-title" style={{fontSize:22,color:'#fff'}}>{p.name}</div></div>;
  const v=p.vis;
  const fs = size==='thumb' ? Math.max(10,v.titleSz*0.5) : size==='360' ? v.titleSz*1.2 : v.titleSz;
  return <div className="pv" style={{background:p.bg,border:`1px solid ${v.border}`}}>
    <div className="pv-brand">{v.brand}</div>
    <div className="pv-title" style={{fontSize:fs,color:v.titleCol,fontStyle:v.italic?'italic':'normal',whiteSpace:'pre-line'}}>{v.title}</div>
    <div className="pv-sub">FitCheck Studios™</div>
  </div>;
};
const SZ = ['XS','S','M','L','XL','2XL'];
const MQ = 'BEST PRICE GUARANTEE  ›  ';

function getAI(w){
  if(w<55) return {size:'S',kept:88,ret:12};
  if(w<=67) return {size:'M',kept:91,ret:9};
  if(w<=78) return {size:'L',kept:87,ret:13};
  return {size:'XL',kept:85,ret:15};
}

const SvgFB=()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const SvgIG=()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const SvgYT=()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const SvgTW=()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const SvgSearch=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const SvgUser=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const SvgBag=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;

export default function App(){
  const[view,setView]=useState('grid');
  const[sel,setSel]=useState(null);
  const[size,setSize]=useState(null);
  const[qty,setQty]=useState(1);
  const[cart,setCart]=useState([]);
  const[cartOpen,setCartOpen]=useState(false);
  const[toast,setToast]=useState({show:false,type:'',msg:''});
  const[tIdx,setTIdx]=useState(0);
  const[scrolled,setScrolled]=useState(false);
  const[height,setHeight]=useState(170);
  const[weight,setWeight]=useState(65);
  const[hideFake,setHideFake]=useState(false);
  const[activeFilter,setActiveFilter]=useState('all');
  const[mobileMenu,setMobileMenu]=useState(false);
  const[accOpen,setAccOpen]=useState({core:true,qs:false,wash:false,ret:false});
  const[show360,setShow360]=useState(false);
  const[angle360,setAngle360]=useState(0);
  const[activePreset,setActivePreset]=useState('Front');
  const dragging=useRef(false);
  const dragStartX=useRef(0);
  const baseAngle=useRef(0);

  useEffect(()=>{const f=()=>setScrolled(window.scrollY>10);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
  const showToast=useCallback((t,m)=>{setToast({show:true,type:t,msg:m});setTimeout(()=>setToast({show:false,type:'',msg:''}),2000)},[]);
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ai=getAI(weight);

  const openDetail=(p)=>{setSel(p);setSize(null);setQty(1);setTIdx(0);setView('detail');window.scrollTo({top:0,behavior:'smooth'})};
  const goGrid=()=>{setView('grid');setSel(null);window.scrollTo({top:0,behavior:'smooth'})};
  const goReturns=()=>{setView('returns');window.scrollTo({top:0,behavior:'smooth'})};
  const toggleSize=(s)=>{if(sel?.oos.includes(s))return;setSize(p=>p===s?null:s)};
  const addToCart=()=>{
    if(!size){showToast('error','Please select a size first');return}
    setCart(prev=>{const idx=prev.findIndex(i=>i.id===sel.id&&i.size===size);if(idx>-1)return prev.map((it,i)=>i===idx?{...it,qty:it.qty+qty}:it);return[...prev,{...sel,size,qty}]});
    showToast('success','✓ Added to cart!');
  };
  const removeFromCart=(id,sz)=>setCart(prev=>prev.filter(i=>!(i.id===id&&i.size===sz)));
  const toggleFilter=(f)=>{if(f==='fake'){setHideFake(p=>!p);setActiveFilter(p=>p==='fake'?'all':'fake')}else setActiveFilter(f)};
  const toggleAcc=(k)=>setAccOpen(p=>({...p,[k]:!p[k]}));
  const onDragStart=(e)=>{dragging.current=true;dragStartX.current=e.clientX;baseAngle.current=angle360};
  const onDragMove=(e)=>{if(!dragging.current)return;setAngle360(baseAngle.current+(e.clientX-dragStartX.current)*0.5);setActivePreset('')};
  const onDragEnd=()=>{dragging.current=false};
  const setPreset=(label,deg)=>{setAngle360(deg);setActivePreset(label)};

  const navItems=['NEW DROPS','CROP TOPS','BABY TEES','OVERSIZED','POLOS','SHOP ALL'];
  const qsBars=[['Fabric quality','9.2',92],['Print durability (10 washes)','8.8',88],['Colour retention','9.0',90],['Stitching strength','9.4',94],['True to size accuracy','8.5',85]];
  const washItems=[['🌡','Cold wash only < 30°C'],['❌','Do not tumble dry'],['☀','Dry in shade, avoid direct sun'],['🚫','Do not bleach'],['✔','Turn inside out before wash'],['🔥','Iron on low, avoid print area'],['✖','No dry cleaning'],['💙','Wash with similar colours only']];

  return(<>
    <div className="top-strip"><div className="top-strip-inner">
      <div className="top-strip-socials"><SvgFB/><SvgIG/><SvgYT/><SvgTW/></div>
      <div className="top-strip-logo">-FITCHECK.</div>
      <div className="top-strip-actions">
        <button aria-label="Search"><SvgSearch/></button>
        <button aria-label="Account"><SvgUser/></button>
        <button aria-label="Cart" style={{position:'relative'}} onClick={()=>setCartOpen(true)}><SvgBag/><span className="cart-badge">{cartCount}</span></button>
      </div>
    </div></div>

    <nav className={`main-nav ${scrolled?'scrolled':''}`}><div className="main-nav-inner">
      {navItems.map(n=><span key={n} className={`nav-link ${n==='NEW DROPS'?'active':''}`} onClick={()=>{if(view!=='grid')goGrid()}}>{n}</span>)}
      <span className="nav-link track" onClick={goReturns}>TRACK ORDER</span>
      <button className="hamburger-btn" onClick={()=>setMobileMenu(true)}>☰</button>
    </div></nav>

    <div className="marquee"><div className="marquee-inner">{Array.from({length:16}).map((_,i)=><span key={i}>{MQ}</span>)}</div></div>

    {mobileMenu&&<div className="mobile-menu-overlay">
      <button className="mobile-menu-close" onClick={()=>setMobileMenu(false)}>✕</button>
      {navItems.map(n=><div key={n} className={`mobile-menu-link ${n==='NEW DROPS'?'active':''}`} onClick={()=>{setMobileMenu(false);if(view!=='grid')goGrid()}}>{n}</div>)}
      <div className="mobile-menu-link track" onClick={()=>{setMobileMenu(false);goReturns()}}>TRACK ORDER</div>
    </div>}

    {view==='grid'&&<>
      <section className="hero"><h1>WHATS YOUR VIBE?</h1><p>Drop-worthy fits for Gen Z</p><button className="hero-cta">SHOP ALL</button></section>
      <h2 className="section-heading">NEW DROPS</h2>
      <div className="product-grid">{P.map(p=><div className="product-card" key={p.id} onClick={()=>openDetail(p)}>
        <div className="card-img" style={{background:p.bg}}><PV p={p}/></div>
        <div className="card-body"><div className="card-name">{p.name}</div><div className="card-price">Rs. {p.price.toLocaleString('en-IN')}</div>
        <div className="card-badges"><span className="badge-verified">✓ 134 verified</span><span className="badge-aifit">AI Fit: M</span></div></div>
      </div>)}</div>
    </>}

    {view==='detail'&&sel&&<div className="detail-page"><div className="detail-grid">
      <div>
        <div className="detail-main-img" style={{background:sel.bg,position:'relative'}}>
          <PV p={sel}/>
          <button className="view360-btn" onClick={()=>setShow360(v=>!v)}>▶ 360° View</button>
        </div>
        <div className="detail-thumbs">{[0,1,2,3].map(i=><div key={i} className={`detail-thumb ${tIdx===i?'active':''}`} style={{background:sel.bg}} onClick={()=>setTIdx(i)}><PV p={sel} size='thumb'/></div>)}</div>
        {show360&&<div className="view360-panel">
          <div className="view360-title">▶ 360° INTERACTIVE VIEW</div>
          <div className="view360-stage" style={{background:sel.bg}} onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}>
            <div className="view360-obj" style={{transform:`rotateY(${angle360}deg)`}}><PV p={sel} size='360'/></div>
          </div>
          <div className="view360-hint">Drag left/right to rotate</div>
          <div className="view360-presets">
            {[['Front',0],['Side',45],['Back',90],['Detail',135]].map(([l,d])=><button key={l} className={`view360-preset ${activePreset===l?'active':''}`} onClick={()=>setPreset(l,d)}>{l}</button>)}
          </div>
        </div>}
      </div>
      <div>
        <div className="back-link" onClick={goGrid}>← Back to shop</div>
        <h1 className="detail-name">{sel.name}</h1>
        <div className="detail-price">Rs. {sel.price.toLocaleString('en-IN')}</div>
        <div className="detail-divider"/>

        <div className="size-header"><span className="size-label">Size</span><span className="size-chart-link">Size Chart ✏</span></div>
        <div className="size-row">{SZ.map(s=><button key={s} className={`size-btn ${size===s?'selected':''} ${sel.oos.includes(s)?'oos':''}`} onClick={()=>toggleSize(s)}>{s}</button>)}</div>

        <div className="ai-box">
          <div className="ai-box-title">✦ AI Fit Recommender</div>
          <div className="ai-slider"><div className="ai-slider-header"><span>Height</span><span>{height} cm</span></div><input type="range" min="150" max="190" value={height} onChange={e=>setHeight(+e.target.value)}/></div>
          <div className="ai-slider"><div className="ai-slider-header"><span>Weight</span><span>{weight} kg</span></div><input type="range" min="45" max="100" value={weight} onChange={e=>setWeight(+e.target.value)}/></div>
          <div className="ai-result">Based on your measurements ({height}cm, {weight}kg), we recommend <strong>Size {ai.size}</strong> for this item.</div>
          <div className="ai-conf-track"><div className="ai-conf-fill" style={{width:`${ai.kept}%`}}/></div>
          <div className="ai-conf-text">{ai.kept}% of similar shoppers kept this size</div>
          <div className="ai-stats">
            <div className="ai-stat kept"><div className="ai-stat-label">Kept this size</div><div className="ai-stat-val">{ai.kept}%</div></div>
            <div className="ai-stat ret"><div className="ai-stat-label">Returned (size)</div><div className="ai-stat-val">{ai.ret}%</div></div>
          </div>
        </div>

        <div className="qty-row"><button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button><div className="qty-val">{qty}</div><button className="qty-btn" onClick={()=>setQty(q=>q+1)}>+</button></div>
        <div className="stock-badge"><span className={`stock-dot ${sel.stock==='in'?'in':'low'}`}/>{sel.stock==='in'?'In Stock':'Low Stock'}</div>
        <div className="action-btns">
          <button className="btn-atc" onClick={addToCart}>Add To Cart</button>
          <button className="btn-buy">Buy It Now</button>
          <div className="payment-icons"><span>PhonePe</span><span>GPay</span><span>Cards</span></div>
        </div>
        <div className="trust-row"><div className="trust-item"><span className="trust-icon">🚚</span>Free Shipping</div><div className="trust-item"><span className="trust-icon">🔄</span>Hassle Free Returns</div><div className="trust-item"><span className="trust-icon">✅</span>Moneyback Guarantee</div></div>
        <div className="promo-strip">🏷 Flat 5% off your first order — Use Code: FIRSTSPANK</div>
        {/* ACCORDION 1: Core Features — open by default */}
        <div className="accordion">
          <div className="accordion-header" onClick={()=>toggleAcc('core')}>CORE FEATURES & FABRIC DETAILS <span className={`accordion-arrow ${accOpen.core?'open':''}`}>▼</span></div>
          <div className="accordion-body" style={{maxHeight:accOpen.core?'500px':'0'}}>
            <div className="feature-row"><span className="feature-label">FABRIC</span><span className="feature-value">100% French Terry Loopknit Cotton</span></div>
            <div className="feature-row"><span className="feature-label">FIT</span><span className="feature-value">{sel.fit||'Oversized Fit'}</span></div>
            <div className="feature-row"><span className="feature-label">GSM</span><span className="feature-value">240 GSM</span></div>
            <div className="feature-row"><span className="feature-label">COLOUR</span><span className="feature-value">{sel.color}</span></div>
            <div className="feature-row"><span className="feature-label">PRINT</span><span className="feature-value">HD Silicon Puff, Screen</span></div>
          </div>
        </div>

        {/* ACCORDION 2: Quality Scorecard — closed */}
        <div className="accordion">
          <div className="accordion-header" onClick={()=>toggleAcc('qs')}>QUALITY SCORECARD <span className={`accordion-arrow ${accOpen.qs?'open':''}`}>▼</span></div>
          <div className="accordion-body" style={{maxHeight:accOpen.qs?'600px':'0'}}>
            <div className="qs-sub">Based on 134 verified buyer responses</div>
            {qsBars.map(([label,score,pct])=><div className="qs-bar" key={label}>
              <div className="qs-bar-header"><span>{label}</span><span>{score}/10</span></div>
              <div className="qs-track"><div className="qs-fill" style={{width:accOpen.qs?`${pct}%`:'0%'}}/></div>
            </div>)}
            <div className="qs-warn">⚠ 9% of buyers returned due to size mismatch — use the AI Recommender above before ordering</div>
          </div>
        </div>

        {/* ACCORDION 3: Wash Care Guide — closed */}
        <div className="accordion">
          <div className="accordion-header" onClick={()=>toggleAcc('wash')}>WASH CARE GUIDE <span className={`accordion-arrow ${accOpen.wash?'open':''}`}>▼</span></div>
          <div className="accordion-body" style={{maxHeight:accOpen.wash?'500px':'0'}}>
            <div className="wash-grid">
              {washItems.map(([icon,label])=><div className="wash-item" key={label}><div className="wash-item-icon">{icon}</div><div className="wash-item-label">{label}</div></div>)}
            </div>
            <div className="wash-warn">⚠ The HD Silicon Puff print can crack if ironed directly. Always place a cloth barrier or iron inside-out.</div>
          </div>
        </div>

        {/* ACCORDION 4: Return & Fit Guarantee — closed */}
        <div className="accordion">
          <div className="accordion-header" onClick={()=>toggleAcc('ret')}>RETURN & FIT GUARANTEE POLICY <span className={`accordion-arrow ${accOpen.ret?'open':''}`}>▼</span></div>
          <div className="accordion-body" style={{maxHeight:accOpen.ret?'800px':'0'}}>
            <div className="return-grid">
              <div className="return-card covered"><div className="return-card-header">✓ WHAT WE COVER</div><div className="return-card-list">✓ Wrong size delivered<br/>✓ Damaged on arrival<br/>✓ Colour mismatch from listing<br/>✓ Manufacturing defect<br/>✓ Size exchange within 7 days</div></div>
              <div className="return-card notcovered"><div className="return-card-header">✕ NOT COVERED</div><div className="return-card-list">✕ Used or washed items<br/>✕ Tags removed by buyer<br/>✕ Personal colour preference<br/>✕ Screen vs real colour variation<br/>✕ Claims after 7 days of delivery</div></div>
            </div>
            <div className="return-guarantee"><div className="return-guarantee-header">🛡 FITCHECK FIT GUARANTEE (EXCLUSIVE)</div><div className="return-guarantee-body">If our AI recommends a size and it still doesn't fit — get instant store credit, no courier pickup needed for your first return. Every return makes your future recommendations smarter.</div></div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-heading">Customer Reviews</div>
          <div className="reviews-stars-row"><span className="stars">★★★★☆</span><span className="rating">4.3</span><span className="count">(127 reviews)</span></div>
          <div className="filter-pills">
            <span className={`filter-pill ${activeFilter==='all'?'active':''}`} onClick={()=>toggleFilter('all')}>All Reviews ✓</span>
            <span className="filter-pill" onClick={()=>toggleFilter('photos')}>📷 With Photos</span>
            <span className="filter-pill" onClick={()=>toggleFilter('body')}>👤 Same Body Type</span>
            <span className={`filter-pill ${activeFilter==='fake'?'active':''}`} onClick={()=>toggleFilter('fake')}>🚫 Hide Fake</span>
          </div>

          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar" style={{background:'#2D1A4A',color:'#fff'}}>PR</div>
              <div><span className="review-name">Priya R.</span><span className="review-badge verified">✓ Verified Purchase</span></div>
            </div>
            <div className="review-stars">★★★★★</div>
            <div className="review-text">Fits exactly like the AI said! Ordered M as recommended, perfect. Fabric thicker than expected — in a good way. Wore to college, got 3 compliments.</div>
            <div className="review-photos"><div className="review-photo">📸</div><div className="review-photo">📸</div></div>
            <span className="fit-tag purple">True to size</span>
          </div>

          <div className={`review-card flagged-card ${hideFake?'hidden':''}`}>
            <div className="review-header">
              <div className="review-avatar" style={{background:'#2A0000',color:'#EF4444'}}>??</div>
              <div><span className="review-name" style={{color:'#EF4444'}}>Rohan S.</span><span className="review-badge fake">🚫 Flagged: likely paid</span></div>
            </div>
            <div className="review-stars">★★★★★</div>
            <div className="review-text struck">Amazing product best quality super fast delivery very happy 100% recommend buy now!!!</div>
            <div className="review-warning">⚠ No purchase history found. Generic language detected. Posted within 1hr of listing.</div>
          </div>

          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar" style={{background:'#1A2A0A',color:'#10B981'}}>AK</div>
              <div><span className="review-name">Aarav K.</span><span className="review-badge verified">✓ Verified Purchase</span></div>
            </div>
            <div className="review-stars">★★★★☆</div>
            <div className="review-text">Runs slim in shoulders if you're broad. Went with L instead of M. The AI actually warned me but I ignored it — my mistake!</div>
            <span className="fit-tag warning">Size up if broad shoulders</span>
          </div>
          <button className="btn-load-more">Load More Reviews →</button>
        </div>
      </div>
    </div></div>}

    {view==='returns'&&<div className="returns-page">
      <h1 className="returns-title">Returns — Our Way vs The Old Way</h1>
      <div className="returns-stats">
        <div className="returns-stat"><div className="returns-stat-val">40–50%</div><div className="returns-stat-label">Return rate on old platforms</div></div>
        <div className="returns-stat"><div className="returns-stat-val">100%</div><div className="returns-stat-label">Surveyed users had returned before</div></div>
        <div className="returns-stat"><div className="returns-stat-val">#1 Reason</div><div className="returns-stat-label">Wrong size / fit in clothing</div></div>
      </div>
      <div className="returns-compare">
        <div className="returns-card old">
          <div className="returns-card-header">❌ Normal Platforms (Flipkart/Myntra)</div>
          {[['Login → navigate 4 screens','Confusing multi-step process'],['Wait 3–5 days for courier pickup','Must stay home, no reschedule'],['Refund takes 5–7 more days','Up to 12 days total, money stuck']].map(([t,s],i)=>
            <div className="returns-step" key={i}><div className="step-circle">{i+1}</div><div><div className="step-title">{t}</div><div className="step-sub">{s}</div></div></div>)}
        </div>
        <div className="returns-card new">
          <div className="returns-card-header">✓ FitCheck Returns</div>
          {[['1-tap return from order screen','Done in 10 seconds, no navigation'],['Instant store credit applied','Use it immediately, no courier wait'],['AI learns your size automatically','Next order recommendation improves']].map(([t,s],i)=>
            <div className="returns-step" key={i}><div className="step-circle">{i+1}</div><div><div className="step-title">{t}</div><div className="step-sub">{s}</div></div></div>)}
        </div>
      </div>
      <div className="returns-cta"><button className="returns-cta-btn" onClick={()=>showToast('success','✓ Store credit added instantly!')}>Try Instant Return</button></div>
    </div>}

    <footer className="footer"><div className="footer-inner">
      <div className="footer-grid">
        <div><div className="footer-logo">-FITCHECK.</div><div className="footer-desc">Drop-worthy fits for Gen Z</div><div className="footer-socials"><SvgFB/><SvgIG/><SvgYT/><SvgTW/></div></div>
        <div className="footer-col"><h4>SHOP</h4><span onClick={goGrid}>New Drops</span><span>Crop Tops</span><span>Baby Tees</span><span>Oversized</span><span>Polos</span><span onClick={goGrid}>Shop All</span></div>
        <div className="footer-col"><h4>SUPPORT</h4><span>Track Order</span><span onClick={goReturns}>Returns</span><span>Size Guide</span><span>Contact</span><span>FAQs</span></div>
        <div className="footer-col"><h4>FOLLOW US</h4><span>Instagram</span><span>YouTube</span><span>Twitter</span></div>
      </div>
      <div className="footer-bottom">© 2025 FitCheck. All rights reserved — Made with ♥ for Gen Z</div>
    </div></footer>

    <div className={`cart-overlay ${cartOpen?'open':''}`} onClick={()=>setCartOpen(false)}/>
    <div className={`cart-drawer ${cartOpen?'open':''}`}>
      <div className="cart-drawer-header"><h3>Your Cart</h3><button className="cart-drawer-close" onClick={()=>setCartOpen(false)}>✕</button></div>
      <div className="cart-items">
        {cart.length===0&&<div className="cart-empty">Your cart is empty</div>}
        {cart.map(i=><div className="cart-item" key={`${i.id}-${i.size}`}>
          <div className="cart-item-swatch" style={{background:i.bg}}/>
          <div className="cart-item-info"><div className="cart-item-name">{i.name}</div><div className="cart-item-size">Size {i.size} · Qty {i.qty}</div></div>
          <div className="cart-item-price">₹{(i.price*i.qty).toLocaleString('en-IN')}</div>
          <button className="cart-item-remove" onClick={()=>removeFromCart(i.id,i.size)}>✕</button>
        </div>)}
      </div>
      {cart.length>0&&<div className="cart-footer">
        <div className="cart-subtotal"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
        <button className="btn-checkout">Checkout →</button>
      </div>}
    </div>

    <div className="bottom-nav">
      <div className="bottom-nav-item" onClick={goGrid}><span>🏠</span><span>Home</span></div>
      <div className="bottom-nav-item" onClick={goGrid}><span>🛍</span><span>Shop</span></div>
      <div className="bottom-nav-item" onClick={()=>setCartOpen(true)}><span>🛒</span><span>Cart</span>{cartCount>0&&<span className="bottom-nav-badge">{cartCount}</span>}</div>
      <div className="bottom-nav-item"><span>👤</span><span>Account</span></div>
    </div>

    <div className={`toast ${toast.show?'show':''} ${toast.type}`}>{toast.msg}</div>
  </>);
}
