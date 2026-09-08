import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { books } from "../../db/schema.js";
import { validateBook } from "../lib/validate.mjs";

export default async (req: Request, context: Context) => {
  const id = Number(context.params.id);

  if (!Number.isInteger(id)) {
    return new Response("Invalid book id", { status: 400 });
  }

  if (req.method === "GET") {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    if (!book) {
      return Response.json({ message: `Book not found with id ${id}` }, { status: 404 });
    }
    return Response.json(book);
  }

  if (req.method === "PUT") {
    const [existing] = await db.select().from(books).where(eq(books.id, id));
    if (!existing) {
      return Response.json({ message: `Book not found with id ${id}` }, { status: 404 });
    }

    const body = await req.json();
    const result = validateBook(body);

    if ("errors" in result) {
      return Response.json({ errors: result.errors }, { status: 400 });
    }

    const [updated] = await db.update(books).set(result.book).where(eq(books.id, id)).returning();
    return Response.json(updated);
  }

  if (req.method === "DELETE") {
    const [existing] = await db.select().from(books).where(eq(books.id, id));
    if (!existing) {
      return Response.json({ message: `Book not found with id ${id}` }, { status: 404 });
    }

    await db.delete(books).where(eq(books.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/books/:id",
};
