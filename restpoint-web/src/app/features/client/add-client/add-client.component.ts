import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { ConsentFormComponent } from "./consent-form/consent-form.component";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";
import { AddressComponent } from "./address/address.component";
import { SupportingDocsComponent } from "./supporting-docs/supporting-docs.component";

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButton,
    RouterLink,
    ConsentFormComponent,
    PersonalDetailsComponent,
    AddressComponent,
    SupportingDocsComponent
],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {

}
