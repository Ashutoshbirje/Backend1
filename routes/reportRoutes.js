const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_PROMPT = `
You are a legal assistant trained in Indian law. Analyze the following crime scenario and identify the applicable Indian Penal Code (IPC) sections.

Scenario:
{}

Provide only a list of relevant IPC sections (Without title of the list) along with their short and simple descriptions. Keep it concise and avoid any extra explanation or punctuation. Output must be in the form of Section name : section Discription 
`;

router.post("/fir-ai", async (req, res) => {
  const userInput = req.body.input;

  const prompt = BASE_PROMPT.replace("{}", userInput);

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const result = response.data.candidates[0]?.content?.parts[0]?.text || "No response generated.";
    res.json({ output: result });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.json({ output: "Error: " + (error.response?.data?.error?.message || error.message) });
  }
});

module.exports = router;
    