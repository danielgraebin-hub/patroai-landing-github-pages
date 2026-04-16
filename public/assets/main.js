const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const statusEl = document.querySelector('#formStatus');
const params = new URLSearchParams(window.location.search);
const isPt = document.documentElement.lang.toLowerCase().startsWith('pt');

if (statusEl) {
  const sent = params.get('enviado') === '1' || params.get('sent') === '1';
  if (sent) {
    statusEl.className = 'form-status is-success';
    statusEl.textContent = isPt
      ? 'Mensagem enviada com sucesso. Retornaremos em breve.'
      : 'Message sent successfully. We will get back to you soon.';
  }
}
