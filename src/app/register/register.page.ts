import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, signal, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
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

  constructor(private fb: FormBuilder, private apiService: ApiService, private navCtrl: NavController, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  updateErrorMessage() {
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  createPost() {
    if (this.registerForm.valid) {
      const newPost = this.registerForm.value;

      this.apiService.createPost(newPost).subscribe((response) => {
        console.log('Post creado:', response);

        const navigationExtras: NavigationExtras = {
          state: {
            username: newPost.username,
            email: newPost.email,
            password: newPost.password
          }
        };
        this.router.navigate(['/home'], navigationExtras);
      });
    } else {
      console.log('Registro inválido');
    }
  }
}