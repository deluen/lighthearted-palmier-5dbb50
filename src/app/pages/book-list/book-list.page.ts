import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  AlertController,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, createOutline, trashOutline } from "ionicons/icons";

import { Book } from "../../models/book";
import { BookService } from "../../services/book.service";

@Component({
  selector: "app-book-list",
  standalone: true,
  templateUrl: "./book-list.page.html",
  styleUrls: ["./book-list.page.scss"],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonTitle,
    IonToolbar,
  ],
})
export class BookListPage implements OnInit {
  books: Book[] = [];
  query = "";
  errorMessage = "";

  constructor(private readonly bookService: BookService, private readonly alertController: AlertController) {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.errorMessage = "";
    this.bookService.list(this.query).subscribe({
      next: (books) => (this.books = books),
      error: () => (this.errorMessage = "Unable to load books. Please try again."),
    });
  }

  clear(): void {
    this.query = "";
    this.search();
  }

  async confirmDelete(book: Book): Promise<void> {
    const alert = await this.alertController.create({
      header: "Delete this book?",
      message: `"${book.title}" will be permanently removed.`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "destructive",
          handler: () => this.delete(book),
        },
      ],
    });
    await alert.present();
  }

  private delete(book: Book): void {
    this.bookService.delete(book.id).subscribe({
      next: () => this.search(),
      error: () => (this.errorMessage = "Unable to delete book. Please try again."),
    });
  }
}
