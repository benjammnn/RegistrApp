import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
  standalone: true,
  imports: [ IonicModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule ],
})
export class RecoverpassPage {

  user: any;

  readonly email = new FormControl('', [Validators.required, Validators.email]);

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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];

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
  }

  navigateToLogin() {
    if (this.email.valid) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.email.value }
      };
      
      this.router.navigate(['/login'], navigationExtras);
    } else {
      alert('Por favor, ingrese un correo para enviar la solicitud de cambio de contraseña.');
    }
  }

  navigateBack() {
    this.router.navigate(['../']);
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

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
