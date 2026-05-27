import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

const stateDistricts = {
  UP: ["Agra","Lucknow","Varanasi","Kanpur","Noida","Prayagraj","Ghaziabad","Aligarh","Meerut","Bareilly","Gorakhpur","Moradabad","Saharanpur"],
  MH: ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Thane","Kolhapur","Solapur","Amravati","Satara"],
  RJ: ["Jaipur","Udaipur","Jodhpur","Kota","Ajmer","Bikaner","Alwar","Sikar","Bharatpur"],
  DL: ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","Shahdara"],
  GJ: ["Ahmedabad","Surat","Vadodara","Rajkot","Gandhinagar","Bhavnagar","Junagadh","Kutch"],
  MP: ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar","Satna","Rewa"],
  BR: ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia","Ara","Begusarai"],
  WB: ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Malda","Murshidabad"],
  TN: ["Chennai","Madurai","Coimbatore","Tiruchirappalli","Salem","Erode","Tirunelveli"],
  KA: ["Bengaluru","Mysuru","Mangaluru","Hubballi","Belagavi","Davangere","Shivamogga"],
  KL: ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kannur","Alappuzha","Kollam"],
  PB: ["Amritsar","Ludhiana","Jalandhar","Patiala","Bathinda","Mohali","Gurdaspur"],
  HR: ["Gurugram","Faridabad","Panipat","Ambala","Hisar","Sonipat","Rohtak"],
  AS: ["Guwahati","Dibrugarh","Silchar","Tezpur","Jorhat","Nagaon","Bongaigaon"],
  JK: ["Srinagar","Jammu","Anantnag","Baramulla","Kathua","Kupwara","Pulwama"],
  UK: ["Dehradun","Haridwar","Nainital","Almora","Pauri Garhwal","Tehri Garhwal"],
  OD: ["Bhubaneswar","Cuttack","Rourkela","Puri","Balasore","Sambalpur"],
  CH: ["Chandigarh"],
  AN: ["Port Blair"],
  PY: ["Puducherry","Karaikal","Mahe","Yanam"],
  LA: ["Leh","Kargil"],
  LD: ["Kavaratti"],
  DH: ["Daman","Diu","Silvassa"],
};

const STEPS = [
  { label: "Product details", icon: "🌱" },
  { label: "Location", icon: "📍" },
  { label: "Features", icon: "✦" },
  { label: "Contact", icon: "👤" },
];

const FEATURES = [
  { key: "isOrganic",   icon: "", name: "Organic",        sub: "No chemical inputs" },
  { key: "isProcessed", icon: "",  name: "Processed",      sub: "Post-harvest processed" },
  { key: "isGraded",    icon: "", name: "Graded",         sub: "Size / quality sorted" },
  { key: "isPacked",    icon: "", name: "Packed in bags",  sub: "Ready for shipment" },
  { key: "isStoredAC",  icon: "",  name: "Cold storage",   sub: "Stored in AC facility" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');

  .agri-root *, .agri-root *::before, .agri-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .agri-root {
    font-family: 'DM Sans', sans-serif;
    background: #f0f4ed;
    min-height: 100vh;
    padding: 2rem 1rem 4rem;
  }

  .agri-wrap {
    max-width: 860px;
    margin: 0 auto;
  }

  /* ── Page header ── */
  .agri-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .agri-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #d4edbd;
    color: #2d5a16;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 99px;
    margin-bottom: 12px;
  }
  .agri-header h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 700;
    color: #1a3a08;
    margin-bottom: 6px;
  }
  .agri-header p {
    font-size: 14px;
    color: #5a7a48;
  }

  /* ── Progress bar ── */
  .agri-progress {
    background: #fff;
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.75rem;
    box-shadow: 0 2px 12px rgba(60,120,20,.08);
  }
  .agri-steps {
    display: flex;
    align-items: flex-start;
    position: relative;
  }
  .agri-steps-line {
    position: absolute;
    top: 17px;
    left: 17px;
    right: 17px;
    height: 2px;
    background: #e2ecd8;
    border-radius: 2px;
    z-index: 0;
  }
  .agri-steps-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b7d16, #57bc0a);
    border-radius: 2px;
    transition: width .45s cubic-bezier(.4,0,.2,1);
  }
  .agri-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    z-index: 1;
  }
  .agri-step-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #c8ddb8;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #8aaa70;
    transition: all .3s;
  }
  .agri-step.done .agri-step-circle {
    background: #3b7d16;
    border-color: #3b7d16;
    color: #fff;
  }
  .agri-step.active .agri-step-circle {
    background: #1a4d2e;
    border-color: #70c231;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(112,194,49,.2);
  }
  .agri-step-label {
    font-size: 11px;
    font-weight: 500;
    color: #9ab882;
    text-align: center;
    max-width: 70px;
    line-height: 1.35;
  }
  .agri-step.active .agri-step-label { color: #3b7d16; font-weight: 600; }
  .agri-step.done  .agri-step-label  { color: #3b7d16; }

  /* ── Cards ── */
  .agri-card {
    background: #fff;
    border-radius: 18px;
    padding: 1.5rem 1.75rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 2px 16px rgba(60,120,20,.07);
    border: 1px solid #e8f1e0;
    transition: box-shadow .2s;
  }
  .agri-card:hover { box-shadow: 0 4px 24px rgba(60,120,20,.11); }

  .agri-card-head {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding-bottom: 1.1rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #eef5e8;
  }
  .agri-card-icon {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #03c81e, #0c5102);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }
  .agri-card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #1a3a08;
    margin-bottom: 3px;
  }
  .agri-card-desc {
    font-size: 12px;
    color: #7a9a60;
    line-height: 1.45;
  }

  /* ── Type toggle ── */
  .agri-type-row {
    display: flex;
    gap: 10px;
    margin-bottom: 1.25rem;
  }
  .agri-type-btn {
    flex: 1;
    padding: 12px 10px;
    border-radius: 12px;
    border: 1.5px solid #ddeeca;
    background: #f7fbf2;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #509055;
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .agri-type-btn:hover { border-color: #70c231; background: #edfade; }
  .agri-type-btn.active {
    border-color: #3b7d16;
    background: linear-gradient(108deg, #aafc9e, #ffffff);
    color: #1a3a08;
    box-shadow: 0 2px 10px rgba(59,125,22,.15);
  }

  /* ── Quality buttons ── */
  .agri-quality-row {
    display: flex;
    gap: 8px;
  }
  .agri-quality-btn {
    flex: 1;
    padding: 9px 8px;
    border-radius: 10px;
    border: 1.5px solid #ddeeca;
    background: #f7fbf2;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #7a9a60;
    transition: all .2s;
    text-align: center;
  }
  .agri-quality-btn:hover { border-color: #11b90e; }
  .agri-quality-btn.active {
    border-color: #3b7d16;
    background: linear-gradient(135deg, #d4edbd, #c5e6a0);
    color: #1a3a08;
  }

  /* ── Grid layouts ── */
  .agri-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 580px) {
    .agri-grid2 { grid-template-columns: 1fr; }
    .agri-type-btn .btn-label { display: none; }
  }

  /* ── Fields ── */
  .agri-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .agri-label {
    font-size: 12px;
    font-weight: 600;
    color: #5a7a48;
    letter-spacing: .03em;
    text-transform: uppercase;
  }
  .agri-input, .agri-select, .agri-textarea {
    width: 100%;
    padding: 10px 13px;
    border-radius: 10px;
    border: 1.5px solid #ddeeca;
    background: #f7fbf2;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a3a08;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .agri-input::placeholder, .agri-textarea::placeholder { color: #aac48a; }
  .agri-input:focus, .agri-select:focus, .agri-textarea:focus {
    border-color: #70c231;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(112,194,49,.15);
  }
  .agri-textarea { resize: vertical; min-height: 88px; line-height: 1.55; }
  .agri-select { appearance: none; cursor: pointer; }

  .agri-input-wrap {
    position: relative;
  }
  .agri-input-wrap .agri-input { padding-left: 38px; }
  .agri-input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
  }

  /* ── Feature cards ── */
  .agri-feat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
  }
  .agri-feat-card {
    border: 1.5px solid #ddeeca;
    border-radius: 14px;
    padding: 14px 12px;
    cursor: pointer;
    transition: all .2s;
    background: #f7fbf2;
    display: flex;
    flex-direction: column;
    gap: 8px;
    user-select: none;
  }
  .agri-feat-card:hover { border-color: #70c231; background: #edfade; }
  .agri-feat-card.active {
    border-color: #3b7d16;
    background: linear-gradient(135deg, #d4edbd, #c5e6a0);
    box-shadow: 0 2px 10px rgba(59,125,22,.12);
  }
  .agri-feat-icon {
    font-size: 24px;
    line-height: 1;
  }
  .agri-feat-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a3a08;
    line-height: 1.3;
  }
  .agri-feat-sub {
    font-size: 11px;
    color: #7a9a60;
    line-height: 1.3;
  }
  .agri-feat-card.active .agri-feat-sub { color: #3b7d16; }

  /* ── Upload zone ── */
  .agri-upload-zone {
    border: 2px dashed #b6e08a;
    border-radius: 16px;
    padding: 2.5rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    background: #f7fbf2;
  }
  .agri-upload-zone:hover, .agri-upload-zone.drag {
    border-color: #3b7d16;
    background: #edfade;
  }
  .agri-upload-emoji { font-size: 44px; margin-bottom: 10px; }
  .agri-upload-title { font-size: 15px; font-weight: 600; color: #1a3a08; margin-bottom: 4px; }
  .agri-upload-sub { font-size: 12px; color: #7a9a60; }
  .agri-upload-cta {
    display: inline-block;
    margin-top: 14px;
    padding: 8px 22px;
    background: #3b7d16;
    color: #fff;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s;
  }
  .agri-upload-cta:hover { background: #2d5a16; }
  .agri-preview-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }
  .agri-preview-img {
    width: 74px;
    height: 74px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid #c5e6a0;
  }

  /* ── Terms card ── */
  .agri-terms-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 1rem 1.25rem;
    background: #f7fbf2;
    border: 1.5px solid #ddeeca;
    border-radius: 12px;
    cursor: pointer;
  }
  .agri-terms-row input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #3b7d16;
    flex-shrink: 0;
    margin-top: 2px;
    cursor: pointer;
  }
  .agri-terms-text {
    font-size: 13px;
    color: #5a7a48;
    line-height: 1.55;
  }
  .agri-terms-link { color: #3b7d16; font-weight: 600; cursor: pointer; }

  /* ── Submit row ── */
  .agri-submit-row {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 1.5rem;
  }
  @media (max-width: 480px) {
    .agri-submit-row { flex-direction: column; }
    .agri-btn-reset, .agri-btn-submit { width: 100%; justify-content: center; }
  }
  .agri-btn-reset {
    padding: 12px 26px;
    border-radius: 12px;
    border: 1.5px solid #ddeeca;
    background: transparent;
    color: #7a9a60;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s;
  }
  .agri-btn-reset:hover { background: #f0f8e8; color: #3b7d16; }
  .agri-btn-submit {
    padding: 12px 32px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #3b7d16, #70c231);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(59,125,22,.3);
    letter-spacing: .02em;
  }
  .agri-btn-submit:hover { background: linear-gradient(135deg, #2d5a16, #3b7d16); box-shadow: 0 6px 20px rgba(59,125,22,.4); transform: translateY(-1px); }
  .agri-btn-submit:active { transform: scale(.98); }
  .agri-btn-submit:disabled { opacity: .65; cursor: not-allowed; transform: none; }

  /* ── Success banner ── */
  .agri-success {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.25rem;
    background: #d4edbd;
    border: 1px solid #a8d880;
    border-radius: 14px;
    margin-top: 1.25rem;
  }
  .agri-success-icon { font-size: 24px; }
  .agri-success-text { font-size: 14px; font-weight: 600; color: #1a3a08; }
`;

const BuySellForm = () => {
  const [formData, setFormData] = useState({
    type: "SELL",
    commodity: "",
    quantity: "",
    state: "",
    district: "",
    quality: "Good",
    availableFrom: "",
    language: "English",
    comments: "",
    isOrganic: false,
    isProcessed: false,
    isGraded: false,
    isPacked: false,
    isStoredAC: false,
    image: null,
    name: "",
    email: "",
  });
  const [previews, setPreviews] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleImageFiles = (files) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    setFormData((prev) => ({ ...prev, image: imgs[0] }));
    setPreviews((prev) => [...prev, ...imgs.map((f) => URL.createObjectURL(f))]);
  };

  /* ── Progress calculation ── */
  const s1Done = !!(formData.commodity && formData.quantity);
  const s2Done = !!(formData.state && formData.district);
  const s4Done = !!(formData.name && formData.email);
  const progressPct = s4Done ? 100 : s2Done ? 60 : s1Done ? 25 : 0;

  const stepState = (n) => {
    if (n === 1) return s1Done ? "done" : "active";
    if (n === 2) return s2Done ? "done" : s1Done ? "active" : "";
    if (n === 3) return s2Done ? "active" : "";
    if (n === 4) return s4Done ? "done" : s2Done ? "active" : "";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        Swal.fire({
          title: "Success!",
          text: "Your listing has been submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b7d16",
        }).then(() => window.location.reload());
      } else {
        Swal.fire({ title: "Error!", text: data.error, icon: "error", confirmButtonText: "Try Again", confirmButtonColor: "#3b7d16" });
      }
    } catch {
      Swal.fire({ title: "Failed!", text: "Something went wrong!", icon: "error", confirmButtonText: "OK", confirmButtonColor: "#3b7d16" });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ type: "SELL", commodity: "", quantity: "", state: "", district: "", quality: "Good", availableFrom: "", language: "English", comments: "", isOrganic: false, isProcessed: false, isGraded: false, isPacked: false, isStoredAC: false, image: null, name: "", email: "" });
    setPreviews([]);
    setSubmitted(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="agri-root">
        <div className="agri-wrap">

          {/* ── Page header ── */}
          <div className="agri-header">
            <div className="agri-header-badge">🌾 AgriMarket Platform</div>
            <h1>List Your Agricultural Produce</h1>
            <p>Connect directly with buyers and sellers across India</p>
          </div>

          {/* ── Progress tracker ── */}
          <div className="agri-progress">
            <div className="agri-steps">
              <div className="agri-steps-line">
                <div className="agri-steps-fill" style={{ width: `${progressPct}%` }} />
              </div>
              {STEPS.map((s, i) => {
                const st = stepState(i + 1);
                return (
                  <div key={i} className={`agri-step ${st}`}>
                    <div className="agri-step-circle">
                      {st === "done" ? "✓" : i + 1}
                    </div>
                    <div className="agri-step-label">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── 1. Product Details ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">🌱</div>
                <div>
                  <div className="agri-card-title">Product details</div>
                  <div className="agri-card-desc">Tell us what you want to buy or sell and the quantity available</div>
                </div>
              </div>

              <div className="agri-type-row">
                <button type="button" className={`agri-type-btn${formData.type === "SELL" ? " active" : ""}`} onClick={() => setFormData((p) => ({ ...p, type: "SELL" }))}>
                  🏷️ <span className="btn-label">Sell my produce</span>
                </button>
                <button type="button" className={`agri-type-btn${formData.type === "BUY" ? " active" : ""}`} onClick={() => setFormData((p) => ({ ...p, type: "BUY" }))}>
                  🛒 <span className="btn-label">Looking to buy</span>
                </button>
              </div>

              <div className="agri-grid2" style={{ marginBottom: "1rem" }}>
                <div className="agri-field">
                  <label className="agri-label">Commodity *</label>
                  <input className="agri-input" type="text" name="commodity" placeholder="e.g. Tomato, Potato, Onion" value={formData.commodity} onChange={handleChange} required />
                </div>
                <div className="agri-field">
                  <label className="agri-label">Available quantity *</label>
                  <input className="agri-input" type="text" name="quantity" placeholder="e.g. 100 KG, 5 TON" value={formData.quantity} onChange={handleChange} required />
                </div>
              </div>

              <div className="agri-field">
                <label className="agri-label">Quality grade</label>
                <div className="agri-quality-row">
                  {["Average", "Good", "Best"].map((q) => (
                    <button key={q} type="button" className={`agri-quality-btn${formData.quality === q ? " active" : ""}`} onClick={() => setFormData((p) => ({ ...p, quality: q }))}>
                      {q === "Best" ? `${q} ✦` : q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 2. Location ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">📍</div>
                <div>
                  <div className="agri-card-title">Location</div>
                  <div className="agri-card-desc">Select your state and district so buyers/sellers can find you</div>
                </div>
              </div>
              <div className="agri-grid2">
                <div className="agri-field">
                  <label className="agri-label">State *</label>
                  <select className="agri-select" name="state" value={formData.state} onChange={handleChange} required>
                    <option value="">— Select state —</option>
                    {[["AP","Andhra Pradesh"],["AR","Arunachal Pradesh"],["AS","Assam"],["BR","Bihar"],["CG","Chhattisgarh"],["GA","Goa"],["GJ","Gujarat"],["HR","Haryana"],["HP","Himachal Pradesh"],["JH","Jharkhand"],["KA","Karnataka"],["KL","Kerala"],["MP","Madhya Pradesh"],["MH","Maharashtra"],["MN","Manipur"],["ML","Meghalaya"],["MZ","Mizoram"],["NL","Nagaland"],["OD","Odisha"],["PB","Punjab"],["RJ","Rajasthan"],["SK","Sikkim"],["TN","Tamil Nadu"],["TS","Telangana"],["TR","Tripura"],["UP","Uttar Pradesh"],["UK","Uttarakhand"],["WB","West Bengal"],["AN","Andaman & Nicobar"],["CH","Chandigarh"],["DH","Daman, Diu & Dadra"],["DL","Delhi"],["JK","Jammu & Kashmir"],["LA","Ladakh"],["LD","Lakshadweep"],["PY","Puducherry"]].map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="agri-field">
                  <label className="agri-label">District *</label>
                  <select className="agri-select" name="district" value={formData.district} onChange={handleChange} required>
                    <option value="">— Select district —</option>
                    {(stateDistricts[formData.state] || []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── 3. Availability ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">📅</div>
                <div>
                  <div className="agri-card-title">Availability &amp; preferences</div>
                  <div className="agri-card-desc">When is your produce available and preferred contact language?</div>
                </div>
              </div>
              <div className="agri-grid2" style={{ marginBottom: "1rem" }}>
                <div className="agri-field">
                  <label className="agri-label">Available from</label>
                  <input className="agri-input" type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} />
                </div>
                <div className="agri-field">
                  <label className="agri-label">Language preference</label>
                  <select className="agri-select" name="language" value={formData.language} onChange={handleChange}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>
              <div className="agri-field">
                <label className="agri-label">Additional comments</label>
                <textarea className="agri-textarea" name="comments" placeholder="Describe packaging, transport availability, pricing expectations..." value={formData.comments} onChange={handleChange} />
              </div>
            </div>

            {/* ── 4. Product Features ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">✨</div>
                <div>
                  <div className="agri-card-title">Product features</div>
                  <div className="agri-card-desc">Select all attributes that apply to your product</div>
                </div>
              </div>
              <div className="agri-feat-grid">
                {FEATURES.map(({ key, icon, name, sub }) => (
                  <div
                    key={key}
                    className={`agri-feat-card${formData[key] ? " active" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, [key]: !p[key] }))}
                  >
                    <div className="agri-feat-icon">{icon}</div>
                    <div className="agri-feat-name">{name}</div>
                    <div className="agri-feat-sub">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. Image Upload ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">📸</div>
                <div>
                  <div className="agri-card-title">Product images</div>
                  <div className="agri-card-desc">Add clear photos to attract more buyers</div>
                </div>
              </div>
              <div
                className={`agri-upload-zone${dragging ? " drag" : ""}`}
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handleImageFiles(e.dataTransfer.files); }}
              >
                <div className="agri-upload-emoji">☁️</div>
                <div className="agri-upload-title">Drag &amp; drop your images here</div>
                <div className="agri-upload-sub">Supports JPG, PNG, WEBP — max 5 MB each</div>
                <span className="agri-upload-cta">Browse files</span>
                <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handleImageFiles(e.target.files)} />
              </div>
              {previews.length > 0 && (
                <div className="agri-preview-grid">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt={`Preview ${i + 1}`} className="agri-preview-img" />
                  ))}
                </div>
              )}
            </div>

            {/* ── 6. Contact Details ── */}
            <div className="agri-card">
              <div className="agri-card-head">
                <div className="agri-card-icon">👤</div>
                <div>
                  <div className="agri-card-title">Contact details</div>
                  <div className="agri-card-desc">Interested parties will use these details to reach you</div>
                </div>
              </div>
              <div className="agri-grid2">
                <div className="agri-field">
                  <label className="agri-label">Full name *</label>
                  <div className="agri-input-wrap">
                    <span className="agri-input-icon">👤</span>
                    <input className="agri-input" type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="agri-field">
                  <label className="agri-label">Email address *</label>
                  <div className="agri-input-wrap">
                    <span className="agri-input-icon">✉️</span>
                    <input className="agri-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            </div>

            {/* ── 7. Terms ── */}
            <div className="agri-card" style={{ padding: "1.25rem 1.75rem" }}>
              <div className="agri-card-head">
                <div className="agri-card-icon">📋</div>
                <div>
                  <div className="agri-card-title">Terms &amp; conditions</div>
                  <div className="agri-card-desc">Please review and agree before submitting</div>
                </div>
              </div>
              <label className="agri-terms-row">
                <input type="checkbox" required />
                <div className="agri-terms-text">
                  I confirm the information provided is accurate and I agree to the{" "}
                  <span className="agri-terms-link">Terms and Conditions</span> and{" "}
                  <span className="agri-terms-link">Privacy Policy</span> of the AgriMarket platform.
                </div>
              </label>
            </div>

            {/* ── Submit ── */}
            <div className="agri-submit-row">
              <button type="button" className="agri-btn-reset" onClick={resetForm}>
                Clear form
              </button>
              <button type="submit" className="agri-btn-submit" disabled={submitting}>
                {submitting ? "⏳ Submitting..." : "🚀 Submit listing"}
              </button>
            </div>

            {submitted && (
              <div className="agri-success">
                <span className="agri-success-icon">✅</span>
                <span className="agri-success-text">Your listing has been submitted! Our team will review it shortly.</span>
              </div>
            )}

          </form>
        </div>
      </div>
    </>
  );
};

export default BuySellForm;