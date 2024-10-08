import { Component, OnInit, ChangeDetectionStrategy, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkMenu, CdkMenuItem,  CdkMenuTrigger} from '@angular/cdk/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {IonicModule} from  '@ionic/angular';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  IonicModule, CdkMenu, CdkMenuItem, CdkMenuTrigger,  MatDividerModule, MatIconModule, MatListModule,  DatePipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const email = navigation?.extras.state?.['user'];

    this.user = (email && email.indexOf('@') !== -1) ? email.substring(0, email.indexOf('@')) : email;

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

  logOut() {
    this.router.navigate(['/login']);
  }

}
