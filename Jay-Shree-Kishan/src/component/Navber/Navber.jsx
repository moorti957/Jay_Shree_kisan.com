import React, { useState, useContext, useEffect, useRef } from "react";
import {
  FaHeart, FaUser, FaShoppingCart, FaSearch, FaLeaf,
  FaSignOutAlt, FaBoxOpen, FaClipboardList, FaBullhorn,
  FaUserCircle, FaHistory, FaBars, FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../component/UserContext";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [wishlistCount] = useState(0);
  const [cartCount] = useState(0);
  const { user, logout } = useContext(UserContext);
  const menuRef = useRef();
  const sidebarRef = useRef();

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("Searching for:", query);
    // Close mobile search after search (better UX)
    setMobileSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowUserMenu(false);
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setMobileSidebarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileSidebarOpen]);

  const confirmLogout = () => {
    logout();
    setShowLogoutPopup(false);
    setShowUserMenu(false);
    setMobileSidebarOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --g-dark: #008d39;
          --g-mid:  #2d7a4f;
          --gold:   #e8a020;
          --gold-l: #f5c842;
          --cream:  #faf7f0;
          --txt:    #1c1c1c;
          --muted:  #6b7c6b;
          --white:  #ffffff;
          --border: #e0ece0;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── NAVBAR BASE ── */
        .jsk-nav {
          font-family: 'DM Sans', sans-serif;
          background: var(--white);
          border-bottom: 2px solid #e8f0e8;
          box-shadow: 0 4px 24px rgba(26,77,46,0.10);
          position: sticky; top: 0; z-index: 1000; width: 100%;
        }

        /* Top Strip */
        .jsk-strip {
          background: var(--g-dark);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          text-align: center;
          padding: 8px 16px;
          letter-spacing: 0.03em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .jsk-strip b { color: var(--gold-l); font-weight: 600; }

        /* Main row - flex with improved spacing */
        .jsk-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 24px;
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: nowrap;
        }

        /* Hamburger (mobile/tablet) */
        .jsk-ham {
          display: none;
          background: none;
          border: none;
          color: var(--g-dark);
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .jsk-ham:hover { background: #f0f7f0; }

        /* Logo */
        .jsk-logo { flex-shrink: 0; }
        .jsk-logo a {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .jsk-logo-icon {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, var(--g-mid), var(--g-dark));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(45,122,79,0.25);
        }
        .jsk-logo-icon svg { color: var(--gold-l); font-size: 20px; }
        .jsk-logo-txt { display: flex; flex-direction: column; line-height: 1.2; }
        .jsk-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: var(--g-dark);
          font-weight: 700;
        }
        .jsk-logo-name em { font-style: normal; color: var(--g-mid); }
        .jsk-logo-sub {
          font-size: 9px;
          color: var(--muted);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Search Container - desktop */
        .jsk-srch {
          flex: 1;
          min-width: 180px;
          display: flex;
          align-items: center;
          background: var(--cream);
          border: 1.5px solid #d5e8d5;
          border-radius: 60px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .jsk-srch:focus-within {
          border-color: var(--g-mid);
          box-shadow: 0 0 0 3px rgba(45,122,79,0.10);
        }
        .jsk-srch input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          padding: 12px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--txt);
          outline: none;
        }
        .jsk-srch input::placeholder { color: var(--muted); }
        .jsk-srch button {
          background: var(--g-dark);
          border: none;
          color: var(--white);
          padding: 0 20px;
          height: 46px;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border-radius: 0 60px 60px 0;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .jsk-srch button:hover { background: var(--g-mid); }

        /* Actions container */
        .jsk-acts {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Mobile search toggle */
        .jsk-msrch-btn {
          display: none;
          background: none;
          border: none;
          color: var(--g-dark);
          font-size: 22px;
          cursor: pointer;
          padding: 8px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .jsk-msrch-btn:hover { background: #f0f7f0; }

        /* Icon button */
        .jsk-ibtn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 8px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          color: var(--txt);
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .jsk-ibtn:hover { background: #f0f7f0; transform: translateY(-1px); }
        .jsk-ibtn svg { font-size: 20px; color: var(--g-dark); }
        .jsk-ilbl { font-size: 10px; font-weight: 600; color: var(--muted); white-space: nowrap; }
        .jsk-bdg {
          position: absolute;
          top: 2px;
          right: 6px;
          background: var(--gold);
          color: white;
          font-size: 9px;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        /* Cart button */
        .jsk-cart {
          background: var(--g-dark);
          color: white;
          padding: 9px 16px;
          border-radius: 60px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          flex-shrink: 0;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          position: relative;
        }
        .jsk-cart:hover { background: var(--g-mid); transform: translateY(-1px); }
        .jsk-cart svg { color: white; font-size: 18px; }
        .jsk-cart-info { display: flex; flex-direction: column; line-height: 1.2; }
        .jsk-cart-lbl { font-size: 10px; color: rgba(255,255,255,0.8); font-weight: 500; }
        .jsk-cart-amt { font-size: 13px; color: var(--gold-l); font-weight: 700; }

        .jsk-div {
          width: 1px;
          height: 28px;
          background: var(--border);
          margin: 0 4px;
        }

        /* Sign in button */
        .jsk-signin {
          background: linear-gradient(135deg, var(--g-mid), var(--g-dark));
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 60px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 3px 14px rgba(45,122,79,0.28);
          white-space: nowrap;
        }
        .jsk-signin:hover { opacity: 0.9; transform: translateY(-1px); }

        /* User dropdown */
        .jsk-uwrap { position: relative; }
        .jsk-umenu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(26,77,46,0.15);
          min-width: 240px;
          overflow: hidden;
          border: 1px solid #e8f0e8;
          z-index: 9999;
          animation: mslide 0.18s ease;
        }
        @keyframes mslide {
          from { opacity:0; transform: translateY(-8px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* ── SIDEBAR & OVERLAY ── */
        .jsk-sb-ov {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(3px);
          z-index: 8000;
          animation: fdin 0.2s;
        }
        .jsk-sb-ov.open { display: block; }
        @keyframes fdin { from{opacity:0} to{opacity:1} }

        .jsk-sb {
          position: fixed;
          top: 0;
          left: -100%;
          width: min(320px, 85vw);
          height: 100vh;
          background: white;
          z-index: 8001;
          display: flex;
          flex-direction: column;
          box-shadow: 8px 0 30px rgba(0,0,0,0.2);
          transition: left 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
        }
        .jsk-sb.open { left: 0; }

        /* Sidebar inner styling */
        .jsk-sbhead {
          background: linear-gradient(135deg, var(--g-dark), var(--g-mid));
          padding: 20px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .jsk-sblogo {
          font-family: 'Playfair Display', serif;
          color: white;
          font-size: 18px;
          font-weight: 700;
        }
        .jsk-sblogo em { font-style: normal; color: var(--gold-l); }
        .jsk-sbclose {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
        }
        .jsk-sbclose:hover { background: rgba(255,255,255,0.25); }

        /* Responsive media queries */
        @media (max-width: 1024px) {
          .jsk-row { gap: 12px; padding: 10px 20px; }
          .jsk-srch button { padding: 0 16px; }
          .jsk-cart { padding: 8px 14px; }
        }

        /* Tablet & small desktop: Switch to mobile style at 840px for better usability */
        @media (max-width: 840px) {
          .jsk-ham { display: flex; }
          .jsk-srch { display: none; }
          .jsk-msrch-btn { display: flex; }
          .jsk-uwrap { display: none; }
          .jsk-wbtn { display: none; }
          .jsk-div { display: none; }
          .jsk-cart {
            background: #f0f7f0;
            padding: 8px 12px;
            border-radius: 12px;
          }
          .jsk-cart svg { color: var(--g-dark); }
          .jsk-cart-info { display: none; }
          .jsk-logo-sub { display: none; }
          .jsk-ilbl { display: none; }
          .jsk-logo-icon { width: 36px; height: 36px; }
          .jsk-logo-name { font-size: 16px; }
        }

        /* Mobile search bar slide-in */
        .jsk-mob-srch {
          display: none;
          padding: 10px 16px 14px;
          background: var(--white);
          border-top: 1px solid #e8f0e8;
          animation: sdrop 0.18s ease;
        }
        .jsk-mob-srch.open { display: flex; }
        .jsk-mob-srch .jsk-srch { width: 100%; display: flex; }

        /* Small phones */
        @media (max-width: 480px) {
          .jsk-strip { font-size: 11px; padding: 6px 12px; white-space: normal; word-break: keep-all; }
          .jsk-row { padding: 8px 12px; gap: 8px; }
          .jsk-logo-name { font-size: 14px; }
          .jsk-logo-icon { width: 32px; height: 32px; }
          .jsk-logo-icon svg { font-size: 16px; }
          .jsk-cart { padding: 6px 10px; }
          .jsk-cart svg { font-size: 16px; }
          .jsk-ham { font-size: 20px; padding: 6px; }
          .jsk-msrch-btn { font-size: 20px; padding: 6px; }
          .jsk-sb { width: 85vw; }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .jsk-logo-name { font-size: 12px; }
          .jsk-logo-icon { width: 28px; height: 28px; }
        }

        /* Reuse existing dropdown & sidebar link styles (unchanged but polished) */
        .jsk-mhead {
          background: linear-gradient(135deg, var(--g-dark), var(--g-mid));
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .jsk-mavatar {
          width: 38px; height: 38px; background: var(--gold);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 16px; color: white;
        }
        .jsk-muinfo { display: flex; flex-direction: column; }
        .jsk-muname { color: white; font-weight: 700; font-size: 14px; }
        .jsk-musub  { color: rgba(255,255,255,0.7); font-size: 11px; }
        .jsk-mitems { padding: 8px; }
        .jsk-mitem, .jsk-sblnk {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 12px;
          text-decoration: none; color: var(--txt);
          font-size: 14px; font-weight: 500;
          transition: background 0.15s; cursor: pointer;
          border: none; background: transparent; width: 100%;
          font-family: 'DM Sans', sans-serif; text-align: left;
        }
        .jsk-mitem:hover, .jsk-sblnk:hover { background: #f0f7f0; color: var(--g-dark); }
        .jsk-mitem svg, .jsk-sblnk svg { color: var(--g-mid); font-size: 16px; flex-shrink: 0; }
        .jsk-msep { height: 1px; background: #eef4ee; margin: 8px 8px; }
        .jsk-mlogout, .jsk-sblogout { color: #c0392b !important; }
        .jsk-mlogout:hover, .jsk-sblogout:hover { background: #fff0ee !important; }
        .jsk-sbuser {
          padding: 16px; display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid #e8f0e8;
        }
        .jsk-sbav {
          width: 44px; height: 44px; background: var(--gold);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 18px; color: white;
        }
        .jsk-sbuname { font-weight: 700; font-size: 15px; }
        .jsk-sbrole { font-size: 11px; color: var(--muted); }
        .jsk-sblinks { padding: 12px 8px; flex: 1; }
        .jsk-sbbottom {
          padding: 16px; display: flex; gap: 12px;
          border-top: 1px solid #e8f0e8;
        }
        .jsk-sbcard {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 10px; border-radius: 14px; background: #f5faf5;
          border: 1px solid #ddf0dd; cursor: pointer; text-decoration: none;
          transition: background 0.15s;
        }
        .jsk-sbcard svg { color: var(--g-dark); font-size: 20px; }
        .jsk-sbcard span { font-size: 11px; color: var(--muted); font-weight: 600; }

        /* Logout Popup */
        .jsk-ov {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
          z-index: 10000; display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .jsk-pop {
          background: white; border-radius: 28px;
          padding: 28px 24px; width: 100%; max-width: 340px;
          text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          animation: popin 0.22s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes popin {
          from { transform: scale(0.9); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .jsk-pop-ico {
          width: 60px; height: 60px; background: #fff0ee; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px; font-size: 26px; color: #c0392b;
        }
        .jsk-pop h3 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 8px; }
        .jsk-pop p { font-size: 14px; color: var(--muted); margin-bottom: 24px; }
        .jsk-pop-btns { display: flex; gap: 12px; }
        .jsk-cancel, .jsk-confirm {
          flex: 1; padding: 12px; border-radius: 60px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; border: none;
        }
        .jsk-cancel { background: #f0f4f0; color: var(--txt); }
        .jsk-confirm { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; box-shadow: 0 3px 12px rgba(192,57,43,0.3); }
        .jsk-confirm:hover { opacity: 0.9; }
      `}</style>

      {/* Sidebar overlay */}
      <div className={`jsk-sb-ov${mobileSidebarOpen ? " open" : ""}`}
           onClick={() => setMobileSidebarOpen(false)} />

      {/* Mobile Sidebar */}
      <div className={`jsk-sb${mobileSidebarOpen ? " open" : ""}`} ref={sidebarRef}>
        <div className="jsk-sbhead">
          <span className="jsk-sblogo"><em>Jay Shree</em> Kisan</span>
          <button className="jsk-sbclose" onClick={() => setMobileSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {user && (
          <div className="jsk-sbuser">
            <div className="jsk-sbav">{user.username?.charAt(0).toUpperCase()}</div>
            <div>
              <div className="jsk-sbuname">{user.username}</div>
              <div className="jsk-sbrole">Farmer / Buyer</div>
            </div>
          </div>
        )}

        <div className="jsk-sblinks">
          {user ? (
            <>
              <Link to="/my-products"      className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaBoxOpen />      My Products</Link>
              <Link to="/buySellForm"       className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaClipboardList /> List Your Product</Link>
              <Link to="/my-requirements"  className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaClipboardList /> My Requirements</Link>
              <Link to="/post-requirement" className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaBullhorn />      Post Buy Requirement</Link>
              <Link to="/account"          className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaUserCircle />    My Account</Link>
              <Link to="/my-activity"      className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}><FaHistory />       My Activity</Link>
              <div className="jsk-msep" />
              <button className="jsk-sblnk jsk-sblogout" onClick={() => setShowLogoutPopup(true)}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/signIn" className="jsk-sblnk" onClick={() => setMobileSidebarOpen(false)}>
              <FaUser /> Sign In
            </Link>
          )}
        </div>

        <div className="jsk-sbbottom">
          <Link to="/wishlist" className="jsk-sbcard" onClick={() => setMobileSidebarOpen(false)}>
            <FaHeart /><span>Wishlist</span>
          </Link>
          <Link to="/cart" className="jsk-sbcard" onClick={() => setMobileSidebarOpen(false)}>
            <FaShoppingCart /><span>My Cart</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="jsk-nav">
        <div className="jsk-strip">
          🌾 Kisan ka Bazaar — <b>Fresh, Direct, Trusted</b> | Free Delivery above ₹500
        </div>

        <div className="jsk-row">
          {/* Hamburger */}
          <button className="jsk-ham" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <FaBars />
          </button>

          {/* Logo */}
          <div className="jsk-logo">
            <Link to="/">
              <div className="jsk-logo-icon"><FaLeaf /></div>
              <div className="jsk-logo-txt">
                <span className="jsk-logo-name"><em>Jay Shree</em> Kisan</span>
                <span className="jsk-logo-sub">Farm to Table</span>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="jsk-srch">
            <input
              type="text"
              placeholder="Search vegetables, grains, dairy..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>
              <FaSearch /><span className="search-text"> Search</span>
            </button>
          </div>

          {/* Actions */}
          <div className="jsk-acts">
            {/* Mobile search toggle */}
            <button className="jsk-msrch-btn" onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="Search">
              {mobileSearchOpen ? <FaTimes /> : <FaSearch />}
            </button>

            {/* Wishlist */}
            <button className="jsk-ibtn jsk-wbtn" aria-label="Wishlist">
              <FaHeart />
              {wishlistCount > 0 && <span className="jsk-bdg">{wishlistCount}</span>}
              <span className="jsk-ilbl">Wishlist</span>
            </button>

            <div className="jsk-div" />

            {/* Desktop User */}
            <div className="jsk-uwrap" ref={menuRef}>
              {user ? (
                <>
                  <button className="jsk-ibtn" onClick={() => setShowUserMenu(!showUserMenu)} aria-label="Account">
                    <FaUser />
                    <span className="jsk-ilbl">Account</span>
                  </button>
                  {showUserMenu && (
                    <div className="jsk-umenu">
                      <div className="jsk-mhead">
                        <div className="jsk-mavatar">{user.username?.charAt(0).toUpperCase()}</div>
                        <div className="jsk-muinfo">
                          <span className="jsk-muname">{user.username}</span>
                          <span className="jsk-musub">Farmer / Buyer</span>
                        </div>
                      </div>
                      <div className="jsk-mitems">
                        <Link to="/my-products"      className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaBoxOpen />      My Products</Link>
                        <Link to="/buySellForm"       className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaClipboardList /> List Your Product</Link>
                        <Link to="/my-requirements"  className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaClipboardList /> My Requirements</Link>
                        <Link to="/post-requirement" className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaBullhorn />      Post Buy Requirement</Link>
                        <Link to="/account"          className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaUserCircle />    My Account</Link>
                        <Link to="/my-activity"      className="jsk-mitem" onClick={() => setShowUserMenu(false)}><FaHistory />       My Activity</Link>
                        <div className="jsk-msep" />
                        <button className="jsk-mitem jsk-mlogout" onClick={() => setShowLogoutPopup(true)}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/signIn" className="jsk-signin"><FaUser /> Sign In</Link>
              )}
            </div>

            <div className="jsk-div" />

            {/* Cart */}
            <Link to="/cart" className="jsk-cart" aria-label="Cart">
              <FaShoppingCart />
              <div className="jsk-cart-info">
                <span className="jsk-cart-lbl">My Cart ({cartCount})</span>
                <span className="jsk-cart-amt">₹0.00</span>
              </div>
              {cartCount > 0 && <span className="jsk-bdg">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Mobile search expandable bar */}
        <div className={`jsk-mob-srch${mobileSearchOpen ? " open" : ""}`}>
          <div className="jsk-srch" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search vegetables, grains..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={mobileSearchOpen}
            />
            <button onClick={handleSearch}><FaSearch /></button>
          </div>
        </div>
      </nav>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="jsk-ov">
          <div className="jsk-pop">
            <div className="jsk-pop-ico"><FaSignOutAlt /></div>
            <h3>Logout Confirmation</h3>
            <p>Kya aap sach mein logout karna chahte hain?</p>
            <div className="jsk-pop-btns">
              <button className="jsk-cancel"  onClick={() => setShowLogoutPopup(false)}>Cancel</button>
              <button className="jsk-confirm" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;