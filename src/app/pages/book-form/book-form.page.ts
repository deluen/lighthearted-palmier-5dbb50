import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";

import { BookInput } from "../../models/book";
import { BookService } from "../../services/book.service";

@Component({
  selector: "app-book-form",
  standalone: true,
  templateUrl: "./book-form.page.html",
  styleUrls: ["./book-form.page.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class BookFormPage implements OnInit {
  form: FormGroup;
  bookId: number | null = null;
  heading = "Add Book";
  submitLabel = "Save";
  serverErrors: Partial<Record<keyof BookInput, string>> = {};

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      isbn: ["", Validators.required],
      genre: ["", Validators.required],
      publicationYear: [null, [Validators.required, Validators.min(1000), Validators.max(2100)]],
      publisher: ["", Validators.required],
      description: ["", Validators.maxLength(2000)],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.bookId = Number(idParam);
      this.heading = "Edit Book";
      this.submitLabel = "Update";
      this.bookService.get(this.bookId).subscribe((book) => this.form.patchValue(book));
    }
  }

  fieldError(field: keyof BookInput): string | null {
    const control = this.form.get(field);
    if (this.serverErrors[field]) {
      return this.serverErrors[field] ?? null;
    }
    if (control?.touched && control.invalid) {
      if (control.errors?.["required"]) return `${this.label(field)} is required`;
      if (control.errors?.["min"]) return `${this.label(field)} must be after 1000`;
      if (control.errors?.["max"]) return `${this.label(field)} must be before 2100`;
      if (control.errors?.["maxlength"]) return `${this.label(field)} must be at most 2000 characters`;
    }
    return null;
  }

  private label(field: keyof BookInput): string {
    if (field === "publicationYear") return "Publication year";
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serverErrors = {};
    const value = this.form.value as BookInput;

    const request = this.bookId
      ? this.bookService.update(this.bookId, value)
      : this.bookService.create(value);

    request.subscribe({
      next: () => this.router.navigate(["/books"]),
      error: (err) => {
        this.serverErrors = err?.error?.errors ?? {};
      },
    });
  }
}
