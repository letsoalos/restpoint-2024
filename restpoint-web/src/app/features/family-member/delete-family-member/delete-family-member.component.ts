import { Component, Inject, inject } from '@angular/core';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-family-member',
  standalone: true,
  imports: [],
  templateUrl: './delete-family-member.component.html',
  styleUrl: './delete-family-member.component.scss'
})
export class DeleteFamilyMemberComponent {
  familyMemberId: number;
  familyMemberData: any;

  constructor(
    private dialogRef: MatDialogRef<DeleteFamilyMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyMemberId: number, familyMemberData: any }
  ) {
    // Extract the data passed to the dialog
    this.familyMemberId = data.familyMemberId;
    this.familyMemberData = data.familyMemberData;

    // Log to ensure the data is correctly passed
    console.log('Dialog opened with familyMemberId:', this.familyMemberId, 'familyMemberData:', this.familyMemberData);
  }

  confirmDelete(): void {
    this.dialogRef.close(true); // Close the dialog and send confirmation
  }

  cancelDelete(): void {
    this.dialogRef.close();
  }

}
