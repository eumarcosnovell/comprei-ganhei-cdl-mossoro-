# Comprei Ganhei · Landing pages (CDL Mossoró)

Site estático, sem dependências: HTML, CSS e JS puros.

| Página | Caminho | Status |
| --- | --- | --- |
| Lojistas | `lojistas/index.html` | pronta |
| Cliente final | `index.html` | a fazer |

Estilos e scripts em `assets/` são compartilhados entre as duas páginas.

## Rodar localmente

```bash
npx http-server -p 8080 .
# abrir http://localhost:8080/lojistas/
```

## SEO e GEO aplicados

- Título, descrição, canonical, Open Graph e imagem de compartilhamento (`assets/img/og-lojistas.jpg`, 1200x630).
- Um único `h1`, hierarquia de títulos semântica, conteúdo legível sem JavaScript.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList, Service, HowTo e FAQPage.
- Bloco "Em resumo" com a definição do programa logo após o hero (trecho citável por buscadores e IAs).
- `llms.txt` com os fatos do programa; `robots.txt` liberando buscadores de IA; `sitemap.xml`.
- Página leve: imagens em WebP com carregamento sob demanda, fonte Poppins com `display=swap`, sem bibliotecas.

## Fonte do conteúdo

Textos e regras extraídos da apresentação oficial "Comprei Ganhei · Lojistas" (CDL Mossoró). Imagens da campanha recortadas dos slides 7 a 10 e otimizadas em WebP.

## Pendências (confirmar com a CDL antes de publicar)

1. **Link da Google Play:** no slide 12, o QR Code marcado como "Play Store" aponta para a App Store. O rodapé hoje só traz o link da App Store.
2. **Link para se associar à CDL Mossoró:** ver `TODO(CDL)` no FAQ de `lojistas/index.html`.
3. **Papel do Governo do RN:** o rodapé usa o rótulo genérico "Realização e apoio". Ajustar se houver nomenclatura oficial.
4. **Prêmios:** algumas peças dizem "concorra a prêmios em dinheiro e cashback". A página não fala de prêmios até haver regras oficiais.
5. **Analytics:** os botões de cadastro disparam `generate_lead` se o GA4 (`gtag`) estiver instalado.
