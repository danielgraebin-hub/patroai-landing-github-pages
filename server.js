const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));
app.use(express.json());

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

app.get('/', (_req, res) => res.redirect('/pt/'));

app.post('/api/contact', async (req, res) => {
  try {
    const {
      name = '',
      email = '',
      company = '',
      phone = '',
      message = '',
      locale = 'pt-BR'
    } = req.body || {};

    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({
        ok: false,
        message: locale === 'en'
          ? 'Please fill in name, email, and message.'
          : 'Por favor, preencha nome, e-mail e mensagem.'
      });
    }

    const transporter = createTransporter();

    if (!transporter) {
      return res.status(503).json({
        ok: false,
        message: locale === 'en'
          ? 'Contact form is not configured yet.'
          : 'O formulário de contato ainda não está configurado.'
      });
    }

    const targetEmail = process.env.CONTACT_EMAIL || 'Daniel@patroai.com';
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeCompany = escapeHtml(company.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: targetEmail,
      replyTo: email.trim(),
      subject: `[PatroAI Landing] Novo contato - ${name.trim()}`,
      text: [
        `Nome: ${name.trim()}`,
        `E-mail: ${email.trim()}`,
        `Empresa: ${company.trim()}`,
        `Telefone: ${phone.trim()}`,
        '',
        'Mensagem:',
        message.trim()
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#10273b">
          <h2>Novo contato pela landing PatroAI</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Empresa:</strong> ${safeCompany || '-'}</p>
          <p><strong>Telefone:</strong> ${safePhone || '-'}</p>
          <p><strong>Idioma:</strong> ${escapeHtml(locale)}</p>
          <p><strong>Mensagem:</strong><br>${safeMessage}</p>
        </div>
      `
    });

    return res.json({
      ok: true,
      message: locale === 'en'
        ? 'Message sent successfully. We will get back to you soon.'
        : 'Mensagem enviada com sucesso. Retornaremos em breve.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      ok: false,
      message: (req.body && req.body.locale === 'en')
        ? 'We could not send your message right now.'
        : 'Não foi possível enviar sua mensagem agora.'
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('PatroAI landing running');
});
