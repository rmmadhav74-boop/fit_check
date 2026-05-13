export default function CartDrawer({ cart, cartOpen, setCartOpen, removeFromCart, cartTotal }) {
  return (
    <>
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 && <div className="cart-empty">Your cart is empty</div>}
          {cart.map(i => (
            <div className="cart-item" key={`${i.id}-${i.size}`}>
              <div className="cart-item-swatch" style={{ background: i.bg }} />
              <div className="cart-item-info">
                <div className="cart-item-name">{i.name}</div>
                <div className="cart-item-size">Size {i.size} · Qty {i.qty}</div>
              </div>
              <div className="cart-item-price">₹{(i.price * i.qty).toLocaleString('en-IN')}</div>
              <button className="cart-item-remove" onClick={() => removeFromCart(i.id, i.size)}>✕</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <button className="btn-checkout">Checkout →</button>
          </div>
        )}
      </div>
    </>
  );
}
