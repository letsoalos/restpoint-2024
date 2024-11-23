import { BurialSociety } from './../../../../shared/models/client';
import { Component, EventEmitter, inject, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../../core/services/client.service';
import { Title, DocumentType, EthnicityGroup, Gender, Status } from '../../../../shared/models/client';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  @Output() formData = new EventEmitter<any>();

  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  form!: FormGroup;
  documentTypes: DocumentType[] = [];
  genderList: Gender | any;
  titleList: Title | any;
  ethnicityGroupList: EthnicityGroup | any;
  maritalStatuses: Status | any;

  ngOnInit(): void {
    this.initializeForm();
    this.loadClientData();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.formData.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      titleId: [''],
      maritalStatusId: [''],
      dateOfBirth: [''],
      documentTypeId: [''],
      identityNumber: [''],
      passport: [''],
      genderId: [''],
      age: [''],
      ethnicityId: [''],
      status: undefined,
      burialSociety: undefined
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

  private loadMaritalStatus(): void {
    this.clientService.getMaritalStatus().pipe(takeUntil(this.destroy$)).subscribe({
      next: (maritalStatuses) => (this.maritalStatuses = maritalStatuses),
      error: (error) => console.error('Error fetching marital status:', error)
    });
  }

  private loadGenders(): void {
    this.clientService.getGenderList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (genderList) => (this.genderList = genderList),
      error: (error) => console.error('Error fetching gender list:', error)
    });
  }

  private loadTitles(): void {
    this.clientService.getTitles().pipe(takeUntil(this.destroy$)).subscribe({
      next: (titleList) => (this.titleList = titleList),
      error: (error) => console.error('Error fetching titles:', error)
    });
  }

  private loadEthnicityGroups(): void {
    this.clientService.getEthnicityGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (ethnicityGroupList) => (this.ethnicityGroupList = ethnicityGroupList),
      error: (error) => console.error('Error fetching ethnicity groups:', error)
    });
  }
}
