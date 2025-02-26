const referralModel = require("../models/referralModel");
const { sendEmailNotification } = require("../utils/emailService");

const saveReferral = async (req, res) => {
    const { name, email, phone, referrerEmail, referrerName, courseName } = req.body;
    const requiredFields = ["name", "email", "phone", "referrerEmail", "referrerName", "courseName"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    // error handling for missing details
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Details missing: ${missingFields.join(", ")}` });
    }
    // error handling for Email:
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email) || !emailCheck.test(referrerEmail)) {
        return res.status(400).json({ error: "Invalid email format. Please provide a valid email address." });
    }

    // Error Handling for Phone Number
    const phoneCheck = /^[0-9]{10}$/;
    if (!phoneCheck.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number. It must be a 10-digit number." });
    }
    try {
        // Saving to the database
        const referral = await referralModel.createReferral(
            name,
            email,
            phone,
            referrerEmail,
            referrerName,
            courseName
        );
        // Email notification handler.
        await sendEmailNotification(email, name, courseName);

        // Printing on backend for debugging purposes
        /*sendEmailNotification(email, name, courseName)              
            .then((result) => console.log("Email sent...", result))
            .catch((error) => console.log(error.message));*/

        res.status(201).json({ message: "Referral submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error saving the referral:", error);
        res.status(500).json({ error: "Failed to submit the referral" });
    }
};

// getting all referrals:
// For checking the DB
/*const getAllReferrals = async (req, res) => {
    try {
        const referrals = await referralModel.getAllReferrals();
        res.json(referrals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
*/
module.exports = {
    saveReferral,
    // getAllReferrals,
};
