import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  {
    path: "books",
    loadComponent: () => import("./pages/book-list/book-list.page").then((m) => m.BookListPage),
  },
  {
    path: "books/new",
    loadComponent: () => import("./pages/book-form/book-form.page").then((m) => m.BookFormPage),
  },
  {
    path: "books/:id/edit",
    loadComponent: () => import("./pages/book-form/book-form.page").then((m) => m.BookFormPage),
  },
];
