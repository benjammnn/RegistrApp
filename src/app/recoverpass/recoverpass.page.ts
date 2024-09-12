import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage {

  user: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
  }
}
