require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.YANDEX_USER,
    pass: process.env.YANDEX_PASS,
  },
});

// Функция для отправки письма
async function sendEmail(to, subject, text) {
  try {
		console.log(`Отправка письма от ${process.env.YANDEX_USER} к ${to}`);
    const info = await transporter.sendMail({
      from: `"Форма обратной связи" <${process.env.YANDEX_USER}>`,
      to: to,
      subject: subject,
      text: text,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    throw error;
  }
}

module.exports = { transporter, sendEmail };
