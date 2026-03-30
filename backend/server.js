require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function saveToDatabase(data) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO leads (name, phone, email, project_type, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [data.name, data.phone, data.email, data.projectType, data.message]
    );
  } finally {
    connection.release();
  }
}

async function sendEmail(data) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: 'Новая заявка с сайта nazarenkoarchitect.ru',
    text: `
Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
Тип проекта: ${data.projectType}
Сообщение: ${data.message || '—'}

---
Дата: ${new Date().toLocaleString('ru-RU')}
    `,
    html: `
<h2>Новая заявка с сайта</h2>
<p><strong>Имя:</strong> ${data.name}</p>
<p><strong>Телефон:</strong> ${data.phone}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Тип проекта:</strong> ${data.projectType}</p>
<p><strong>Сообщение:</strong> ${data.message || '—'}</p>
<hr>
<p><em>Дата: ${new Date().toLocaleString('ru-RU')}</em></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendToTelegram(data) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !CHAT_ID) return;
  
  const text = `
📬 *Новая заявка с сайта*

*Имя:* ${data.name}
*Телефон:* ${data.phone}
*Email:* ${data.email}
*Тип проекта:* ${data.projectType}
*Сообщение:* ${data.message || '—'}
  `;
  
  await bot.sendMessage(CHAT_ID, text, { parse_mode: 'Markdown' });
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, projectType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Имя и телефон обязательны' });
    }

    await saveToDatabase({ name, phone, email, projectType, message });
    await sendEmail({ name, phone, email, projectType, message });
    await sendToTelegram({ name, phone, email, projectType, message });

    res.json({ success: true, message: 'Заявка принята' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Ошибка обработки заявки' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
