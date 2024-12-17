import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, signal, OnDestroy, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnDestroy, OnInit {

  loginForm: FormGroup;

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);

  isLoggedCheck: boolean = false;
  isTeacherCheck: string = "";

  username: string = '';
  pass: string = '';
  errorMessage = signal('');
  destroyed = new Subject<void>();
  currentScreenSize: string = ''; 
  currentScreenClass: string = '';

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  fontSizeMap = new Map([
    ['XSmall', '12px'],
    ['Small', '14px'],
    ['Medium', '16px'],
    ['Large', '18px'],
    ['XLarge', '20px'],
  ]);

  getFontSize(): string {
    return this.fontSizeMap.get(this.currentScreenSize) || '16px';
  }

  private getScreenClass(query: string): string {
    switch (query) {
      case Breakpoints.XSmall:
        return 'card-xsmall';
      case Breakpoints.Small:
        return 'card-small';
      case Breakpoints.Medium:
        return 'card-medium';
      case Breakpoints.Large:
        return 'card-large';
      case Breakpoints.XLarge:
        return 'card-xlarge';
      default:
        return '';
    }
  }

  constructor(private authService:AuthService, private router: Router, private fb: FormBuilder) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenClass = this.getScreenClass(query);
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });  
  }

  login() {
    if (this.email.valid && this.password.valid) {
      this.authService.login(this.username, this.pass).pipe(takeUntil(this.destroyed)).subscribe(
        (response) => {
          console.log('Usuario autenticado:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));

          let name = response.name;
          let user = response.username;

          this.router.navigate(['/home'], { state: { email: this.username, name: name, username: user } });
        },
        (error) => {
          alert('Nombre de usuario o contraseña incorrectos');
          console.error('Error de login:', error);
        }
      );
    } else {
      alert('Por favor, ingrese correctamente todos los campos.');
    }
  }

  navigateToRecoverpass() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.email.value }
    };
    
    this.router.navigate(['/recoverpass'], navigationExtras);
  }

  navigateToRegister() {
     this.router.navigate(['/register']);
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.isLoggedCheck = this.authService.isLoggedIn();
    this.isTeacherCheck = this.authService.isTeacherCheck();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
    }
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
