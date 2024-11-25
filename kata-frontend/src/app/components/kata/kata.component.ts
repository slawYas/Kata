import {Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KataService } from '../../services/kata.service';
import { Observable } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import {KataResponse} from '../../models/kata-response.interface';

@Component({
  selector: 'app-kata',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './kata.component.html',
  standalone: true,
  styleUrl: './kata.component.css'
})
export class KataComponent {
  kataForm: FormGroup;
  result$: Observable<KataResponse> | undefined;

  constructor(private fb: FormBuilder, private kataService: KataService) {
    this.kataForm = this.fb.group({
      number: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  submit(): void {
    if (this.kataForm.valid) {
      const number = this.kataForm.value.number;
      this.result$ = this.kataService.getTransformedValue(number);
    }
  }

  getErrorMessage(field: string): string | null {
    const control = this.kataForm.get(field);

    const errorMessages: { [key: string]: string } = {
      required: 'Ce champ est obligatoire',
      min: 'Le nombre doit être supérieur ou égal à 0',
      max: 'Le nombre doit être inférieur ou égal à 100',
    };

    if (control?.errors) {
      const firstKey = Object.keys(control.errors)[0];
      return errorMessages[firstKey] || null;
    }

    return null;
  }
}
