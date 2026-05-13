export default function ProductView({ p, size = 'full' }) {
  if (p.img) return <div className="pv" style={{ background: p.bg }}><img src={p.img} alt={p.name + ' tee'} /></div>;
  if (!p.vis) return <div className="pv" style={{ background: p.bg }}><div className="pv-title" style={{ fontSize: 22, color: '#fff' }}>{p.name}</div></div>;
  const v = p.vis;
  const fs = size === 'thumb' ? Math.max(10, v.titleSz * 0.5) : size === '360' ? v.titleSz * 1.2 : v.titleSz;
  return (
    <div className="pv" style={{ background: p.bg, border: `1px solid ${v.border}` }}>
      <div className="pv-brand">{v.brand}</div>
      <div className="pv-title" style={{ fontSize: fs, color: v.titleCol, fontStyle: v.italic ? 'italic' : 'normal', whiteSpace: 'pre-line' }}>{v.title}</div>
      <div className="pv-sub">FitCheck Studios™</div>
    </div>
  );
}
