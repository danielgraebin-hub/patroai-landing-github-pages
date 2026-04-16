const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(navToggle && nav){
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const form = document.querySelector('#contactForm');
const statusEl = document.querySelector('#formStatus');

if(form && statusEl){
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const locale = formData.get('locale') || 'pt-BR';
    const payload = Object.fromEntries(formData.entries());

    statusEl.className = 'form-status';
    statusEl.textContent = locale === 'en' ? 'Sending message...' : 'Enviando mensagem...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if(!response.ok || !data.ok){
        throw new Error(data.message || 'Request failed');
      }

      form.reset();
      const localeField = form.querySelector('input[name="locale"]');
      if(localeField){
        localeField.value = locale;
      }
      statusEl.className = 'form-status is-success';
      statusEl.textContent = data.message;
    } catch (error) {
      statusEl.className = 'form-status is-error';
      statusEl.textContent = error.message || (locale === 'en'
        ? 'We could not send your message right now.'
        : 'Não foi possível enviar sua mensagem agora.');
    }
  });
}
