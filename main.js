const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")({ origin: true });

// 🔐 Get the Gemini API key from Firebase environment config
// Set it via: firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
const GEMINI_API_KEY = functions.config().gemini.key;

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Firebase HTTPS Cloud Function
exports.askGemini = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({ error: "Only POST requests are allowed." });
      }

      const prompt = req.body.prompt;
      if (!prompt) {
        return res.status(400).send({ error: "Prompt is required in the request body." });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return res.status(200).send({ response: text });
    } catch (error) {
      console.error("Error from Gemini:", error);
      return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  });
});
