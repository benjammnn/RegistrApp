import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {IonicModule} from  '@ionic/angular';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone : true,
  imports: [MatGridListModule, IonicModule],
})
export class HomePage {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  user: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const email = navigation?.extras.state?.['user'];

    this.user = (email && email.indexOf('@') !== -1) ? email.substring(0, email.indexOf('@')) : email;
  }
}
