import { Component, OnInit, ChangeDetectionStrategy, model, inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem,  CdkMenuTrigger} from '@angular/cdk/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { MatGridListModule} from '@angular/material/grid-list';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { IonicModule, Platform} from  '@ionic/angular';
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule} from '@angular/material/icon';
import { DatePipe} from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiService } from '../services/api.service';
import { QRCodeModule } from 'angularx-qrcode';
import { IonInput, ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';


export interface Section {
  name: string;
  updated: Date;
}

/**
 * @title 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone : true,
  providers: [provideNativeDateAdapter()],
  imports: [MatGridListModule, MatCardModule, MatDatepickerModule, MatButtonModule, 
  IonicModule, CdkMenu, CdkMenuItem, CdkMenuTrigger,  MatDividerModule, 
  MatIconModule, MatListModule,  DatePipe, CommonModule, QRCodeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  isTeacherCheck: string = "";
  qrValue: string = "";
  isClassCreated: boolean = false;

  name: string = '';
  username: string = '';
  email: string = '';

  test: boolean = false;
  posts: any[] = [];

  iniAsistance: boolean = false;
  enteredClass: boolean = false;
  inputModel = '';
  code: any;

  @ViewChild('ionInputEl', { static: false }) ionInputEl!: IonInput;

  user: any;
  selected = model<Date | null>(null);
  destroyed = new Subject<void>();
  currentScreenSize: string = ''; 
  folders: Section[] = [
    {
      name: 'Certificados',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Semestres',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Asignaturas',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Horario',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Evaluaciones pendientes',
      updated: new Date('1/18/16'),
    },
  ];
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

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private apiService: ApiService,
    private platform: Platform,
    private modalController: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    const email = navigation?.extras.state?.['user'];

    if (state) {
      this.name = state['name'] || ''           // Nombre completo
      this.username = state['username'] || '';  // Nombre de usuario
      this.email = state['email'] || '';        // Email
    }

    //this.user = (email && email.indexOf('@') !== -1) ? email.substring(0, email.indexOf('@')) : email;

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
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit(): void {
    this.isTeacherCheck = this.authService.isTeacherCheck();

    this.apiService.getPosts().subscribe((data: any) => {
      this.posts = data;
    });

    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  editPost(postId: number) {
    console.log(`Edit post with id: ${postId}`);
  }

  logOut() {
    this.authService.logOutLs();
    this.test = this.authService.isLoggedIn();

    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
  }

  toHashGet(num: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const base = chars.length;

    if (num < 0) {
        throw new Error('El número debe ser un entero positivo.');
    }

    const scramble = (n: number): number => {
        return (n * 31 + 17) % 987654321;
    };

    num = scramble(num);

    let hash = '';
    while (num > 0) {
        const remainder = num % base;
        hash = chars[remainder] + hash;
        num = Math.floor(num / base);
    }

    while (hash.length < 5) {
        hash = chars[0] + hash;
    }

    return hash.slice(-5);
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateClass() {
    const num = this.getRandomNumber(10000, 99999);
    this.qrValue = this.toHashGet(num);
    this.isClassCreated = true;
  }

  iniFnAsistance() {
    this.iniAsistance = true;
  }

  onInput(ev: any): void {
    const value = ev.detail.value;
    const filteredValue = value.replace(/[^a-zA-Z]+/g, '');

    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  async openCamera() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.ionInputEl.value = data?.barcode?.displayValue;
    }

  }

  enterClass() {
    if (JSON.stringify(this.ionInputEl.value).length - 2 == 5) {
      this.enteredClass = true;
    }
  }
}
