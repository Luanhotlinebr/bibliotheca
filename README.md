# 📚 Bibliotheca

Bibliotheca é um aplicativo web leve e intuitivo para gerenciar sua coleção pessoal de livros. Com ele você pode adicionar, editar, excluir, marcar como lido e filtrar seus livros de forma rápida e visual.

---

## ✨ Visão Geral

O Bibliotheca foi criado para quem ama ler e quer ter controle simples sobre sua biblioteca pessoal. A interface é limpa, moderna e funciona diretamente no navegador.

### Principais recursos

- ✅ Adicionar novos livros com título, autor, ano, gênero e status
- ✏️ Editar qualquer informação do livro
- 🗑️ Excluir livros
- ✅ **Marcar como Lido** com um clique
- 📊 Contadores automáticos
- 🔍 Busca instantânea por título
- 🎯 Filtros rápidos clicando nos cards de status

---

## 🚀 Como Começar

1. Instale as dependências necessárias:

```
npm install
```

2. Execute o programa:
   ```bash
   npm run start
   ```

---

## 📖 Como Usar

### 1. Adicionar um novo livro

1. Clique no botão grande **"Adicionar Livro"** (no canto superior direito do dashboard)
2. Preencha os campos:
   - **Título**
   - **Autor**
   - **Ano**
   - **Gênero**
   - **Status** (Disponível / Lido / Emprestado)
3. Clique em **"Adicionar Livro"**

O livro aparecerá imediatamente na lista "Aquisições Recentes".

### 2. Editar um livro

1. Passe o mouse sobre o livro na lista
2. Clique no ícone de **lápis (edit)**
3. Altere as informações desejadas
4. Clique em **"Atualizar Livro"**

### 3. Excluir um livro

1. Passe o mouse sobre o livro
2. Clique no ícone de **lixeira (delete)**
3. O livro será removido instantaneamente

### 4. Marcar um livro como Lido (Flag)

Esta é uma das funcionalidades mais úteis:

1. Localize o livro que você terminou de ler
2. Passe o mouse sobre ele
3. Clique no ícone **✓ check_circle**
4. O status muda automaticamente para **"Lido"**

**Efeito nos contadores:**

- Se o livro estava como **"Emprestado"** → o contador de Empréstimos diminui em 1
- O contador de **Concluídos** sempre aumenta em 1

### 5. Visualizar e Filtrar livros

#### Contadores (Dashboard)

No topo você tem três cards importantes:

| Card              | O que mostra               | Ação ao clicar                    |
| ----------------- | -------------------------- | --------------------------------- |
| **Total Volumes** | Quantidade total de livros | ——————————————                    |
| **Concluído**     | Livros com status "Lido"   | Filtra a lista só por Lidos       |
| **Empréstimos**   | Livros emprestados         | Filtra a lista só por Emprestados |

#### Filtros Rápidos

- Clique no card **Concluído** → a lista mostra apenas livros lidos
- Clique no card **Empréstimos** → a lista mostra apenas livros emprestados
- Um indicador aparece acima da lista com o filtro ativo + botão **"Limpar filtros"**

#### Busca

Use o campo de busca no topo da página para encontrar livros pelo título. A busca funciona mesmo com filtros ativos.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 + Tailwind CSS** (design moderno e responsivo)
- **TypeScript** (código organizado e seguro)
- **Material Symbols** (ícones bonitos e consistentes)

---

## 💡 Dicas de Uso

- Use o status **"Emprestado"** para controlar quem pegou seus livros
- Marque como **"Lido"** sempre que terminar uma leitura para manter seus contadores atualizados
- Combine busca + filtro para encontrar livros rapidamente
- O aplicativo salva os dados apenas na memória do navegador (recarregar a página reseta). Para persistência real, seria necessário integrar com localStorage ou backend.

---

## 📌 Status dos Livros

| Status     | Significado                     | Aparece em qual contador? |
| ---------- | ------------------------------- | ------------------------- |
| Disponível | Livro em sua posse              | Apenas no Total           |
| Lido       | Você já terminou de ler         | Concluídos                |
| Emprestado | Alguém pegou o livro emprestado | Empréstimos               |

---

## 🤝 Contribuição

Este é um projeto simples e aberto. Sinta-se à vontade para:

- Melhorar o design
- Adicionar persistência com `localStorage`
- Criar mais filtros (por gênero, ano, etc.)
- Adicionar capa personalizada para cada livro

---

**Feito com ❤️ para quem ama organizar sua vida literária.**
