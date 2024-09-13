import { Component, OnInit, ChangeDetectionStrategy, model } from '@angular/core';
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
  IonicModule, CdkMenu, CdkMenuItem, CdkMenuTrigger,  MatDividerModule, MatIconModule, MatListModule,  DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  user: any;
  selected = model<Date | null>(null);
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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const email = navigation?.extras.state?.['user'];

    this.user = (email && email.indexOf('@') !== -1) ? email.substring(0, email.indexOf('@')) : email;
  }
}
