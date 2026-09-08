CREATE TABLE "books" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"isbn" text NOT NULL,
	"genre" text NOT NULL,
	"publication_year" integer NOT NULL,
	"publisher" text NOT NULL,
	"description" text DEFAULT ''
);

INSERT INTO "books" ("title", "author", "isbn", "genre", "publication_year", "publisher", "description") VALUES
	('The Hobbit', 'J.R.R. Tolkien', '978-0547928227', 'Fantasy', 1937, 'George Allen & Unwin', 'A hobbit embarks on an unexpected journey.'),
	('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', '978-0747532699', 'Fantasy', 1997, 'Bloomsbury', 'A young wizard discovers his magical heritage.'),
	('Clean Code', 'Robert C. Martin', '978-0132350884', 'Software Engineering', 2008, 'Prentice Hall', 'A handbook of agile software craftsmanship.'),
	('1984', 'George Orwell', '978-0451524935', 'Dystopian', 1949, 'Secker & Warburg', 'A dystopian vision of a totalitarian future.'),
	('The Lord of the Rings', 'J.R.R. Tolkien', '978-0618640157', 'Fantasy', 1954, 'George Allen & Unwin', 'An epic quest to destroy the One Ring.');
