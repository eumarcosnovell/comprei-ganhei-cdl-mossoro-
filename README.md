# Comprei Ganhei · Landing pages (CDL Mossoró)

Site estático, sem dependências: HTML, CSS e JS puros.

| Página | Caminho | Status |
| --- | --- | --- |
| Lojistas | `lojistas/index.html` | pronta |
| Cliente final | `index.html` | pronta |

Estilos e scripts em `assets/` são compartilhados entre as duas páginas.

## Rodar localmente

```bash
npx http-server -p 8080 .
# abrir http://localhost:8080/ (cliente) e http://localhost:8080/lojistas/
```

## SEO e GEO aplicados

- Título, descrição, canonical, Open Graph e imagem de compartilhamento por página (`assets/img/og-cliente.jpg` e `og-lojistas.jpg`, 1200x630).
- Um único `h1`, hierarquia de títulos semântica, conteúdo legível sem JavaScript.
- JSON-LD: Organization, WebSite, WebPage, HowTo e FAQPage nas duas páginas; Service e BreadcrumbList em lojistas; MobileApplication na página do cliente.
- Bloco "Em resumo" com a definição do programa logo após o hero (trecho citável por buscadores e IAs).
- `llms.txt` com os fatos do programa; `robots.txt` liberando buscadores de IA; `sitemap.xml`.
- Página leve: imagens em WebP com carregamento sob demanda, fonte Poppins com `display=swap`, sem bibliotecas.

## Fonte do conteúdo

Textos e regras extraídos da apresentação oficial "Comprei Ganhei · Lojistas" (CDL Mossoró). Imagens da campanha recortadas dos slides 7 a 10 e otimizadas em WebP.

## Pendências (confirmar com a CDL antes de publicar)

1. **Link da Google Play:** no slide 12, o QR Code marcado como "Play Store" aponta para a App Store. As duas páginas só trazem a App Store (ver `TODO(CDL)`); na página do cliente isso afeta todos os botões de download e o QR Code (`assets/img/qr-app-store.svg`).
2. **Link para se associar à CDL Mossoró:** ver `TODO(CDL)` no FAQ de `lojistas/index.html`.
3. **Papel do Governo do RN:** o rodapé usa o rótulo genérico "Realização e apoio". Ajustar se houver nomenclatura oficial.
4. **Prêmios:** algumas peças (display de chão, móbile) dizem "concorra a prêmios em dinheiro e cashback". As páginas não falam de prêmios até haver regras oficiais, e a do cliente evita essas imagens.
5. **Analytics:** se o GA4 (`gtag`) estiver instalado, os botões de cadastro disparam `generate_lead` e os de download do app disparam `baixar_app`.
6. **App gratuito?** A página do cliente não afirma que o download é gratuito; confirmar na loja e, se for, incluir.
