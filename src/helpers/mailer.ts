import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try{
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + }
            )
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = await transporter.sendMail({
            from: 'shreyash5709@gmail.com', // sender address
            to: email, // list of recipients
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // subject line
            html: "<b>Hello world?</b>", // HTML body
        });

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error: any) {
        throw new Error("Error sending email: " + error.message);
    }
}