import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, signal, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonicModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterPage {
  registerForm: FormGroup;
  usernameControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(private fb: FormBuilder) {
    this.usernameControl = new FormControl('', [Validators.required]);
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.registerForm = this.fb.group({
      username: this.usernameControl,
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  updateErrorMessage() {
    // Lógica para actualizar el mensaje de error si es necesario
  }

  registrar() {
    if (this.registerForm.valid) {
      // Realiza la lógica de registro aquí
      console.log(this.registerForm.value);
    }
  }

}