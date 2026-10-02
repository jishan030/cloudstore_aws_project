import {
  ArrowRight,
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import "./App.css";
import ProductDetails from "./ProductDetails";
import CartDrawer from "./CartDrawer";

const products = [
  {
    id: 1,
    name: "AeroFlex Headphones",
    category: "Audio",
    price: 129,
    oldPrice: 159,
    rating: 4.9,
    reviews: 284,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "Vertex Smart Watch",
    category: "Wearables",
    price: 189,
    oldPrice: 229,
    rating: 4.8,
    reviews: 196,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Minimal Leather Pack",
    category: "Accessories",
    price: 94,
    oldPrice: 119,
    rating: 4.7,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    badge: "TRENDING",
  },
  {
    id: 4,
    name: "Nova Performance Sneaker",
    category: "Footwear",
    price: 149,
    oldPrice: 179,
    rating: 4.9,
    reviews: 327,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    badge: "LIMITED",
  },
];

const categories = [
  {
    name: "Technology",
    count: "128 products",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Fashion",
    count: "246 products",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Lifestyle",
    count: "184 products",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=85",
  },
];

function App() {
  const [apiProducts, setApiProducts] = useState(products);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products.length > 0) {
          setApiProducts(data.products);
        }
      })
      .catch((error) => {
        console.error("Products API error:", error);
      });
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleLike = (id) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { ...product, quantity }];
    });

    setCartOpen(true);
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={(quantity) => addToCart(selectedProduct, quantity)}
      />
    );
  }

  return (
    <div className="store">
      <div className="announcement">
        <span>FREE SHIPPING ON ORDERS OVER $100</span>
        <span className="announcement-dot">•</span>
        <span>30-DAY EASY RETURNS</span>
      </div>

      <header className="navbar">
        <div className="nav-inner">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a className="brand" href="/">
            <span className="brand-mark">C</span>
            <span>
              CLOUD<span>STORE</span>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
            <a href="#featured">Featured</a>
            <a href="#story">Our Story</a>
          </nav>

          <div className="nav-actions">
            <button className="icon-button">
              <Search size={20} />
            </button>

            <button className="icon-button desktop-only">
              <UserRound size={20} />
            </button>

            <button
              className="icon-button cart-button"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdate={updateCartQuantity}
          onRemove={removeFromCart}
        />
      )}

      <main>
        <section className="hero" id="shop">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={15} />
              CURATED FOR THE MODERN LIFE
            </div>

            <h1>
              Better things.
              <br />
              <em>Beautifully</em> delivered.
            </h1>

            <p>
              Discover thoughtfully selected products designed to bring
              style, performance and simplicity into your everyday life.
            </p>

            <div className="hero-actions">
              <a href="#featured" className="primary-button">
                Explore collection
                <ArrowRight size={18} />
              </a>

              <a href="#categories" className="text-button">
                Browse categories
              </a>
            </div>

            <div className="hero-trust">
              <div>
                <strong>10K+</strong>
                <span>Happy customers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>Fast dispatch</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=90"
                alt="CloudStore collection"
              />

              <div className="floating-card">
                <span className="floating-label">TRENDING NOW</span>
                <strong>Minimal. Powerful. Yours.</strong>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="benefit">
            <Truck />
            <div>
              <strong>Fast delivery</strong>
              <span>Across India</span>
            </div>
          </div>

          <div className="benefit">
            <ShieldCheck />
            <div>
              <strong>Secure checkout</strong>
              <span>Protected payments</span>
            </div>
          </div>

          <div className="benefit">
            <RotateCcw />
            <div>
              <strong>Easy returns</strong>
              <span>30-day guarantee</span>
            </div>
          </div>

          <div className="benefit">
            <Star />
            <div>
              <strong>Premium quality</strong>
              <span>Curated products</span>
            </div>
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EXPLORE</span>
              <h2>Shop by category</h2>
            </div>

            <a href="#featured" className="view-link">
              View all <ArrowRight size={16} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <img src={category.image} alt={category.name} />

                <div className="category-overlay">
                  <div>
                    <span>{category.count}</span>
                    <h3>{category.name}</h3>
                  </div>

                  <button>
                    <ArrowRight size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section featured-section" id="featured">
          <div className="section-heading">
            <div>
              <span className="section-kicker">HANDPICKED</span>
              <h2>Featured collection</h2>
            </div>

            <div className="product-filter">
              <button className="active">All</button>
              <button>Tech</button>
              <button>Fashion</button>
              <button>Life</button>
            </div>
          </div>

          <div className="product-grid">
            {apiProducts.map((product) => (
              <article className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />

                  <span className="product-badge">{product.badge}</span>

                  <button
                    className={`wishlist ${
                      liked.includes(product.id) ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart
                      size={19}
                      fill={
                        liked.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  <button
                    className="quick-add"
                    onClick={(event) => { event.stopPropagation(); addToCart(product, 1); }}
                  >
                    Quick add
                  </button>
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    <strong>{product.rating}</strong>
                    <span>({product.reviews})</span>
                  </div>

                  <div className="price-row">
                    <strong>${product.price}</strong>
                    <del>${product.oldPrice}</del>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=90"
              alt="CloudStore workspace"
            />
          </div>

          <div className="story-content">
            <span className="section-kicker">WHY CLOUDSTORE</span>

            <h2>
              Less noise.
              <br />
              More <em>good stuff.</em>
            </h2>

            <p>
              We believe shopping should feel intentional. CloudStore
              brings together products that combine thoughtful design,
              reliable performance and everyday usefulness.
            </p>

            <a href="#featured" className="outline-button">
              Discover CloudStore
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="newsletter">
          <div>
            <span className="section-kicker">STAY IN THE LOOP</span>
            <h2>Good things, occasionally.</h2>
            <p>New arrivals, private drops and stories worth opening.</p>
          </div>

          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="button">
              Subscribe
              <ArrowRight size={17} />
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="/">
              <span className="brand-mark">C</span>
              <span>
                CLOUD<span>STORE</span>
              </span>
            </a>

            <p>A modern marketplace for products worth having.</p>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <a href="#categories">Technology</a>
            <a href="#categories">Fashion</a>
            <a href="#categories">Lifestyle</a>
            <a href="#featured">New arrivals</a>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <a href="/">Shipping</a>
            <a href="/">Returns</a>
            <a href="/">Contact</a>
            <a href="/">FAQ</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#story">About us</a>
            <a href="/">Journal</a>
            <a href="/">Careers</a>
            <a href="/">Privacy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CloudStore. All rights reserved.</span>
          <span>Designed for the modern web.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
