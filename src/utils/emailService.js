require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// CREDENTIALS:
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLEINT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const USER = process.env.GMAIL_USER;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmailNotification(email, name, courseName) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "goel.daksh2008@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `Your Learning Platform <${USER}>`,
            to: email,
            subject: `🚀 Welcome, ${name}! Your Course Awaits 🎓`,
            text: `Hi ${name}, 

Welcome aboard! We’re thrilled to have you join us. 

You have been referred to the course: "${courseName}". This course is designed to help you gain new skills and enhance your knowledge. 

If you have any questions, feel free to reach out. 

Happy Learning!  
Best Regards,  
[Your Learning Platform Team: Accredian]  
`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #007bff;">Hello ${name},</h2>
            <p>Welcome aboard! We're thrilled to have you on this learning journey. 🎉</p>
            <p>You have been referred to the course: <strong>${courseName}</strong>.</p>
            <p>This course is designed to help you grow your skills and achieve your goals.</p>
            <p>🚀 <strong>Start Learning Today!</strong> 🚀</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
            <p>Happy Learning! 🎓</p>
            <p><strong>Best Regards,</strong><br>[Your Learning Platform Team]</p>
        </div>
    `,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { sendEmailNotification };
