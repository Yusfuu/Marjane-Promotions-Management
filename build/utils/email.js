"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'Gmail',
    auth: {
        user: 'checker.safiairline@gmail.com',
        pass: 'SafiAIrline@123', // generated ethereal password
    },
});
const mailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Marjan',
        link: 'https://github.com/Yusfuu/Management-of-Promotion-Marjane',
        // Optional product logo
        logo: 'https://upload.wikimedia.org/wikipedia/ar/0/00/Marjane.gif'
    }
});
const sendEmail = async (email, link) => {
    const html = {
        body: {
            intro: 'Welcome to Marjan! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Marjan, please click here:',
                button: {
                    color: '#22BC66',
                    text: 'Confirm your account',
                    link,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    const info = await transporter.sendMail({
        from: 'Marjan <checker.safiairline@gmail.com>',
        to: email,
        subject: "Marjan",
        text: "Marjan",
        html: mailGenerator.generate(html),
    });
    return info;
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map