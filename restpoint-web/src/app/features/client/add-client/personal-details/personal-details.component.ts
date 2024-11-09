import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../../core/services/client.service';
import { ClientTitle, DocumentType, EthnicityGroup, Gender, Status } from '../../../../shared/models/client';
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
  titleList: ClientTitle | any;
  ethnicityGroupList: EthnicityGroup | any;
  maritalStatusList: Status[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.loadClientData();
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      title: [''],
      maritalStatus: [''],
      ethnicity: [''],
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

  private loadClientData(): void {
    this.loadDocumentTypes();
    this.loadMaritalStatus();
    this.loadGenders();
    this.loadTitles();
    this.loadEthnicityGroups();
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

  loadMaritalStatus() {
    this.clientService.getStatuses().subscribe({
      next: (maritalStatusList: any) => {
        this.maritalStatusList = Array.isArray(maritalStatusList)
          ? maritalStatusList.filter(m => m.groupCode == 'MARS')
          : [];
      },
      error: error => console.log('Error fetching marital status:', error)
    })
  }

  loadGenders() {
    this.clientService.getGenderList().subscribe({
      next: genderList => this.genderList = genderList,
      error: error => console.log(error)
    });
  }

  loadTitles() {
    this.clientService.getTitles().subscribe({
      next: titleList => this.titleList = titleList,
      error: error => console.log(error)
    });
  }

  loadEthnicityGroups() {
    this.clientService.getEthnicityGroups().subscribe({
      next: ethnicityGroupList => this.ethnicityGroupList = ethnicityGroupList,
      error: error => console.log(error)
    });
  }

}
