import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Book, BookInput } from "../models/book";

@Injectable({ providedIn: "root" })
export class BookService {
  private readonly baseUrl = "/api/books";

  constructor(private readonly http: HttpClient) {}

  list(query?: string): Observable<Book[]> {
    const params = query ? new HttpParams().set("query", query) : undefined;
    return this.http.get<Book[]>(this.baseUrl, { params });
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  create(book: BookInput): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  update(id: number, book: BookInput): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
