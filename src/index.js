const express = require("express");
const app = express();
const { google } = require("googleapis");
const dotenv = require("dotenv");
const referralRoutes = require("./routes/referralRoute");
const PORT = process.env.PORT;

dotenv.config();
app.use(express.json());

app.use("/api", referralRoutes);

app.get("/", (req, res) => {
    res.send("Referral Backend is running!");
});

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
);

app.get("/oauth2callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send("Authorization code missing");

    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log("Access Token:", tokens.access_token);
        console.log("Refresh Token:", tokens.refresh_token);
        res.send("Authorization successful! Check terminal for refresh token.");
    } catch (error) {
        console.error("Error retrieving access token:", error);
        res.status(500).send("Failed to retrieve access token.");
    }
});

app.listen(PORT, () => {
    console.log(`Server connected successfully; running on http://localhost:${PORT}`);
});
