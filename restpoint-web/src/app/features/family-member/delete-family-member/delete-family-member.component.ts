import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-family-member',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './delete-family-member.component.html',
  styleUrl: './delete-family-member.component.scss'
})
export class DeleteFamilyMemberComponent {
  familyMemberId: number;
  firstName: string;
  lastName: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteFamilyMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyMemberId: number; familyMemberData: any }
  ) {
    this.familyMemberId = data.familyMemberId;
    const { firstName, lastName } = data.familyMemberData;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close();
  }

}
