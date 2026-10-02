import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

function CartDrawer({ items, onClose, onUpdate, onRemove }) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span className="section-kicker">YOUR BAG</span>
            <h2>Shopping cart</h2>
          </div>

          <button className="cart-close" onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} />
            <h3>Your cart is empty</h3>
            <p>
              Looks like you haven't added anything yet.
            </p>

            <button onClick={onClose}>
              Continue shopping
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>

                    <strong>${item.price}</strong>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          onClick={() =>
                            onUpdate(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus size={13} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            onUpdate(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <p>
                Shipping and taxes are calculated at checkout.
              </p>

              <button className="checkout-button">
                Proceed to checkout
                <ArrowRight size={18} />
              </button>

              <button className="continue-shopping" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
