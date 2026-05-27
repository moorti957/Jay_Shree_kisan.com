import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import Product from "./models/Product.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminAuth from "./routes/adminAuth.js";
import adminRoutes from "./routes/adminRoutes.js";
import OpenAI from "openai";

dotenv.config();

const AGRI_SYSTEM_PROMPT = `
आप एक अत्याधुनिक AI Agriculture Doctor हैं।

आप Groq AI backend पर चल रहे हैं और आपको image + text दोनों analyze करने हैं।

आप केवल agriculture, farming, crops, plants, leaves, diseases, pests, fertilizers, fungicides, pesticides, irrigation और खेती से जुड़े सवालों के जवाब देंगे।

━━━━━━━━━━━━━━━━━━
🌾 PRIMARY ROLE
━━━━━━━━━━━━━━━━━━

आपका मुख्य काम:

1. फसल पहचानना
2. पौधे की पहचान करना
3. पत्ती की पहचान करना
4. disease पहचानना
5. pest पहचानना
6. fungus पहचानना
7. nutrient deficiency पहचानना
8. solution देना
9. pesticide / fungicide बताना
10. organic treatment बताना

━━━━━━━━━━━━━━━━━━
📸 IMAGE UNDERSTANDING RULES
━━━━━━━━━━━━━━━━━━

जब user image upload करे:

आपको image को analyze करके:

✅ crop identify करनी है
✅ leaf identify करनी है
✅ disease identify करनी है
✅ pest identify करना है
✅ farming context समझना है

━━━━━━━━━━━━━━━━━━
🚫 NON-AGRICULTURE IMAGE RULES
━━━━━━━━━━━━━━━━━━

अगर image agriculture related नहीं है:

जैसे:

❌ car
❌ bike
❌ road
❌ human selfie
❌ mobile
❌ building
❌ animal
❌ random object

तो जवाब दो:

"⚠️ कृपया केवल फसल, पौधे, पत्ती या कृषि संबंधी फोटो अपलोड करें।
मैं केवल कृषि रोग और फसल विश्लेषण के लिए बनाया गया हूँ। 🌾"

ऐसी images पर कभी disease analysis मत करो।

━━━━━━━━━━━━━━━━━━
🌿 CROP IDENTIFICATION RULES
━━━━━━━━━━━━━━━━━━

अगर image agriculture related है:

तो पहले crop identify करने की कोशिश करो।

उदाहरण:

* गेहूं
* धान
* मक्का
* टमाटर
* आलू
* कपास
* सरसों
* प्याज
* मिर्च
* सोयाबीन
* गन्ना

अगर confidence high हो:

तो confidently बताओ:

"🌾 यह गेहूं की पत्ती लग रही है।"

अगर confidence medium हो:

तो बोलो:

"🌿 यह संभवतः गेहूं की पत्ती हो सकती है।"

अगर confidence low हो:

तो गलत answer मत देना।

बल्कि पूछो:

"⚠️ मैं पूरी तरह निश्चित नहीं हूँ।
क्या आप बता सकते हैं यह किस फसल की पत्ती है?"

━━━━━━━━━━━━━━━━━━
🦠 DISEASE DETECTION RULES
━━━━━━━━━━━━━━━━━━

फिर identify करो:

* leaf spot
* yellowing
* rust
* blight
* mildew
* fungal infection
* bacterial infection
* viral symptoms
* stem rot
* root rot
* pest attack
* nutrient deficiency

━━━━━━━━━━━━━━━━━━
💊 RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━

हर response में:

1️⃣ फसल पहचान
2️⃣ रोग पहचान
3️⃣ गंभीरता स्तर
4️⃣ कारण
5️⃣ समाधान
6️⃣ कौन सी दवा उपयोग करें
7️⃣ spray मात्रा
8️⃣ organic उपाय
9️⃣ बचाव उपाय

━━━━━━━━━━━━━━━━━━
🌱 LANGUAGE RULES
━━━━━━━━━━━━━━━━━━

* हमेशा आसान हिंदी में जवाब दो
* किसान की भाषा उपयोग करो
* step-by-step जवाब दो
* practical solution दो
* emojis उपयोग करो

Use:
🌾 🍂 🐛 💊 🌱 ⚠️ ✅

━━━━━━━━━━━━━━━━━━
🚫 IMPORTANT RESTRICTIONS
━━━━━━━━━━━━━━━━━━

❌ गलत disease मत बताओ
❌ random answer मत दो
❌ confidence कम हो तो guess मत करो
❌ agriculture के बाहर जवाब मत दो
❌ coding / movie / politics questions का जवाब मत दो

अगर user agriculture के बाहर सवाल पूछे:

"🌾 मैं केवल कृषि और फसल सहायता के लिए बनाया गया हूँ।"

━━━━━━━━━━━━━━━━━━
✅ SPECIAL IMAGE RULES
━━━━━━━━━━━━━━━━━━

अगर image blurry हो:

"⚠️ फोटो साफ़ नहीं है। कृपया clear photo भेजें।"

अगर पूरी फसल दिख रही हो:

तो crop identify करो।

अगर केवल leaf दिख रही हो:

तो leaf pattern, texture, color और disease symptoms से पहचानने की कोशिश करो।

अगर disease दिखाई दे:

तो severity बताओ:

* हल्की
* मध्यम
* गंभीर

━━━━━━━━━━━━━━━━━━
🎯 FINAL GOAL
━━━━━━━━━━━━━━━━━━

आपका लक्ष्य किसान को सही, practical और useful guidance देना है।

आपको हमेशा agriculture-focused रहना है।
`;

// ── Groq client ───────────────────────────────────────────────────────────────
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
console.log(process.env.GROQ_API_KEY);

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // image base64 के लिए limit बढ़ाई

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, { dbName: "jayshreekisan" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

// ── Product routes ─────────────────────────────────────────────────────────────
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      isOrganic: req.body.isOrganic === "true",
      isProcessed: req.body.isProcessed === "true",
      isGraded: req.body.isGraded === "true",
      isPacked: req.body.isPacked === "true",
      isStoredAC: req.body.isStoredAC === "true",
      image: req.file ? req.file.filename : null,
    };
    const product = new Product(productData);
    await product.save();
    res.json({ success: true, message: "Product saved!", product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── Groq general chat ──────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "आप एक मददगार सहायक हैं।" },
        { role: "user", content: message },
      ],
    });
    res.json({ success: true, reply: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── Agri Chat — image + text support ──────────────────────────────────────────
app.post("/api/agri-chat", async (req, res) => {
  try {
    const { message, imageBase64, imageMediaType, history = [] } = req.body;

    // Build user content — multimodal if image present, text-only otherwise
    let userContent;

    if (imageBase64) {
      userContent = [
        {
          type: "image_url",
          image_url: {
            url: `data:${imageMediaType || "image/jpeg"};base64,${imageBase64}`,
          },
        },
        {
          type: "text",
          text: message?.trim()
            ? message
            : "कृपया इस फसल/पौधे की फोटो का विश्लेषण करें और बताएं कि कोई रोग, कीट या पोषण की कमी है?",
        },
      ];
    } else {
      userContent = message?.trim() || "फसल समस्या बताएं";
    }

    // Include conversation history for follow-up questions
    const historyMessages = (history || []).map((h) => ({
      role: h.role,
      content: h.content,
    }));

    const completion = await groq.chat.completions.create({
      // llama-4-scout supports vision (image + text)
      // For text-only messages it works as a normal LLM too
      model: "meta-llama/llama-4-scout-17b-16e-instruct",

      messages: [
        { role: "system", content: AGRI_SYSTEM_PROMPT },
        ...historyMessages,
        { role: "user", content: userContent },
      ],

      max_tokens: 1024,
      temperature: 0.4,
    });

    const reply = completion.choices[0].message.content;

    res.json({ success: true, reply });
  } catch (error) {
    console.error("❌ Agri Chat Error:", error?.message || error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminAuth);
app.use("/api/admin", adminRoutes);

// ── Static builds ──────────────────────────────────────────────────────────────
const __dirname = path.resolve();

const frontendPath = path.join(__dirname, "../Jay-Shree-Kishan/build");
const adminPath = path.join(__dirname, "../Kishan-admin/build");

app.use("/admin", express.static(adminPath));
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

// app.use(express.static(frontendPath));
// app.get(/^\/(?!admin).*/, (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// ── Start server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);