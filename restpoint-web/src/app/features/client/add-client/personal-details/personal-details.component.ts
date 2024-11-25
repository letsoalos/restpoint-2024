import { Component, EventEmitter, inject, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { forkJoin, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

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
    MatNativeDateModule,
  ],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
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
  isLoading = false;

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
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      titleId: ['', Validators.required],
      maritalStatusId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      documentTypeId: ['', Validators.required],
      identityNumber: [''],
      passport: [''],
      genderId: ['', Validators.required],
      age: [''],
      ethnicityId: [''],
      status: undefined,
      burialSociety: undefined,
    });
  }

  private loadClientData(): void {
    this.isLoading = true;

    forkJoin({
      documentTypes: this.loadDocumentTypes(),
      maritalStatuses: this.clientService.getMaritalStatus(),
      genderList: this.clientService.getGenderList(),
      titleList: this.clientService.getTitles(),
      ethnicityGroups: this.clientService.getEthnicityGroups(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ documentTypes, maritalStatuses, genderList, titleList, ethnicityGroups }) => {
          this.documentTypes = documentTypes;
          this.maritalStatuses = maritalStatuses;
          this.genderList = genderList;
          this.titleList = titleList;
          this.ethnicityGroupList = ethnicityGroups;

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading client data:', error);
          this.isLoading = false;
        },
      });
  }

  private loadDocumentTypes() {
    return this.clientService.getDocumentTypes().pipe(
      map((documentTypes: any) =>
        Array.isArray(documentTypes)
          ? documentTypes.filter(dt => dt.groupCode === 'IDPT')
          : []
      ),
      catchError(error => {
        console.error('Error fetching document types:', error);
        return []; 
      })
    );
  }
}
