# Ponte — código para continuar o desenvolvimento

Este pacote contém o código do protótipo Ponte, correspondente à versão 27 do site.

## Arquivos
- index.html: estrutura da página.
- style.css: identidade visual e estilos responsivos.
- app.js: navegação, telas, interações e dados de demonstração.

## Executar
Não há instalação de dependências nem etapa de build.
Sirva esta pasta com um servidor HTTP estático (por exemplo: python3 -m http.server 8000) e abra http://localhost:8000.

## Estado atual
- HTML, CSS e JavaScript sem framework.
- Dados salvos no localStorage do navegador, chave ponte-demo-v1.
- Clara e Rafael são perfis de demonstração; não há autenticação real entre eles.
- Mensagens são simuladas no mesmo navegador, sem envio externo.
- Ajuda de escrita guiada; nenhuma IA ou chave de API está conectada.
- Não há sincronização entre celulares, backend, notificações push, manifest de PWA ou service worker.
- As fontes são carregadas pelo Google Fonts; há referências externas para leituras bíblicas e pesquisa.
- Este ZIP não contém os registros pessoais, fotos ou mensagens guardados no navegador da usuária.

## Organização aprovada
- Meu espaço: início simples, Meu jeito, Oração e Conversas.
- Meu jeito: Importante para mim e Me faz bem. A pessoa escolhe a seção e o compartilhamento.
- Sobre o parceiro: preferências compartilhadas e Demonstrar carinho.
- Demonstrar carinho: Agora, Ideias guardadas e Lembretes; iniciativas pessoais dentro de Ideias guardadas.
- Nós dois: versículo do casamento imediatamente após O nosso lugar; agenda, conversas, combinados, foto, plantinha e orações compartilhadas.
- Cards de oração compactos com setas para expandir e recolher.
- Preservar visual suave, textos curtos, navegação clara e a escolha de cada pessoa sobre o que compartilhar.

## Contexto para o Claude
Quero adaptar este projeto para uso no celular, preservando o visual e as funcionalidades existentes. Primeiro analise o código e proponha o caminho para instalação e sincronização entre os celulares do casal. Não trate a troca de perfis de demonstração como autenticação. Não apresente os roteiros existentes como IA conectada. Preserve os registros locais ao planejar uma migração para backend.

## Referência
Site: https://ponte-a-dois-melina.melina-t-roulet.chatgpt.site
Fonte: commit 4cd590264d0b52fc2ef7c07ca00afa4c2cc85f06
