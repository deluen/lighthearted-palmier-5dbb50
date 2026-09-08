import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial().primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  isbn: text().notNull(),
  genre: text().notNull(),
  publicationYear: integer("publication_year").notNull(),
  publisher: text().notNull(),
  description: text().default(""),
});
