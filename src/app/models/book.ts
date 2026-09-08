export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  description: string;
}

export type BookInput = Omit<Book, "id">;

export interface BookFieldErrors {
  errors: Partial<Record<keyof BookInput, string>>;
}
