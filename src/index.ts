import { Book, StatusBook } from "./types/Book";

const bookForm = document.getElementById("addBookForm") as HTMLFormElement;
const bookList = document.getElementById("bookList") as HTMLUListElement;
const buttonForm = document.getElementById("btn_form") as HTMLButtonElement;
const buttonText = buttonForm.querySelector("span") as HTMLSpanElement;
const inputBusca = document.getElementById("search_input") as HTMLInputElement;

const bookFormContainer = document.getElementById(
  "form-add-book",
) as HTMLElement;

const totalBookVolumes = document.getElementById(
  "totalBookVolumes",
) as HTMLSpanElement;
const totalBooksBorrowedEl = document.getElementById(
  "totalBooksBorrowed",
) as HTMLSpanElement;
const totalBooksCompletedEl = document.getElementById(
  "totalBooksCompleted",
) as HTMLSpanElement;

let books: Array<Book> = [];
let currentEditingId: number | null = null;
let currentFilter: StatusBook | null = null;

inputBusca.addEventListener("input", filtrarLivros);

function filtrarLivros(event: Event): void {
  const input = event.target as HTMLInputElement;
  const termo: string = input.value.toLowerCase();

  let baseList = currentFilter
    ? books.filter((b) => b.status === currentFilter)
    : books;

  const produtosFiltrados: Book[] = baseList.filter((produto) =>
    produto.title.toLowerCase().includes(termo),
  );

  renderBooks(produtosFiltrados);
}

// Açoes
bookList.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  // Deletar livro
  const botaoDeletar = target.closest(".btn_delete") as HTMLButtonElement;
  if (botaoDeletar) {
    const idDoLivro = botaoDeletar.dataset.id;
    if (idDoLivro) {
      const index = books.findIndex((book) => book.id === Number(idDoLivro));
      if (index !== -1) books.splice(index, 1);
      renderBooks();
      renderTotalBooks();
      renderTotalBooksBorrowed();
      renderTotalBooksCompleted();
    }
    return;
  }

  // Editar Livro
  const botaoEditar = target.closest(".btn_edit") as HTMLButtonElement;
  if (botaoEditar) {
    const idDoLivro = botaoEditar.dataset.id;
    if (idDoLivro) {
      editarLivro(Number(idDoLivro));
    }
    return;
  }

  // Quando o livro já foi lido
  const botaoMarcarLido = target.closest(".btn_mark_read") as HTMLButtonElement;
  if (botaoMarcarLido) {
    const idDoLivro = Number(botaoMarcarLido.dataset.id);
    const bookIndex = books.findIndex((book) => book.id === idDoLivro);

    if (bookIndex !== -1) {
      const livro = books[bookIndex];
      livro.status = "Lido";

      renderBooks();
      renderTotalBooks();
      renderTotalBooksBorrowed();
      renderTotalBooksCompleted();
    }
  }
});

// Formulário
buttonForm.onclick = () => {
  const display = getComputedStyle(bookFormContainer).display;

  if (display === "none") {
    bookFormContainer.style.display = "block";
    buttonText.textContent = "Ocultar";
  } else {
    bookFormContainer.style.display = "none";
    buttonText.textContent = "Adicionar Livro";

    currentEditingId = null;
    const submitBtn = bookForm.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitBtn) submitBtn.textContent = "Adicionar Livro";
  }
};

// Adicionar / Editar
bookForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const bookFormData = new FormData(bookForm);
  const submitBtn = bookForm.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement;

  if (currentEditingId !== null) {
    const index = books.findIndex((b) => b.id === currentEditingId);
    if (index !== -1) {
      books[index] = {
        id: currentEditingId,
        title: String(bookFormData.get("book-title") as string).toLowerCase(),
        author: bookFormData.get("book-author") as string,
        year: Number(bookFormData.get("book-year")),
        gender: bookFormData.get("book-genre") as string,
        status: bookFormData.get("book-status") as StatusBook,
      };
    }
    currentEditingId = null;
    if (submitBtn) submitBtn.textContent = "Adicionar Livro";
  } else {
    const novoLivro: Book = {
      id: Math.floor(Math.random() * 10001),
      title: String(bookFormData.get("book-title") as string).toLowerCase(),
      author: bookFormData.get("book-author") as string,
      year: Number(bookFormData.get("book-year")),
      gender: bookFormData.get("book-genre") as string,
      status: bookFormData.get("book-status") as StatusBook,
    };
    books.push(novoLivro);
  }

  bookForm.reset();
  renderBooks();
  renderTotalBooks();
  renderTotalBooksBorrowed();
  renderTotalBooksCompleted();
});

function renderTotalBooks(): void {
  totalBookVolumes.innerText = String(books.length);
}

function renderTotalBooksBorrowed(): void {
  const total = books.filter((book) => book.status === "Emprestado").length;
  totalBooksBorrowedEl.innerText = String(total);
}

function renderTotalBooksCompleted(): void {
  const total = books.filter((book) => book.status === "Lido").length;
  totalBooksCompletedEl.innerText = String(total);
}

function getFilteredBooks(): Book[] {
  if (!currentFilter) return books;
  return books.filter((book) => book.status === currentFilter);
}

function renderBooks(listaDeLivros: Book[] = getFilteredBooks()): void {
  bookList.innerHTML = "";
  listaDeLivros.forEach((book) => {
    const li = document.createElement("li") as HTMLLIElement;

    const markReadButton =
      book.status !== "Lido"
        ? `<button class="p-2 text-secondary hover:text-primary rounded-full hover:bg-surface-variant btn_mark_read" data-id="${book.id}" title="Marcar como lido">
           <span class="material-symbols-outlined text-sm">check_circle</span>
         </button>`
        : "";

    li.innerHTML = `
      <div class="p-4 hover:bg-surface-container-low transition-colors flex items-center justify-between group">
        <div class="flex items-center gap-4">
          <div class="w-12 h-16 bg-surface-variant rounded shrink-0 flex items-center justify-center overflow-hidden">
            <img class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARC64s_l7zgFp-VAHGG-ZnFgoZjy7__i83nf3wZjsPRS4fTn7VRFssY05fHOX2eoyISOVGjGSaxFZVeU2Bx55krvwQPNYE8UOr1Nm7ixnSQVbardARYtkYZ_2JvfUuzpaE2yDkdvMljpSOIOFA-mtzIKGx6Q_ZsgiSfxFn92wNoTppDiqe3DKuv70RqV8DTarZgK9jDMyLnnzTzPAkiWMaq2sEmX3leD-EGFmZfWcLx1qMgfb7v_LA6TWTePtdsv2RM3TEIkjhtvzT"
              alt="Capa do livro" />
          </div>
          <div>
            <h4 class="font-headline-md text-body-lg text-primary leading-tight">
              ${book.title.charAt(0).toUpperCase() + book.title.substring(1)}
            </h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${book.author}</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <span class="px-3 py-1 bg-primary-container bg-opacity-20 text-primary-container rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            ${book.gender}
          </span>
          <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            ${markReadButton}
            <button class="p-2 text-secondary hover:text-primary rounded-full hover:bg-surface-variant btn_edit" data-id="${book.id}">
              <span class="material-symbols-outlined text-sm">edit</span>
            </button>
            <button class="p-2 text-secondary hover:text-error rounded-full hover:bg-error-container btn_delete" data-id="${book.id}">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
    bookList.appendChild(li);
  });

  updateFilterIndicator();
}

function editarLivro(id: number): void {
  const book = books.find((b) => b.id === id);
  if (!book) return;

  (document.getElementById("book-title") as HTMLInputElement).value =
    book.title.charAt(0).toUpperCase() + book.title.substring(1);
  (document.getElementById("book-author") as HTMLInputElement).value =
    book.author;
  (document.getElementById("book-year") as HTMLInputElement).value = String(
    book.year,
  );
  (document.getElementById("book-genre") as HTMLInputElement).value =
    book.gender;
  (document.getElementById("book-status") as HTMLSelectElement).value =
    book.status;

  bookFormContainer.style.display = "block";
  buttonText.textContent = "Ocultar";

  currentEditingId = id;

  const submitBtn = bookForm.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement;
  if (submitBtn) submitBtn.textContent = "Atualizar Livro";
}

function setupFilterCards(): void {
  const completedCard = document.getElementById("completedCard");
  if (completedCard) {
    completedCard.style.cursor = "pointer";
    completedCard.addEventListener("click", () => {
      currentFilter = "Lido";
      renderBooks();
    });
  }

  const borrowedCard = document.getElementById("borrowedCard");
  if (borrowedCard) {
    borrowedCard.style.cursor = "pointer";
    borrowedCard.addEventListener("click", () => {
      currentFilter = "Emprestado";
      renderBooks();
    });
  }
}

function updateFilterIndicator(): void {
  const header = document
    .querySelector("#bookList")
    ?.parentElement?.querySelector(
      ".flex.justify-between.items-center",
    ) as HTMLElement;
  if (!header) return;

  const existing = header.querySelector("#filterIndicator");
  if (existing) existing.remove();

  if (!currentFilter) return;

  const indicator = document.createElement("div");
  indicator.id = "filterIndicator";
  indicator.className = "flex items-center gap-2 ml-3";

  const label = document.createElement("span");
  label.className =
    "px-3 py-1 rounded-full bg-primary-container text-primary text-xs font-medium";
  label.textContent = currentFilter === "Lido" ? "Concluídos" : "Emprestados";

  const clearBtn = document.createElement("button");
  clearBtn.className = "text-xs text-primary hover:underline font-medium px-2";
  clearBtn.textContent = "Limpar filtros";

  clearBtn.onclick = () => {
    currentFilter = null;
    renderBooks();
  };

  indicator.appendChild(label);
  indicator.appendChild(clearBtn);
  header.appendChild(indicator);
}

renderBooks();
renderTotalBooks();
renderTotalBooksBorrowed();
renderTotalBooksCompleted();
setupFilterCards();
