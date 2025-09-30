const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");
const {GoogleGenerativeAI} = require("@google/generative-ai");

admin.initializeApp();
const corsHandler = cors({origin: true});

exports.askGemini = onRequest(
    {
      secrets: ["GEMINI_API_KEY"],
    },
    async (req, res) => {
      corsHandler(req, res, async () => {
        try {
          if (req.method !== "POST") {
            return res.status(405).send(
                {error: "Only POST requests are accepted"});
          }

          const {prompt} = req.body;
          if (!prompt) {
            return res.status(400).send(
                {error: "Prompt is required in the request body"});
          }

          const apiKey = process.env.GEMINI_API_KEY;
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});

          const result = await model.generateContent([prompt]);
          const response = await result.response;
          const text = response.text();

          res.status(200).send({response: text});
        } catch (error) {
          console.error("Error generating content:", error);
          res.status(500).send(
              {error: "Internal server error", details: error.message});
        }
      });
    },
);
