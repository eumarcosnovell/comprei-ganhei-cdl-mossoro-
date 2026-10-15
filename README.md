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

- Título, descrição, canonical, Open Graph e imagem de compartilhamento (`assets/img/og-lojistas.png`, 1200x630).
- Um único `h1`, hierarquia de títulos semântica, conteúdo legível sem JavaScript.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList, Service, HowTo e FAQPage.
- Bloco "Em resumo" com a definição do programa logo após o hero (trecho citável por buscadores e IAs).
- `llms.txt` com os fatos do programa; `robots.txt` liberando buscadores de IA; `sitemap.xml`.
- Página leve: fonte do sistema, sem imagens pesadas, sem bibliotecas.

## Pendências (confirmar com a CDL antes de publicar)

1. **WhatsApp que recebe os cadastros:** `WHATSAPP_CDL` em `assets/js/main.js` (hoje é um número fictício).
2. **Condições de adesão:** custo, percentual de cashback, quem custeia, se exige ser associado. Ver `TODO(CDL)` no FAQ de `lojistas/index.html`.
3. **Link oficial de cadastro de empresas**, se houver formulário próprio da CDL (pode substituir o envio por WhatsApp).
4. **Identidade visual:** cores e logo oficiais (variáveis em `:root` de `assets/css/style.css`).
5. **Números da seção "O comércio de Mossoró já está aderindo":** atualizar conforme a adesão real.
6. **Data de lançamento** e analytics (o formulário já dispara `generate_lead` se o `gtag` estiver instalado).
