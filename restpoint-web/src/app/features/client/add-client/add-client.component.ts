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
  consentData: any = {};
  personalDetailsData: any = {};
  addressData: any = {};
  supportingDocsData: any = [];

  onConsentFormChange(data: any): void {
    this.consentData = data;
  }

  onPersonalDetailsChange(data: any): void {
    this.personalDetailsData = data;
  }

  onAddressChange(data: any): void {
    this.addressData = data;
  }

  onSupportingDocsChange(data: any): void {
    this.supportingDocsData = data;
  }

  submitForm(): void {
    const payload = {
      consent: this.consentData,
      personalDetails: this.personalDetailsData,
      address: this.addressData,
      supportingDocuments: this.supportingDocsData,
    };
    console.log('Form Payload:', payload);
    // Perform the submission, e.g., call an API
  }
}
