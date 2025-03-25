const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

router.post("/auth/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: "No credential provided" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,  // Fix: Use 'credential' instead of 'token'
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("User info:", payload);

    res.status(200).json({ success: true, user: payload });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ success: false, error: "Invalid token" });
  }
});

module.exports = router;
