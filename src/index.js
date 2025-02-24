const express = require("express");
const dotenv = require("dotenv");
const referralRoutes = require("./routes/referralRoute");
const PORT = process.env.PORT;

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", referralRoutes);

app.get("/", (req, res) => {
    res.send("Referral Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server connected successfully; running on http://localhost:${PORT}`);
});
