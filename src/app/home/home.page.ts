import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * @title Input with a clear button
 */

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
})
export class HomePage {

  value = 'Clear me'

  constructor() {}

}
