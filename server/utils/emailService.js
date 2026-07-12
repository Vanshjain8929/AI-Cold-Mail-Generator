const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("\n========== EMAIL SERVICE START ==========");

        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Email credentials not configured");
        }

        console.log("\nCreating transporter...");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            requireTLS: true,
        });

        console.log("Transporter created successfully");



        console.log("✅ SMTP connected successfully");

        const mailOptions = {
            from:
                options.from ||
                `"AI Cold Mail Generator" <${process.env.EMAIL_USER}>`,

            to: options.to,

            subject: options.subject,

            text: options.text,

            html: options.html || `<p>${options.text}</p>`,
        };


        console.log("\nSending email...");
        console.log("To:", options.to);
        console.log("Subject:", options.subject);

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email sent successfully");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);

        console.log("========== EMAIL SERVICE END ==========\n");

        return info;

    } catch (error) {

        console.error("\n========== EMAIL ERROR ==========");
        console.error(error);
        console.error("========== EMAIL ERROR END ==========\n");

        throw error;
    }
};

module.exports = sendEmail;