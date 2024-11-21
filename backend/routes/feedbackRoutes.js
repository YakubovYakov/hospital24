const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const { sendEmail } = require("../utils/mailer");

router.get("/", feedbackController.getFeedbacks);
router.get("/:deptId", feedbackController.getDepartmentFeedbacks);

router.post('/send-feedback', async (req, res) => {
	console.log('Получен запрос на отправку письма:', req.body);
  const { name, email, phone, message, doctor, type } = req.body;
  let recipientEmail;
  if (type === 'feedback') {
    recipientEmail = 'gkb24@zdrav.mos.ru';
  } else if (type === 'appointment') {
    recipientEmail = 'gkb24-pmu@zdrav.mos.ru';
	} else {
    return res.status(400).json({ error: 'Неверный тип запроса' });
  }
	console.log(`Отправка письма на адрес: ${recipientEmail}`);
  try {
    await sendEmail(
      recipientEmail,
      'Новое сообщение',
      `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nВрач: ${doctor}\nСообщение: ${message}`
    );
    res.status(200).json({ message: 'Письмо успешно отправлено' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при отправке письма' });
  }
});

module.exports = router;
