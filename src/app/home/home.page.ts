import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  user: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const email = navigation?.extras.state?.['user'];

    this.user = (email && email.indexOf('@') !== -1) ? email.substring(0, email.indexOf('@')) : email;
  }
}
