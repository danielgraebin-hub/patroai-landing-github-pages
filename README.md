# PatroAI Landing

Landing institucional da PatroAI com foco em soluções de IA para empresas.

## Rodando localmente

```bash
npm install
npm start
```

## Formulário de contato

O formulário envia mensagens para o backend em `/api/contact`, sem expor o e-mail ao usuário na interface.

Configure estas variáveis de ambiente no deploy:

- `CONTACT_EMAIL=Daniel@patroai.com`
- `SMTP_HOST=...`
- `SMTP_PORT=587`
- `SMTP_USER=...`
- `SMTP_PASS=...`
- `SMTP_FROM=PatroAI <no-reply@patroai.com>` (opcional)

## WhatsApp

Botão configurado para:
- `+55 51 98969-7605`

## Mensagem automática do WhatsApp

PT-BR:
- `Olá! Vim pela landing da PatroAI e gostaria de solicitar um diagnóstico estratégico para entender como a inteligência artificial pode ser aplicada na minha empresa.`

EN:
- `Hello! I came from the PatroAI landing page and would like to request a strategic assessment to understand how artificial intelligence can be applied to my company.`
