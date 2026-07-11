const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const timeoutMs = Number(process.env.EMAIL_TIMEOUT_MS) || 10000;
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Email delivery timed out')), timeoutMs);
    });

    await Promise.race([
        transporter.sendMail({
            from: `"AI Cold Mail Generator" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html || `<p>${options.text}</p>`,
        }),
        timeoutPromise,
    ]);

    console.log("Email sent");
};

module.exports = sendEmail;