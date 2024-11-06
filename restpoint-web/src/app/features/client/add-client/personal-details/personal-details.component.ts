import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../../core/services/client.service';
import { DocumentType, Gender } from '../../../../shared/models/client';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);

  form: FormGroup | any;
  documentTypes: DocumentType[] = [];
  genderList: Gender | any;

  ngOnInit(): void {
    this.initializeForm();
    this.loadDocumentTypes();
    this.loadGenders();
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      documentType: [''],
      identityNumber: [''],
      passport: [''],
      gender: [''],
      phoneNumber: [''],
      email: [''],
      emergencyContactName: [''],
      emergencyContactNumber: [''],
      streetName: [''],
      suburb: [''],
      city: [''],
      postalCode: [''],
      burialSociety: [''],
      age: [''],
      consent: ['']
    });
  }

  loadDocumentTypes() {
    this.clientService.getDocumentTypes().subscribe({
      next: (documentTypes: any) => {
        this.documentTypes = Array.isArray(documentTypes)
          ? documentTypes.filter(dt => dt.groupCode === 'IDPT')
          : [];
      },
      error: error => console.log('Error fetching document types:', error)
    });
  }

  loadGenders() {
    this.clientService.getGenderList().subscribe({
      next: genderList => this.genderList = genderList,
      error: error => console.log(error)
    });
  }

}
