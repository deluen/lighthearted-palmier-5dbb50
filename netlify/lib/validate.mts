export interface BookInput {
  title?: unknown;
  author?: unknown;
  isbn?: unknown;
  genre?: unknown;
  publicationYear?: unknown;
  publisher?: unknown;
  description?: unknown;
}

export interface ValidatedBook {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  description: string;
}

function isBlank(value: unknown): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

export function validateBook(input: BookInput): { errors: Record<string, string> } | { book: ValidatedBook } {
  const errors: Record<string, string> = {};

  if (isBlank(input.title)) errors.title = "Title is required";
  if (isBlank(input.author)) errors.author = "Author is required";
  if (isBlank(input.isbn)) errors.isbn = "ISBN is required";
  if (isBlank(input.genre)) errors.genre = "Genre is required";
  if (isBlank(input.publisher)) errors.publisher = "Publisher is required";

  const year = input.publicationYear;
  if (year === undefined || year === null || year === "") {
    errors.publicationYear = "Publication year is required";
  } else {
    const yearNum = Number(year);
    if (!Number.isInteger(yearNum)) {
      errors.publicationYear = "Publication year is required";
    } else if (yearNum < 1000) {
      errors.publicationYear = "Publication year must be after 1000";
    } else if (yearNum > 2100) {
      errors.publicationYear = "Publication year must be before 2100";
    }
  }

  const description = typeof input.description === "string" ? input.description : "";
  if (description.length > 2000) {
    errors.description = "Description must be at most 2000 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    book: {
      title: (input.title as string).trim(),
      author: (input.author as string).trim(),
      isbn: (input.isbn as string).trim(),
      genre: (input.genre as string).trim(),
      publicationYear: Number(input.publicationYear),
      publisher: (input.publisher as string).trim(),
      description,
    },
  };
}
