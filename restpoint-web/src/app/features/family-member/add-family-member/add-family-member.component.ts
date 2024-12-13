import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { ClientService } from '../../../core/services/client.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Gender, Relationship } from '../../../shared/models/client';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextInputComponent } from "../../../shared/components/text-input/text-input.component";

@Component({
  selector: 'app-add-family-member',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    MatSelectModule,
    MatCheckbox,
    MatDatepickerModule,
    MatNativeDateModule,
    TextInputComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-ZA' }
  ],
  templateUrl: './add-family-member.component.html',
  styleUrls: ['./add-family-member.component.scss']
})
export class AddFamilyMemberComponent implements OnInit {
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddFamilyMemberComponent>);
  private fb = inject(FormBuilder);
  private familyMemberService = inject(FamilyMemberService);
  private clientService = inject(ClientService);


  form: FormGroup | any;
  genders: Gender | any;
  relationships: Relationship | any;
  validationErrors?: string[];

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: 0,
      clientId: [this.data.clientId],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]],
      genderId: ['', [Validators.required]],
      phoneNumber: [''],
      email: ['', Validators.email],
      relationshipId: ['', [Validators.required]],
      age: [''],
      modifiedDate: null,
      createdDate: new Date().toISOString(),
      isBeneficiary: [false],
      createdByUserId: 1,
      client: null,
      gender: null,
      relationship: null,
      status: null,
      statusId: 10
    });
  }

  loadData(): void {
    forkJoin({
      genders: this.clientService.getGenderList(),
      relationships: this.familyMemberService.getRelationships()
    }).subscribe({
      next: ({ genders, relationships }) => {
        this.genders = genders;
        this.relationships = relationships
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      this.familyMemberService.saveFamilyMember(this.form.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: error => this.validationErrors = error
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
