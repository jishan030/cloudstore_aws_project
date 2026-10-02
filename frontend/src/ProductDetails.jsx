import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";
import { useState } from "react";

function ProductDetails({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const total = product.price * quantity;

  return (
    <div className="product-details-page">
      <div className="product-details-inner">

        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to collection
        </button>

        <div className="details-layout">

          <div className="details-gallery">
            <div className="details-main-image">
              <img src={product.image} alt={product.name} />
              <span>{product.badge}</span>
            </div>

            <div className="details-mini-info">
              <span>CloudStore / {product.category}</span>
              <span>Premium collection</span>
            </div>
          </div>

          <div className="details-content">

            <span className="details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="details-rating">
              <div>
                <Star size={16} fill="currentColor" />
                <strong>{product.rating}</strong>
              </div>
              <span>{product.reviews} verified reviews</span>
            </div>

            <div className="details-price">
              <strong>${product.price}</strong>
              <del>${product.oldPrice}</del>
              <span>
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}% OFF
              </span>
            </div>

            <p className="details-description">
              Designed for modern everyday living, the {product.name}
              combines thoughtful design, premium materials and reliable
              performance. A carefully selected CloudStore product built
              for people who value quality without unnecessary complexity.
            </p>

            <div className="details-divider" />

            <div className="quantity-row">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                >
                  <Minus size={15} />
                </button>

                <strong>{quantity}</strong>

                <button
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="details-actions">
              <button
                className="add-cart-large"
                onClick={() => onAddToCart(quantity)}
              >
                Add to cart — ${total}
                <ShoppingBagIcon />
              </button>

              <button
                className={`details-wishlist ${
                  liked ? "liked" : ""
                }`}
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  size={20}
                  fill={liked ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="details-benefits">

              <div>
                <Truck size={19} />
                <div>
                  <strong>Fast delivery</strong>
                  <span>Dispatch within 24 hours</span>
                </div>
              </div>

              <div>
                <ShieldCheck size={19} />
                <div>
                  <strong>Secure payment</strong>
                  <span>100% protected checkout</span>
                </div>
              </div>

              <div>
                <RotateCcw size={19} />
                <div>
                  <strong>Easy returns</strong>
                  <span>30-day return guarantee</span>
                </div>
              </div>

            </div>

            <div className="details-note">
              <span>✓</span>
              Free shipping on orders over $100
            </div>

          </div>
        </div>

        <div className="details-bottom">
          <div>
            <span className="section-kicker">CLOUDSTORE PROMISE</span>
            <h2>Products worth keeping.</h2>
          </div>

          <p>
            Every product in our collection is selected with design,
            usefulness and long-term value in mind.
          </p>

          <button onClick={onBack}>
            Continue shopping
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export default ProductDetails;
