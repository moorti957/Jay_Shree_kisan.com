import React from "react";
import { FaShippingFast, FaRegClock, FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";

const Footer = () => {
  return (
    <>
      <style>{`
        :root {
          --g-dark: #1a4d2e; --g-mid: #2d7a4f; --g-light: #4caf78;
          --gold: #e8a020; --gold-l: #f5c842;
        }
        .ft { background: #0f2d1a; color: rgba(255,255,255,0.8); font-size: 14px; }

        /* FEATURES STRIP */
        .ft-features {
          background: linear-gradient(135deg, var(--g-dark), var(--g-mid));
          display: grid; grid-template-columns: repeat(4, 1fr);
          position: relative;
        }
        .ft-features::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .ft-feat {
          display: flex; align-items: center; gap: 14px;
          padding: 22px 24px;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .ft-feat:last-child { border-right: none; }
        .ft-feat:hover { background: rgba(255,255,255,0.04); }
        .ft-feat-icon {
          width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: #7a4800;
        }
        .ft-feat-title { font-size: 13px; font-weight: 800; color: white; margin-bottom: 2px; }
        .ft-feat-sub { font-size: 11px; color: rgba(255,255,255,0.55); }

        /* MAIN LINKS */
        .ft-main {
          max-width: 1100px; margin: 0 auto;
          padding: 52px 28px 40px;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px;
        }
        .ft-brand-name { font-size: 22px; font-weight: 800; color: white; margin-bottom: 10px; }
        .ft-brand-name span { color: var(--gold-l); }
        .ft-brand-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.8; margin-bottom: 20px; }
        .ft-nl-form { display: flex; gap: 8px; }
        .ft-nl-input {
          flex: 1; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 50px;
          padding: 9px 16px; color: white; font-size: 12px; outline: none;
        }
        .ft-nl-input::placeholder { color: rgba(255,255,255,0.35); }
        .ft-nl-input:focus { border-color: var(--gold); }
        .ft-nl-btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800; border: none; border-radius: 50px;
          padding: 9px 18px; font-size: 12px; font-weight: 800;
          cursor: pointer; white-space: nowrap; transition: opacity 0.2s;
        }
        .ft-nl-btn:hover { opacity: 0.88; }
        .ft-col-title {
          font-size: 12px; font-weight: 800; color: white;
          text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }
        .ft-col-title::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08);
        }
        .ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; padding: 0; }
        .ft-col ul li {
          font-size: 13px; color: rgba(255,255,255,0.55); cursor: pointer;
          transition: color 0.2s; display: flex; align-items: center; gap: 6px;
        }
        .ft-col ul li::before { content: '›'; color: var(--gold); font-size: 16px; line-height: 1; }
        .ft-col ul li:hover { color: var(--gold-l); }

        /* BOTTOM BAR */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          max-width: 1100px; margin: 0 auto;
          padding: 24px 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .ft-contact { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .ft-contact-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,0.5); }
        .ft-contact-item svg { color: var(--g-light); font-size: 14px; }
        .ft-social { display: flex; gap: 8px; }
        .ft-soc-btn {
          width: 34px; height: 34px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: rgba(255,255,255,0.55);
          cursor: pointer; transition: all 0.2s;
        }
        .ft-soc-btn:hover { background: var(--g-mid); color: white; border-color: var(--g-mid); }
        .ft-payment { display: flex; gap: 8px; align-items: center; }
        .ft-pay-badge {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px; padding: 4px 10px;
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 0.04em;
        }
        .ft-copy {
          text-align: center; font-size: 11px; color: rgba(255,255,255,0.25);
          padding: 12px 28px 20px; max-width: 1100px; margin: 0 auto;
        }

        @media (max-width: 900px) {
          .ft-features { grid-template-columns: repeat(2, 1fr); }
          .ft-main { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ft-features { grid-template-columns: 1fr; }
          .ft-main { grid-template-columns: 1fr; gap: 28px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="ft">

        {/* Features Strip */}
        <div className="ft-features">
          {[
            { icon: <FaShippingFast />, title: "Free Shipping", sub: "On Order ₹500+ — 7 Days a Week" },
            { icon: <MdOutlineAttachMoney />, title: "Money Back Guarantee", sub: "Return within 30 days" },
            { icon: <LuBoxes />, title: "Free Returns", sub: "Free 90-day returns policy" },
            { icon: <FaRegClock />, title: "24/7 Customer Service", sub: "Call us anytime at 000-123-455" },
          ].map((f, i) => (
            <div className="ft-feat" key={i}>
              <div className="ft-feat-icon">{f.icon}</div>
              <div>
                <div className="ft-feat-title">{f.title}</div>
                <div className="ft-feat-sub">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Links */}
        <div className="ft-main">
          <div>
            <div className="ft-brand-name">Jay Shree <span>Kisan</span></div>
            <p className="ft-brand-desc">
              Your premier online agricultural marketplace connecting farmers,
              agribusinesses, and buyers across India. Experience the future of
              agri-trade at your fingertips.
            </p>
            <div className="ft-nl-form">
              <input className="ft-nl-input" type="email" placeholder="Your email address..." />
              <button className="ft-nl-btn">Subscribe</button>
            </div>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">Information</div>
            <ul>
              {["About Us","Delivery Information","Privacy Policy","Terms & Conditions","Brands"].map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">My Account</div>
            <ul>
              {["My Account","Order History","Wish List","Newsletter","Specials"].map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">Customer Service</div>
            <ul>
              {["Contact Us","Returns","Site Map","Gift Certificates","Affiliate"].map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ft-bottom">
          <div className="ft-contact">
            <div className="ft-contact-item">
              📍 9070 Green Lake Drive, Chevy Chase, MD 20815, India
            </div>
            <div className="ft-contact-item">
              📞 0123-456-789
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="ft-social">
              <button className="ft-soc-btn" aria-label="Facebook"><FaFacebookF /></button>
              <button className="ft-soc-btn" aria-label="Instagram"><FaInstagram /></button>
              <button className="ft-soc-btn" aria-label="Pinterest"><FaPinterestP /></button>
            </div>
            <div className="ft-payment">
              {["VISA","MC","AMEX","UPI"].map(p => <span className="ft-pay-badge" key={p}>{p}</span>)}
            </div>
          </div>
        </div>

        <div className="ft-copy">
          Powered by Jay Shree Kisan &nbsp;©&nbsp; 2025. All rights reserved.
        </div>

      </footer>
    </>
  );
};

export default Footer;