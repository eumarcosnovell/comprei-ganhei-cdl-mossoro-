// Comprei Ganhei · interações das landing pages (sem dependências)

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

  // CTA fixo: aparece só quando nem o hero nem a chamada final estão na tela
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

  // Simulação de custo do cashback
  const valor = document.getElementById('valor-venda');
  if (valor) {
    const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const resCashback = document.getElementById('res-cashback');
    const resDesconto = document.getElementById('res-desconto');
    const calcular = () => {
      const venda = Math.max(0, Number(valor.value) || 0);
      const pct = Number(document.querySelector('input[name="pct"]:checked').value);
      resCashback.textContent = brl.format(venda * pct / 100);
      resDesconto.textContent = brl.format(venda * 0.10);
    };
    valor.addEventListener('input', calcular);
    document.querySelectorAll('input[name="pct"]').forEach((r) => r.addEventListener('change', calcular));
    calcular();
  }

  // Métrica de cliques nos CTAs de cadastro (dispara se o GA4 estiver instalado)
  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { cta_posicao: link.dataset.cta, destino: 'cadastro_empresa' });
      }
    });
  });
})();
