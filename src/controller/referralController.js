const referralModel = require("../models/referralModel");
const { sendEmailNotification } = require("../utils/emailService");

// Save referral data
const saveReferral = async (req, res) => {
    const { name, email, phone } = req.body;

    // Validate input
    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Save data to the database
        const referral = await referralModel.createReferral(name, email, phone);

        // Send email notification
        await sendEmailNotification(email, name);

        res.status(201).json(referral);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Fetch all referrals
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
