import type { Config } from "@netlify/functions";
import { or, ilike } from "drizzle-orm";
import { db } from "../../db/index.js";
import { books } from "../../db/schema.js";
import { validateBook } from "../lib/validate.mjs";

export default async (req: Request) => {
  if (req.method === "GET") {
    const query = new URL(req.url).searchParams.get("query")?.trim();

    const results = query
      ? await db
          .select()
          .from(books)
          .where(or(ilike(books.title, `%${query}%`), ilike(books.author, `%${query}%`)))
      : await db.select().from(books);

    return Response.json(results);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const result = validateBook(body);

    if ("errors" in result) {
      return Response.json({ errors: result.errors }, { status: 400 });
    }

    const [created] = await db.insert(books).values(result.book).returning();
    return Response.json(created, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/books",
};
