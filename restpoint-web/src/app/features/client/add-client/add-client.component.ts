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

    console.log('Form Payload:', payload);

    // Map the form data to the ClientDto format
    // const clientDto: Client = {
    //   id: 0,
    //   titleId: payload.personalDetails.titleId,
    //   firstName: payload.personalDetails.firstName,
    //   lastName: payload.personalDetails.lastName,
    //   dateOfBirth: payload.personalDetails.dateOfBirth,
    //   documentTypeId: payload.personalDetails.documentTypeId,
    //   maritalStatusId: payload.personalDetails.maritalStatusId,
    //   identityNumber: payload.personalDetails.identityNumber || '',
    //   ethnicityId: payload.personalDetails.ethnicityId,
    //   age: this.calculateAge(payload.personalDetails.dateOfBirth),
    //   passport: payload.personalDetails.passport || '',
    //   genderId: payload.personalDetails.genderId,
    //   phoneNumber: payload.personalDetails.phoneNumber || '0712345678',
    //   email: payload.personalDetails.email || 'test@gmail.com',
    //   emergencyContactName: payload.personalDetails.emergencyContactName || 'Sello',
    //   emergencyContactNumber: payload.personalDetails.emergencyContactNumber || '0712345678',
    //   streetName: payload.address.streetName,
    //   suburb: payload.address.suburb,
    //   city: payload.address.city,
    //   postalCode: payload.address.postalCode,
    //   statusId: payload.personalDetails.statusId || 10,
    //   burialSocietyId: payload.personalDetails.burialSocietyId || 1,
    //   referenceNumber: '20241121REF', // You can replace this with the actual reference number generation logic
    //   consent: payload.personalDetails.consent || false,
    //   createdDate: new Date(),
    //   createdByUserId: 1,
    //   modifiedDate: undefined,
    //   modifiedByUserId: undefined,
    //   status: payload.personalDetails.status || 'Active',  // Provide a default value
    //   burialSociety: payload.supportingDocuments.burialSociety || 'N/A',
    // };

    // const addressDto = {
    //   streetName: clientDto.streetName,
    //   suburb: clientDto.suburb,
    //   city: clientDto.city,
    //   postalCode: clientDto.postalCode,
    // };

    // const payloadToSend = {
    //   client: {
    //     ...clientDto,
    //     address: addressDto, // Add AddressDto object here
    //   },
    // };

    // console.log('Payload to Send:', payloadToSend);

    // // Save the client using the ClientService
    // this.clientService.saveClient(payloadToSend).subscribe({
    //   next: (response) => {
    //     console.log('Client saved successfully:', response);
    //   },
    //   error: (error) => {
    //     console.error('Error saving client:', error);
    //   }
    // });
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
