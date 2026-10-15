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

  // Simulação de custo do cashback com percentual variável
  const valor = document.getElementById('valor-venda');
  const vendas = document.getElementById('vendas-mes');
  const pct = document.getElementById('pct');
  if (valor && vendas && pct) {
    const DESCONTO_REFERENCIA = 10;
    const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const num = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
    const $ = (id) => document.getElementById(id);
    const atalhos = document.querySelectorAll('.conta__atalhos [data-pct]');

    const calcular = () => {
      const venda = Math.max(0, Number(valor.value) || 0);
      const qtd = Math.max(0, Math.round(Number(vendas.value) || 0));
      const p = Number(pct.value);
      const porVenda = venda * p / 100;
      const noMes = porVenda * qtd;
      const desconto = venda * qtd * DESCONTO_REFERENCIA / 100;

      pct.style.setProperty('--preenchido', `${((p - pct.min) / (pct.max - pct.min)) * 100}%`);
      $('pct-valor').textContent = `${num.format(p)}%`;
      pct.setAttribute('aria-valuetext', `${num.format(p)} por cento`);
      $('res-cashback').textContent = brl.format(porVenda);
      $('res-mes').textContent = brl.format(noMes);
      $('res-desconto').textContent = brl.format(desconto);
      $('res-economia').textContent = brl.format(Math.max(0, desconto - noMes));
      atalhos.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.pct) === p)));
    };

    [valor, vendas, pct].forEach((campo) => campo.addEventListener('input', calcular));
    atalhos.forEach((b) => b.addEventListener('click', () => { pct.value = b.dataset.pct; calcular(); }));
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
