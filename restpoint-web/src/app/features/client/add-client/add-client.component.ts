import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { ConsentFormComponent } from "./consent-form/consent-form.component";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";
import { AddressComponent } from "./address/address.component";
import { SupportingDocsComponent } from "./supporting-docs/supporting-docs.component";
import { Client } from '../../../shared/models/client';
import { ClientService } from '../../../core/services/client.service';

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
  private clientService = inject(ClientService);

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

    // Map the form data to the ClientDto format
    const clientDto: Client = {
      id: 0,
      firstName: payload.personalDetails.firstName,
      lastName: payload.personalDetails.lastName,
      titleId: payload.personalDetails.titleId,
      title: '',
      dateOfBirth: payload.personalDetails.dateOfBirth,
      documentTypeId: payload.personalDetails.documentTypeId,
      documentType: '',
      maritalStatusId: payload.personalDetails.maritalStatusId,
      maritalStatus: '',
      identityNumber: payload.personalDetails.identityNumber || null,
      ethnicityId: payload.personalDetails.ethnicityId,
      ethnicity: '',
      age: this.calculateAge(payload.personalDetails.dateOfBirth),
      passport: payload.personalDetails.passport || null,
      genderId: payload.personalDetails.genderId.id,
      gender: '',
      phoneNumber: payload.address.phoneNumber,
      altNumber: payload.address.altNumber || '',
      email: payload.address.email || 'test@gmail.com',
      emergencyContactName: 'Sello',
      emergencyContactNumber: '0712345678',
      streetName: payload.address.streetName,
      suburb: payload.address.suburb,
      city: payload.address.city,
      postalCode: payload.address.postalCode,
      statusId: 9,
      burialSocietyId: 1,
      referenceNumber: '',
      branch: '',
      branchId: 1,
      consent: payload.consent.consent || false,
      createdDate: new Date().toISOString(),
      status: '',
      burialSociety: '',
    };

    const payloadToSend = {
      ...clientDto
    };

    console.log('Final Payload to Send:', JSON.stringify(payloadToSend, null, 2));

    // Save the client using the ClientService
    this.clientService.saveClient(payloadToSend).subscribe({
      next: (response) => {
        console.log('Client saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving client:', error);
      }
    });
  }

  // Method to calculate age based on date of birth
  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
