export type Book = {
  title: string;
  author: string;
  year: number;
  gender: string;
  status: StatusBook;
};
export type StatusBook = "Disponivel" | "Lido" | "Emprestado";
