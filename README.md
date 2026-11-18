# Portfólio integrado · Tecnologia e Judô

Prévia local com duas áreas independentes, troca por clique, artes em anime e acervo completo do portfólio de sensei.

## Abrir localmente

Na pasta do repositório:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory portfolio
```

Abra http://localhost:4173/ e selecione Tecnologia ou Judô. Para abrir diretamente o judô, use http://localhost:4173/#judo.

Não há instalação de dependências. As fontes do Google precisam de conexão; as imagens e os dados da galeria são locais.

## Conteúdo integrado

- História pessoal em 9 capítulos, com controles anterior/próximo.
- 5 senseis, preservando os textos e links originais.
- 8 marcos da trajetória, de 2017 a 2025.
- 525 fotos, em 44 páginas, com ampliação e teclado.
- Identidade visual do kit de logo com sakura fornecido pelo usuário.
- Email e endereço do site original. O link de email foi corrigido para o endereço exibido.
- Formulário que prepara uma mensagem no WhatsApp; o visitante revisa e envia por lá. Nada é armazenado no site.

As imagens da galeria são cópias otimizadas até 1600 px com miniaturas; os originais permanecem no repositório de origem. O mapa de nomes originais está em portfolio/assets/sensei/gallery.json.

## Validação e estado

Conferidos: troca entre mundos, tela de 390 px, capítulos, marcos expansíveis, paginação, ampliação, Escape, ausência de referências locais faltantes e alternativa de redução de movimento. Nenhuma publicação realizada; a configuração Vercel existente foi preservada.

Fonte do conteúdo de judô: https://github.com/vinicius-lier/portfolio_sensei, commit 2637ba4. Nenhuma nova cobrança ao OpenRouter.
