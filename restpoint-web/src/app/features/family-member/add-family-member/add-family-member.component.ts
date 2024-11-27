import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    MatNativeDateModule
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

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      genderId: [''],
      phoneNumber: [''],
      email: [''],
      relationshipId: [''],
      age: [''],
      clientId: [this.data.clientId], 
      isBeneficiary: [false]
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
