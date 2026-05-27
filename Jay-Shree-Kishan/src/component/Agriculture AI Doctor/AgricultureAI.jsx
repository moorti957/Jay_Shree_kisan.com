import React, { useState, useEffect, useRef, useCallback } from "react";

const QUICK_CHIPS = [
  { icon: "🍂", label: "पत्ती पीली हो रही है" },
  { icon: "🐛", label: "कीट लग गए हैं" },
  { icon: "🍄", label: "फंगस की समस्या" },
  { icon: "💧", label: "सिंचाई सलाह चाहिए" },
  { icon: "🌱", label: "जैविक खाद बताएं" },
  { icon: "🌾", label: "फसल चयन में मदद" },
];

const TOPIC_TAGS = [
  { key: "disease", label: "रोग", color: "#c0392b", bg: "#fdecea" },
  { key: "pest", label: "कीट", color: "#7b341e", bg: "#fef3e2" },
  { key: "fertilizer", label: "खाद", color: "#2d6a4f", bg: "#d8f3dc" },
  { key: "irrigation", label: "सिंचाई", color: "#1a5276", bg: "#d6eaf8" },
  { key: "organic", label: "जैविक", color: "#6d4c41", bg: "#efebe9" },
];

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/agri-chat`
  : "/api/agri-chat";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function getTime(d) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function detectTopic(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.includes("रोग") || t.includes("बीमार") || t.includes("disease")) return "disease";
  if (t.includes("कीट") || t.includes("pest") || t.includes("कीड़")) return "pest";
  if (t.includes("खाद") || t.includes("fertilizer") || t.includes("urea")) return "fertilizer";
  if (t.includes("सिंचाई") || t.includes("पानी") || t.includes("irrigation")) return "irrigation";
  if (t.includes("जैविक") || t.includes("organic")) return "organic";
  return null;
}

function TopicBadge({ topic }) {
  if (!topic) return null;
  const t = TOPIC_TAGS.find((x) => x.key === topic);
  if (!t) return null;
  return (
    <span style={{ fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", background: t.bg, color: t.color, marginBottom: "4px", display: "inline-block", letterSpacing: "0.3px" }}>
      {t.label}
    </span>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "2px 0" }}>
      <span style={{ fontSize: "11px", color: "#52b788", marginRight: "2px" }}>विश्लेषण हो रहा है</span>
      {[0, 0.18, 0.36].map((d, i) => (
        <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#52b788", display: "inline-block", animation: `agriDot 1.1s ${d}s infinite ease-in-out` }} />
      ))}
    </div>
  );
}

function SeverityBar({ text }) {
  const low = text.includes("हल्की") || text.includes("हल्का");
  const high = text.includes("गंभीर") || text.includes("severe");
  const mid = !low && !high && (text.includes("मध्यम") || text.includes("medium"));
  if (!low && !mid && !high) return null;
  const level = high ? 3 : mid ? 2 : 1;
  const colors = ["#f6c90e", "#f39c12", "#e74c3c"];
  const labels = ["हल्की", "मध्यम", "गंभीर"];
  return (
    <div style={{ margin: "8px 0 4px", display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "10px", color: "#666", minWidth: "60px" }}>गंभीरता:</span>
      <div style={{ display: "flex", gap: "3px" }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ width: "22px", height: "6px", borderRadius: "3px", background: n <= level ? colors[level - 1] : "#e0e0e0" }} />
        ))}
      </div>
      <span style={{ fontSize: "10px", color: colors[level - 1], fontWeight: "600" }}>{labels[level - 1]}</span>
    </div>
  );
}

function formatBotText(text) {
  return text.split("\n").map((line) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
    return `<span style="display:block;margin-bottom:${line === "" ? "6px" : "2px"}">${bold || "&nbsp;"}</span>`;
  }).join("");
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconCamera = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const IconGallery = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const IconMic = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const IconStop = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
  </svg>
);

const IconSend = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconSpeaker = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

// ── Voice Wave ────────────────────────────────────────────────────────────────
function VoiceWave() {
  const heights = [4, 10, 16, 10, 6, 14, 8, 16, 6, 10];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "20px" }}>
      {heights.map((h, i) => (
        <span key={i} style={{
          display: "inline-block", width: "3px", height: `${h}px`,
          background: "#e74c3c", borderRadius: "2px",
          animation: `agriWave 0.7s ${(i * 0.07).toFixed(2)}s infinite ease-in-out alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Per-message TTS button ────────────────────────────────────────────────────
function SpeakButton({ text }) {
  const [speaking, setSpeaking] = useState(false);

  const getHindiVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang === "hi-IN" || v.lang.startsWith("hi")) || null;
  };

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/\*\*/g, "").replace(/[━=]/g, "").replace(/[^\u0000-\u007E\u0900-\u097F\s]/g, "");
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = "hi-IN";
    utt.rate = 0.88;
    utt.pitch = 1;
    const voice = getHindiVoice();
    if (voice) utt.voice = voice;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const stop = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };

  if (!window.speechSynthesis) return null;

  return (
    <button
      onClick={speaking ? stop : speak}
      title={speaking ? "बोलना बंद करें" : "AI की आवाज़ में सुनें"}
      style={{
        background: speaking ? "#d8f3dc" : "transparent",
        border: `1px solid ${speaking ? "#52b788" : "#d0ede0"}`,
        borderRadius: "20px", padding: "3px 10px",
        cursor: "pointer", fontSize: "11px",
        color: speaking ? "#1b4332" : "#40916c",
        display: "inline-flex", alignItems: "center", gap: "5px",
        marginTop: "6px", transition: "all 0.15s", fontFamily: "inherit", fontWeight: "500",
      }}
    >
      {speaking ? <IconStop /> : <IconSpeaker />}
      {speaking ? "रोकें" : "सुनें"}
    </button>
  );
}

// ── Camera Options Popup ──────────────────────────────────────────────────────
function CameraPopup({ onClose, onCameraCapture, onGalleryPick }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(10,30,20,0.72)",
          backdropFilter: "blur(4px)", zIndex: 10010,
          animation: "agriBackdropIn 0.2s ease",
        }}
      />
      {/* Sheet */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "min(400px, 100vw)", zIndex: 10011,
        animation: "agriSheetUp 0.28s cubic-bezier(.34,1.4,.64,1)",
        fontFamily: "'Noto Sans Devanagari','Baloo 2',sans-serif",
      }}>
        <div style={{
          background: "#fff", borderRadius: "22px 22px 0 0",
          boxShadow: "0 -8px 40px rgba(27,67,50,.28)",
          padding: "8px 20px 32px",
          border: "1.5px solid #d8f3dc", borderBottom: "none",
        }}>
          {/* Drag handle */}
          <div style={{ width: "38px", height: "4px", background: "#c8e6c9", borderRadius: "2px", margin: "10px auto 18px" }} />

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <div
    style={{
      fontSize: "15px",
      fontWeight: "700",
      color: "#1b4332",
      marginBottom: "3px",
    }}
  >
    Add Photo
  </div>

  <div
    style={{
      fontSize: "11px",
      color: "#74c69d",
    }}
  >
    Upload a crop image and get AI advice
  </div>
</div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            {/* Camera button */}
            <button
              onClick={onCameraCapture}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: "10px", padding: "18px 12px", cursor: "pointer",
                background: "linear-gradient(145deg,#f0faf3,#e6f7ec)",
                border: "1.5px solid #b7e4c7", borderRadius: "16px",
                transition: "all 0.18s", color: "#1b4332",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "linear-gradient(135deg,#1b4332,#2d6a4f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", boxShadow: "0 4px 14px rgba(45,106,79,.4)",
              }}>
                <IconCamera />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#1b4332" }}>
  Take Photo
</div>

<div style={{ fontSize: "10px", color: "#52b788", marginTop: "2px" }}>
  Camera will open
</div>
              </div>
            </button>

            {/* Gallery button */}
            <button
              onClick={onGalleryPick}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: "10px", padding: "18px 12px", cursor: "pointer",
                background: "linear-gradient(145deg,#f4f8ff,#edf3ff)",
                border: "1.5px solid #c5d8f8", borderRadius: "16px",
                transition: "all 0.18s", color: "#1b4332",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "linear-gradient(135deg,#1a5276,#2471a3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", boxShadow: "0 4px 14px rgba(26,82,118,.35)",
              }}>
                <IconGallery />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#1b4332" }}>
  Choose from Gallery
</div>

<div style={{ fontSize: "10px", color: "#2471a3", marginTop: "2px" }}>
  Upload Photo
</div>
              </div>
            </button>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "11px", border: "1.5px solid #e0e0e0",
              borderRadius: "12px", background: "#fafafa", cursor: "pointer",
              fontSize: "13px", color: "#888", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#f0f0f0"}
            onMouseLeave={e => e.currentTarget.style.background = "#fafafa"}
          >
            <IconClose />
            close ?
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AgriAIDoctorAdvanced() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([{
    id: 1, sender: "bot", time: new Date(), topic: null,
    text: "🌾 **नमस्ते किसान भाई/बहन!**\n\nमैं आपका **Advanced AI कृषि डॉक्टर** हूँ।\n\n✅ फसल रोग पहचान\n✅ पत्ती / जड़ / फल की बीमारी\n✅ कीट और pest विश्लेषण\n✅ खाद और सिंचाई सलाह\n✅ जैविक खेती मार्गदर्शन\n\n📸 **पौधे की फोटो भेजें** या अपनी समस्या लिखें!\n🎤 **बोलकर भी पूछ सकते हैं!**",
  }]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showChips, setShowChips] = useState(true);
  const [unread, setUnread] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  // ── Voice state ──────────────────────────────────────────────────────────────
  const [micState, setMicState] = useState("idle");
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [autoVoice, setAutoVoice] = useState(false);
  const recognitionRef = useRef(null);

  // ── Camera popup state ───────────────────────────────────────────────────────
  const [cameraPopup, setCameraPopup] = useState(false);

  const endRef = useRef(null);
  const cameraInputRef = useRef(null);   // capture="environment"
  const galleryInputRef = useRef(null);  // gallery picker
  const inputRef = useRef(null);
  const msgId = useRef(2);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setVoiceSupported(false);
  }, []);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) window.speechSynthesis?.cancel();
  }, [open]);

  const applyImage = (file) => {
    setImageFile(file);
    const r = new FileReader();
    r.onload = (ev) => setImagePreview(ev.target.result);
    r.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file?.type.startsWith("image/")) applyImage(file);
  }, []);

  // Camera popup handlers
  const handleCameraCapture = () => {
    setCameraPopup(false);
    setTimeout(() => cameraInputRef.current?.click(), 120);
  };
  const handleGalleryPick = () => {
    setCameraPopup(false);
    setTimeout(() => galleryInputRef.current?.click(), 120);
  };

  // TTS
  const speakText = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/\*\*/g, "").replace(/[━=]/g, "").replace(/[^\u0000-\u007E\u0900-\u097F\s]/g, "");
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = "hi-IN"; utt.rate = 0.88; utt.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const hv = voices.find((v) => v.lang === "hi-IN" || v.lang.startsWith("hi"));
    if (hv) utt.voice = hv;
    window.speechSynthesis.speak(utt);
  }, []);

  // Mic
  const toggleMic = () => {
    if (!voiceSupported) { alert("⚠️ आपका browser voice input support नहीं करता"); return; }
    if (micState === "listening") { recognitionRef.current?.stop(); setMicState("idle"); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognition.onstart = () => setMicState("listening");
    recognition.onresult = (e) => {
      setMicState("processing");
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setInput(t);
      setTimeout(() => inputRef.current?.focus(), 80);
    };
    recognition.onend = () => setMicState("idle");
    recognition.onerror = () => setMicState("idle");
    recognitionRef.current = recognition;
    recognition.start();
  };

  const sendMessage = async (overrideText) => {
    const text = overrideText !== undefined ? overrideText : input;
    if (!text.trim() && !imageFile) return;
    if (micState === "listening") { recognitionRef.current?.stop(); setMicState("idle"); }

    const userMsg = {
      id: msgId.current++, sender: "user", time: new Date(),
      text: text || "📷 Image भेजी गई — analysis करें",
      imagePreview, topic: detectTopic(text),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    setShowChips(false);
    const localFile = imageFile;
    removeImage();

    try {
      let imageBase64 = null, imageMediaType = null;
      if (localFile) { imageBase64 = await toBase64(localFile); imageMediaType = localFile.type || "image/jpeg"; }
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text || "", imageBase64, imageMediaType, history }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Server error");
      const reply = data.reply;
      setHistory((prev) => [...prev, { role: "user", content: text || "image analysis request" }, { role: "assistant", content: reply }]);
      setMessages((p) => [...p, { id: msgId.current++, sender: "bot", time: new Date(), text: reply, topic: detectTopic(reply) }]);
      if (!open) setUnread((u) => u + 1);
      if (autoVoice) speakText(reply);
    } catch (err) {
      console.error("Agri chat error:", err);
      setMessages((p) => [...p, { id: msgId.current++, sender: "bot", time: new Date(), text: "⚠️ सेवा अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद पुनः प्रयास करें।", topic: null }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const clearChat = () => {
    window.speechSynthesis?.cancel();
    setMessages([{ id: msgId.current++, sender: "bot", time: new Date(), topic: null, text: "🌱 नई बातचीत शुरू की गई। अपनी फसल की समस्या बताएं।" }]);
    setHistory([]); setShowChips(true);
  };

  const micActive = micState === "listening";
  const canSend = !loading && (!!input.trim() || !!imageFile);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');
        @keyframes agriSlideUp{from{opacity:0;transform:translateY(24px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes agriDot{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes agriPulse{0%,100%{box-shadow:0 6px 24px rgba(45,106,79,.5),0 0 0 0 rgba(82,183,136,.5)}60%{box-shadow:0 6px 24px rgba(45,106,79,.5),0 0 0 10px rgba(82,183,136,0)}}
        @keyframes agriFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes agriWave{from{transform:scaleY(0.3);opacity:0.6}to{transform:scaleY(1.2);opacity:1}}
        @keyframes agriMicRing{0%,100%{box-shadow:0 0 0 0 rgba(231,76,60,.55)}65%{box-shadow:0 0 0 7px rgba(231,76,60,0)}}
        @keyframes agriSheetUp{from{opacity:0;transform:translateX(-50%) translateY(60px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes agriBackdropIn{from{opacity:0}to{opacity:1}}
        .agri-msg{animation:agriFadeIn 0.25s ease}
        .agri-fab-wrap:hover .agri-circle{transform:scale(1.06)}
        .agri-fab-wrap:active .agri-circle{transform:scale(0.96)}
        .agri-send:hover:not(:disabled){transform:scale(1.08)}
        .agri-icon-btn:hover:not(:disabled){background:#d8f3dc!important}
        .agri-mic-listening{animation:agriMicRing 1s infinite!important;background:#fff0f0!important;border-color:#e74c3c!important}
        .agri-chip:hover{background:#d8f3dc!important;transform:translateY(-1px)}
        .agri-body::-webkit-scrollbar{width:4px}
        .agri-body::-webkit-scrollbar-thumb{background:#b7e4c7;border-radius:4px}
        .agri-chips::-webkit-scrollbar{display:none}
        .agri-input:focus{border-color:#52b788!important;box-shadow:0 0 0 3px rgba(82,183,136,.18)!important;outline:none}
        .agri-input::placeholder{color:#95d5b2}
        .agri-circle{transition:transform 0.2s}
        .agri-toggle-wrap{display:flex;flex-direction:column;align-items:center;gap:2px}
        .agri-toggle-label{position:relative;display:inline-block;width:30px;height:16px;cursor:pointer}
        .agri-toggle-label input{opacity:0;width:0;height:0}
        .agri-toggle-slider{position:absolute;inset:0;background:#3a5a40;border-radius:10px;transition:background 0.2s;border:1.5px solid rgba(255,255,255,.15)}
        .agri-toggle-slider:before{content:'';position:absolute;height:10px;width:10px;left:2px;bottom:2px;background:#fff;border-radius:50%;transition:transform 0.2s}
        .agri-toggle-label input:checked + .agri-toggle-slider{background:#52b788}
        .agri-toggle-label input:checked + .agri-toggle-slider:before{transform:translateX(14px)}
      `}</style>

      {/* ── Camera popup ── */}
      {cameraPopup && (
        <CameraPopup
          onClose={() => setCameraPopup(false)}
          onCameraCapture={handleCameraCapture}
          onGalleryPick={handleGalleryPick}
        />
      )}

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { applyImage(f); setCameraPopup(false); } }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { applyImage(f); setCameraPopup(false); } }}
      />

      {/* ── FAB ── */}
      <div className="agri-fab-wrap" onClick={() => { setOpen((o) => !o); setMinimized(false); }}
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <div className="agri-circle" style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg,#1b4332,#2d6a4f 55%,#52b788)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", border: "3px solid #95d5b2", animation: open ? "none" : "agriPulse 2.4s infinite", boxShadow: "0 6px 24px rgba(45,106,79,.5)" }}>
          {open ? "✕" : "🌿"}
        </div>
        {unread > 0 && !open && (
          <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "20px", height: "20px", borderRadius: "50%", background: "#e74c3c", color: "#fff", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>{unread}</div>
        )}
        <span style={{ background: "#1b4332", color: "#d8f3dc", fontSize: "10.5px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", letterSpacing: "0.4px", boxShadow: "0 2px 8px rgba(45,106,79,.35)", whiteSpace: "nowrap" }}>
          {open ? "बंद करें" : "🌾 कृषि डॉक्टर"}
        </span>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div style={{ position: "fixed", bottom: "110px", right: "28px", width: "390px", maxHeight: minimized ? "58px" : "640px", borderRadius: "20px", background: "#f4fdf6", border: "1.5px solid #95d5b2", boxShadow: "0 12px 48px rgba(27,67,50,.22),0 2px 8px rgba(0,0,0,.06)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 9998, animation: "agriSlideUp 0.28s cubic-bezier(.34,1.56,.64,1)", transition: "max-height 0.3s ease", fontFamily: "'Noto Sans Devanagari','Baloo 2',sans-serif" }}>

          {/* Header */}
          <div style={{ background: "linear-gradient(110deg,#0d2b1d,#1b4332 45%,#2d6a4f)", padding: "13px 16px", display: "flex", alignItems: "center", gap: "11px", flexShrink: 0, borderBottom: "2px solid #52b788" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(82,183,136,.18)", border: "2px solid #74c69d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0, position: "relative" }}>
              🌾
              <span style={{ position: "absolute", bottom: "1px", right: "1px", width: "9px", height: "9px", borderRadius: "50%", background: "#52b788", border: "1.5px solid #1b4332" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#d8f3dc", fontWeight: "700", fontSize: "14px", lineHeight: 1.2, fontFamily: "'Baloo 2',sans-serif" }}>AI कृषि डॉक्टर</div>
              <div style={{ color: "#74c69d", fontSize: "10.5px", marginTop: "1px" }}>Advanced Crop Analysis • Online</div>
            </div>
            {/* Auto Voice Toggle */}
            <div className="agri-toggle-wrap" style={{ marginRight: "2px" }}>
              <span style={{ fontSize: "9px", color: autoVoice ? "#95d5b2" : "#52736a", whiteSpace: "nowrap" }}>🔊 Auto</span>
              <label className="agri-toggle-label">
                <input type="checkbox" checked={autoVoice} onChange={(e) => setAutoVoice(e.target.checked)} />
                <span className="agri-toggle-slider" />
              </label>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={clearChat} style={{ background: "transparent", border: "1px solid rgba(116,198,157,.3)", borderRadius: "8px", color: "#95d5b2", fontSize: "11px", padding: "4px 8px", cursor: "pointer" }} title="नई बातचीत">🗑️</button>
              <button onClick={() => setMinimized((m) => !m)} style={{ background: "transparent", border: "1px solid rgba(116,198,157,.3)", borderRadius: "8px", color: "#95d5b2", fontSize: "13px", padding: "4px 8px", cursor: "pointer" }}>{minimized ? "▲" : "▼"}</button>
            </div>
          </div>

          {!minimized && (<>
            {/* Messages */}
            <div className="agri-body" style={{ flex: 1, overflowY: "auto", padding: "14px 13px 8px", display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}>
              {dragOver && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(216,243,220,.93)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, borderRadius: "18px", border: "2px dashed #52b788", flexDirection: "column", gap: "8px", fontSize: "32px" }}>
                  📷 <span style={{ fontSize: "13px", color: "#2d6a4f", fontWeight: "600" }}>फोटो यहाँ छोड़ें</span>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className="agri-msg" style={{ alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end", maxWidth: "88%" }}>
                  {msg.sender === "bot" && <TopicBadge topic={msg.topic} />}
                  <div style={{ background: msg.sender === "bot" ? "#fff" : "linear-gradient(135deg,#2d6a4f,#40916c)", borderRadius: msg.sender === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", padding: "10px 13px", border: msg.sender === "bot" ? "1px solid #d8f3dc" : "none", boxShadow: msg.sender === "bot" ? "0 2px 8px rgba(45,106,79,.06)" : "0 3px 12px rgba(45,106,79,.28)" }}>
                    {msg.imagePreview && <img src={msg.imagePreview} alt="plant" style={{ width: "100%", maxWidth: "200px", borderRadius: "8px", marginBottom: "8px", border: "1px solid rgba(82,183,136,.3)", display: "block" }} />}
                    {msg.sender === "bot" ? (
                      <>
                        <SeverityBar text={msg.text} />
                        <div style={{ fontSize: "13px", lineHeight: "1.7", color: "#1b4332", wordBreak: "break-word" }} dangerouslySetInnerHTML={{ __html: formatBotText(msg.text) }} />
                        <SpeakButton text={msg.text} />
                      </>
                    ) : (
                      <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.65", color: "rgba(255,255,255,.97)", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{msg.text}</p>
                    )}
                    <span style={{ fontSize: "10px", display: "block", marginTop: "5px", color: msg.sender === "bot" ? "rgba(27,67,50,.4)" : "rgba(255,255,255,.5)", textAlign: msg.sender === "user" ? "right" : "left" }}>
                      {getTime(msg.time)}{msg.sender === "user" && " ✓✓"}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="agri-msg" style={{ alignSelf: "flex-start", background: "#fff", border: "1px solid #d8f3dc", borderRadius: "4px 16px 16px 16px", padding: "12px 14px", boxShadow: "0 2px 8px rgba(45,106,79,.06)" }}>
                  <TypingDots />
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Chips */}
            {showChips && (
              <div className="agri-chips" style={{ display: "flex", gap: "7px", overflowX: "auto", padding: "8px 13px 4px", flexShrink: 0, scrollbarWidth: "none" }}>
                {QUICK_CHIPS.map((c, i) => (
                  <button key={i} className="agri-chip" onClick={() => sendMessage(c.label)}
                    style={{ flexShrink: 0, background: "#fff", border: "1px solid #b7e4c7", borderRadius: "20px", padding: "5px 11px", cursor: "pointer", fontSize: "11px", color: "#2d6a4f", fontWeight: "500", whiteSpace: "nowrap", transition: "all 0.15s", fontFamily: "inherit" }}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            )}

            {/* Listening strip */}
            {micActive && (
              <div style={{ background: "#fff5f5", borderTop: "1px solid #fccaca", padding: "6px 16px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <VoiceWave />
                <span style={{ fontSize: "11.5px", color: "#c0392b", fontWeight: "600" }}>🎤 सुन रहा है… बोलिए</span>
                <span style={{ marginLeft: "auto", fontSize: "10px", color: "#e74c3c", cursor: "pointer", textDecoration: "underline" }} onClick={toggleMic}>रोकें</span>
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "10px 12px 14px", borderTop: "1px solid #d8f3dc", background: "#edf9f0", flexShrink: 0 }}>
              {imagePreview && (
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "8px", background: "#fff", borderRadius: "10px", border: "1px solid #b7e4c7", padding: "7px 11px" }}>
                  <img src={imagePreview} alt="preview" style={{ width: "38px", height: "38px", borderRadius: "7px", objectFit: "cover", border: "1px solid #d8f3dc" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "11.5px", color: "#2d6a4f", fontWeight: "600" }}>फोटो तैयार है</div>
                    <div style={{ fontSize: "10px", color: "#95d5b2" }}>{imageFile?.name?.slice(0, 28)}</div>
                  </div>
                  <button onClick={removeImage} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: "15px", padding: "2px 5px" }}>✕</button>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "flex-end", gap: "7px" }}>
                {/* ── Camera button → opens popup ── */}
                <button
                  className="agri-icon-btn"
                  onClick={() => setCameraPopup(true)}
                  title="फोटो जोड़ें"
                  style={{
                    width: "37px", height: "37px", borderRadius: "50%", flexShrink: 0,
                    background: "#fff", border: "1.5px solid #b7e4c7",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#2d6a4f", cursor: "pointer", transition: "background 0.15s",
                  }}>
                  <IconCamera />
                </button>

                {/* Textarea */}
                <textarea
                  ref={inputRef} className="agri-input" value={input}
                  onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                  placeholder={micActive ? "🎤 बोलिए…" : "समस्या लिखें, बोलें या फोटो भेजें…"}
                  rows={1} disabled={loading}
                  style={{
                    flex: 1, border: `1.5px solid ${micActive ? "#e74c3c" : "#b7e4c7"}`,
                    borderRadius: "18px", padding: "9px 14px", fontSize: "13px",
                    background: micActive ? "#fff8f8" : "#fff",
                    color: "#1b4332", fontFamily: "inherit", resize: "none",
                    lineHeight: "1.5", maxHeight: "80px", overflowY: "auto",
                    transition: "border-color 0.15s,box-shadow 0.15s,background 0.15s",
                  }}
                  onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px"; }}
                />

                {/* Mic */}
                {voiceSupported && (
                  <button
                    className={`agri-icon-btn${micActive ? " agri-mic-listening" : ""}`}
                    onClick={toggleMic} disabled={loading} title={micActive ? "सुन रहा है… रोकने के लिए दबाएं" : "बोलकर पूछें"}
                    style={{
                      width: "37px", height: "37px", borderRadius: "50%", flexShrink: 0,
                      background: micActive ? "#fff0f0" : "#fff",
                      border: `1.5px solid ${micActive ? "#e74c3c" : "#b7e4c7"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: micActive ? "#e74c3c" : "#2d6a4f",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.45 : 1, transition: "all 0.15s",
                    }}>
                    {micState === "processing" ? "⏳" : <IconMic />}
                  </button>
                )}

                {/* Send */}
                <button className="agri-send" onClick={() => sendMessage()} disabled={!canSend}
                  style={{
                    width: "37px", height: "37px", borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#2d6a4f,#52b788)", border: "none",
                    cursor: canSend ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", opacity: canSend ? 1 : 0.42, transition: "all 0.15s",
                    boxShadow: "0 3px 10px rgba(45,106,79,.35)",
                  }}>
                  <IconSend />
                </button>
              </div>

              <div style={{ textAlign: "center", fontSize: "10px", color: "#95d5b2", marginTop: "8px", letterSpacing: "0.2px" }}>
                🌱 केवल कृषि सहायता • बोलकर पूछें • Drag & drop • AI Powered
              </div>
            </div>
          </>)}
        </div>
      )}
    </>
  );
}