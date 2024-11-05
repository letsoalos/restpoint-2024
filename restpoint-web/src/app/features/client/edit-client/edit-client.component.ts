import { MatIcon } from '@angular/material/icon';
import { BurialSociety, DocumentType } from './../../../shared/models/client';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../core/services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  private dialog = inject(MatDialog);

  form: FormGroup | any;
  documenTypes: DocumentType[] = [];
  burialSocieties: BurialSociety[] = [];
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.isEditMode = !!this.data?.id;
    this.initializeForm();

    if (this.isEditMode) {
      this.form.patchValue(this.data);
      console.log('patche data:', this.data);
    }

    this.loadDocumentType();
    this.onDocumentTypeChange();
    this.loadBurialSociety();
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

  loadBurialSociety() {
    this.clientService.getBurialSocieties().subscribe({
      next: burialSociety => {
        this.burialSocieties = burialSociety;

        if (this.isEditMode && this.data?.burialSociety) {
          const selectedBurialSociety = this.burialSocieties.find(bs => bs.name === this.data.burialSociety);

          if (selectedBurialSociety) {
            this.form.patchValue({ burialSociety: selectedBurialSociety.id });
          }
        }
      },
      error: error => console.log(error)
    })
  }

  loadDocumentType() {
    this.clientService.getDocumentTypes().subscribe({
      next: (documenTypes: any) => {
        this.documenTypes = Array.isArray(documenTypes)
          ? documenTypes.filter(dt => dt.groupCode === 'IDPT')
          : [];

        if (this.isEditMode && this.data?.documentType) {
          const selectedDocType = this.documenTypes.find(dt => dt.name === this.data.documentType);
          if (selectedDocType) {
            this.form.patchValue({ documentType: selectedDocType.id });
          }
        }
      },
      error: error => console.log(error)
    });
  }

  onDocumentTypeChange() {
    this.form.get('documentType')?.valueChanges.subscribe((selectedType: string) => {
      if (selectedType === 'ID Copy') {
        this.form.get('passport')?.reset();
      } else if (selectedType === 'Passport') {
        this.form.get('identityNumber')?.reset();
      }
    });
  }

  onFormSubmit() {
    if (this.isEditMode) {
      this.clientService.updateClient(this.data.id, this.form.value)
        .subscribe({
          next: (val: any) => {
            alert('Client updated');
            this.dialog.closeAll();
          },
          error: error => console.log(error)
        });
    }
  }
}
