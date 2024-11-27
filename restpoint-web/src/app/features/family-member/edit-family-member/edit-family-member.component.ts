import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../core/services/client.service';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { FamilyMember, Gender, Relationship } from '../../../shared/models/client';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-family-member',
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
    MatNativeDateModule
  ],
  templateUrl: './edit-family-member.component.html',
  styleUrl: './edit-family-member.component.scss'
})
export class EditFamilyMemberComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<EditFamilyMemberComponent>);
  private fb = inject(FormBuilder);
  private familyMemberService = inject(FamilyMemberService);
  private clientService = inject(ClientService);

  form: FormGroup | any;
  genders: Gender | any;
  relationships: Relationship | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [''],
      clientId: [''],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]],
      genderId: ['', [Validators.required]],
      phoneNumber: [''],
      email: [''],
      relationshipId: ['', [Validators.required]],
      age: [''],
      modifiedDate: new Date().toISOString(),
      isBeneficiary: [false],
      createdByUserId: [''],
      client: null,
      gender: null,
      relationship: null,
      status: null
    });

    // Patch form values with passed data
    if (this.data.familyMember) {
      this.form.patchValue(this.data.familyMember);
    } else {
      console.error('No family member data available');
    }
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
      const updatedData = {
        ...this.form.value,
        clientId: this.data.clientId
      };

      console.log('Payload to send:', updatedData);

      const familyMemberId = updatedData.id;
      console.log('Updating family member with ID:', familyMemberId);

      this.familyMemberService.updateFamilyMember(familyMemberId, updatedData).subscribe({
        next: () => {
          console.log('Family member updated successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error saving family member:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
