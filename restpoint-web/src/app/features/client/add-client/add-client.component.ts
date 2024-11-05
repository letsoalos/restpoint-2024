import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    MatStepperModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {

}
