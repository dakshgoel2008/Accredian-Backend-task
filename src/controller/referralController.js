const referralModel = require("../models/referralModel");
const { sendEmailNotification } = require("../utils/emailService");

const saveReferral = async (req, res) => {
    const { name, email, phone } = req.body;
    // console.log(req.body);
    const requiredFields = ["name", "email", "phone"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Details missing: ${missingFields.join(", ")}` });
    }

    try {
        // Save data to the database
        const referral = await referralModel.createReferral(name, email, phone);
        // Send email notification
        await sendEmailNotification(email, name);
        sendEmailNotification(email, name)
            .then((result) => console.log("Email sent...", result))
            .catch((error) => console.log(error.message));

        res.status(201).json({ message: "Referral submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error saving referral:", error);
        res.status(500).json({ error: "Failed to submit referral" });
    }
};

const getAllReferrals = async (req, res) => {
    try {
        const referrals = await referralModel.getAllReferrals();
        res.json(referrals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    saveReferral,
    getAllReferrals,
};
