// Comprei Ganhei · interações das landing pages (sem dependências)

// TODO(CDL): número oficial de WhatsApp que recebe os cadastros (formato 55 + DDD + número, só dígitos).
const WHATSAPP_CDL = '5584000000000';

(() => {
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.querySelector('.menu__toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    const fechar = () => {
      menu.classList.remove('aberto');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    toggle.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
  }

  // CTA fixo: aparece só quando nem o hero nem o formulário estão na tela
  const ctaFixo = document.querySelector('.cta-fixo');
  const alvos = [document.querySelector('.hero'), document.getElementById('cadastro')].filter(Boolean);
  if (ctaFixo && alvos.length && 'IntersectionObserver' in window) {
    const visiveis = new Set();
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
      ctaFixo.classList.toggle('oculto', visiveis.size > 0);
    }, { threshold: 0.1 });
    alvos.forEach((alvo) => obs.observe(alvo));
  } else if (ctaFixo) {
    ctaFixo.classList.remove('oculto');
  }

  // Formulário: monta a mensagem e abre o WhatsApp da CDL
  const form = document.getElementById('form-cadastro');
  if (form) {
    const erro = form.querySelector('.form__erro');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const campos = [...form.querySelectorAll('input, select')];
      let valido = true;
      campos.forEach((campo) => {
        const ok = campo.value.trim() !== '';
        campo.setAttribute('aria-invalid', String(!ok));
        if (!ok) valido = false;
      });
      const tel = form.whatsapp.value.replace(/\D/g, '');
      if (tel.length < 10) {
        form.whatsapp.setAttribute('aria-invalid', 'true');
        valido = false;
      }
      erro.hidden = valido;
      if (!valido) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }

      const dados = Object.fromEntries(new FormData(form));
      const mensagem = [
        'Olá! Quero cadastrar minha loja no Comprei Ganhei.',
        `Nome: ${dados.nome}`,
        `Loja: ${dados.loja}`,
        `Segmento: ${dados.segmento}`,
        `WhatsApp: ${dados.whatsapp}`,
      ].join('\n');

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { form: 'cadastro_lojista', segmento: dados.segmento });
      }

      window.open(`https://wa.me/${WHATSAPP_CDL}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
    });
  }
})();
