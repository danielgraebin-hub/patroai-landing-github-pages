# PatroAI Landing — GitHub Pages

Versão estática da landing da PatroAI, pronta para publicar no GitHub Pages sem Railway.

## Estrutura

- `index.html` → redireciona para a versão em português
- `public/pt/index.html`
- `public/en/index.html`
- `public/assets/*`
- `public/robots.txt`
- `public/sitemap.xml`

## Formulário

O formulário usa o FormSubmit e envia as mensagens para `Daniel@patroai.com`, sem mostrar o e-mail ao visitante na interface.

Na primeira vez que publicar, o FormSubmit pode pedir uma confirmação por e-mail para ativar o recebimento.

## WhatsApp

Número configurado:
- `+55 51 98969-7605`

Mensagem automática:
- PT-BR: `Olá! Vim pela landing da PatroAI e gostaria de solicitar um diagnóstico estratégico para entender como a inteligência artificial pode ser aplicada na minha empresa.`
- EN: `Hello! I came from the PatroAI landing page and would like to request a strategic assessment to understand how artificial intelligence can be applied to my company.`

## Publicação no GitHub Pages

1. Crie um repositório novo
2. Suba todos os arquivos deste pacote
3. Em **Settings > Pages**, escolha **Deploy from branch**
4. Selecione a branch `main` e a pasta raiz `/`
5. Salve

## Domínio próprio

Depois, em **Settings > Pages > Custom domain**, informe o domínio final da PatroAI.

## Observação

Os metadados SEO estão configurados com `https://patroai.com`. Se o domínio final for outro, vale atualizar:
- canonical
- Open Graph URL
- sitemap.xml
- robots.txt
