import { Book, StatusBook } from "./types/Book";

let books: Array<Book> = [];
console.log(books);
const bookForm = document.getElementById("addBookForm") as HTMLFormElement;
const bookList = document.getElementById("bookList") as HTMLUListElement;

bookForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const bookFormData = new FormData(bookForm);
  const novoLivro: Book = {
    title: bookFormData.get("book-title") as string,
    author: bookFormData.get("book-author") as string,
    year: Number(bookFormData.get("book-year")),
    gender: bookFormData.get("book-genre") as string,
    status: bookFormData.get("book-status") as StatusBook,
  };

  books.push(novoLivro);
  bookForm.reset();
  console.log(books);
  renderBooks();
});

function renderBooks(): void {
  bookList.innerHTML = "";
  books.forEach((book) => {
    const li = document.createElement("li") as HTMLLIElement;
    li.innerHTML = ` <div class="p-4 hover:bg-surface-container-low transition-colors flex items-center justify-between group">
   <div class="flex items-center gap-4">
     <div
       class="w-12 h-16 bg-surface-variant rounded shrink-0 flex items-center justify-center overflow-hidden">
       <img class="w-full h-full object-cover"
         data-alt="A highly detailed book cover illustration showing an abstract representation of interconnected networks in deep Oxford blue and stark white. Modern, clean lines, corporate intellectual style. High quality, clear, no text."
         src="https:lh3.googleusercontent.com/aida-public/AB6AXuARC64s_l7zgFp-VAHGG-ZnFgoZjy7__i83nf3wZjsPRS4fTn7VRFssY05fHOX2eoyISOVGjGSaxFZVeU2Bx55krvwQPNYE8UOr1Nm7ixnSQVbardARYtkYZ_2JvfUuzpaE2yDkdvMljpSOIOFA-mtzIKGx6Q_ZsgiSfxFn92wNoTppDiqe3DKuv70RqV8DTarZgK9jDMyLnnzTzPAkiWMaq2sEmX3leD-EGFmZfWcLx1qMgfb7v_LA6TWTePtdsv2RM3TEIkjhtvzT" />
     </div>
     <div>
       <h4 class="font-headline-md text-body-lg text-primary leading-tight">${book.title}</h4>
       <p class="font-body-sm text-body-sm text-on-surface-variant">${book.author}</p>
     </div>
   </div>
   <div class="flex items-center gap-6">
     <span
       class="px-3 py-1 bg-primary-container bg-opacity-20 text-primary-container rounded-full font-label-sm text-label-sm uppercase tracking-wider">${book.gender}</span>
     <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
       <button class="p-2 text-secondary hover:text-primary rounded-full hover:bg-surface-variant"><span
           class="material-symbols-outlined text-sm">edit</span></button>
       <button class="p-2 text-secondary hover:text-error rounded-full hover:bg-error-container"><span
           class="material-symbols-outlined text-sm">delete</span></button>
     </div>
   </div>
 </div>
`;
    bookList.appendChild(li);
  });
}

renderBooks();
