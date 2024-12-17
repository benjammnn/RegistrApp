import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CanComponentDeactivate } from './candeactivate.guard';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonicModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterPage implements CanComponentDeactivate{
  
  registerForm: FormGroup;
  isFormDirty = false;

  onInputChange() {
    this.isFormDirty = true;
  }

  canDeactivate(): boolean {
    if (this.isFormDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private navCtrl: NavController, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  createPost() {
    if (this.registerForm.valid) {
      const newPost = this.registerForm.value;
      localStorage.setItem('userInstance', JSON.stringify(newPost));
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
      this.apiService.createPost(newPost).subscribe((response) => {
        console.log('Post creado:', response);

        const navigationExtras: NavigationExtras = {
          state: {
            username: newPost.username,
            email: newPost.email,
            password: newPost.password
          }
        };
        this.isFormDirty = false;
        this.router.navigate(['/login'], navigationExtras);
      });
    } else {
      console.log('Registro inválido');
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted', this.registerForm.value);
    }
  }  

}

export class RouteDeactivate implements CanComponentDeactivate {
  canDeactivate!: () => Observable<boolean> | Promise<boolean> | boolean;
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private navCtrl: NavController, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  formTest() {
    console.log(Object.values(this.registerForm.value));
    let log = Object.values(this.registerForm.value);

    if (log[0] == "" && log[1] == "" && log[2] == "") {
      return true;
    } else {
      return false;
    }
  }
}