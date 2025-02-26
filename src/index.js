const express = require("express");
const app = express();
const dotenv = require("dotenv");
const referralRoutes = require("./routes/referralRoute");
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-urlencoded requests
app.use("/", referralRoutes);

app.listen(PORT, () => {
    console.log(`Server connected successfully; running on http://localhost:${PORT}`);
});
