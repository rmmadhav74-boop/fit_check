export default function HeroBanner({ setActiveCategory }) {
  return (
    <section className="hero">
      <h1>WHATS YOUR VIBE?</h1>
      <p>Drop-worthy fits for Gen Z</p>
      <button className="hero-cta" onClick={() => setActiveCategory('SHOP ALL')}>SHOP ALL</button>
    </section>
  );
}
