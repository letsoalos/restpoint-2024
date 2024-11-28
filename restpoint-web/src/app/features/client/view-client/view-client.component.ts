import {
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Client,
  FamilyMember,
  PaymentHistory,
  Status
} from '../../../shared/models/client';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFamilyMemberComponent } from '../../family-member/add-family-member/add-family-member.component';
import { EditFamilyMemberComponent } from '../../family-member/edit-family-member/edit-family-member.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { DeleteFamilyMemberComponent } from '../../family-member/delete-family-member/delete-family-member.component';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatIcon,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit, AfterViewInit {
  private clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private familyMemberService = inject(FamilyMemberService);
  router = inject(Router);
  private snackBar = inject(MatSnackBar);

  familyMemberId!: number;

  @ViewChild('familyPaginator') familyPaginator!: MatPaginator;
  @ViewChild('familySort') familySort!: MatSort;
  @ViewChild('paymentPaginator') paymentPaginator!: MatPaginator;
  @ViewChild('paymentSort') paymentSort!: MatSort;

  client?: Client;
  maritalStatus: Status | any;
  familyMembers: FamilyMember[] = [];
  paymentHistories: PaymentHistory[] = [];

  displayedFamilyColumns: string[] = [
    'recordNumber',
    'firstName',
    'dateOfBirth',
    'age',
    'relationship',
    'action'
  ];
  displayedPaymentColumns: string[] = [
    'recordNumber',
    'paymentDate',
    'totalAmountPaid',
    'status',
    'action'
  ];

  // Data sources for the two tables
  familyDataSource = new MatTableDataSource<FamilyMember>();
  paymentDataSource = new MatTableDataSource<PaymentHistory>();

  ngOnInit(): void {
    this.loadClientData();
  }

  ngAfterViewInit(): void {
    this.familyDataSource.paginator = this.familyPaginator;
    this.paymentDataSource.paginator = this.paymentPaginator;
  }

  private loadClientData(): void {
    this.loadClient();
  }

  loadClient() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.clientService.getClient(+id).subscribe({
      next: client => {
        this.client = client;
        this.loadFamilyMembers(client.id);
        this.loadPaymentHistories(client.id);
      },
      error: error => console.log(error)
    });
  }

  loadFamilyMembers(clientId: number): void {
    this.clientService.getFamilyMembersByClientId(clientId).subscribe({
      next: (res) => {
        this.familyDataSource.data = res.data;
        this.familyDataSource.sort = this.familySort;
      },
      error: (error) => console.log(error),
    });
  }

  loadPaymentHistories(clientId: number): void {
    this.clientService.getPaymentHistoriesByClientId(clientId).subscribe({
      next: res => {
        this.paymentDataSource.data = res.data;
        this.paymentDataSource.sort = this.paymentSort;
      },
      error: error => console.log(error),
    });
  }

  // Method to handle the route change or open dialog
  openAddFamilyMemberDialog(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!clientId) {
      console.error('Client ID is missing!');
      return;
    }

    this.dialog.open(AddFamilyMemberComponent, {
      data: { clientId: +clientId },
      width: '80%',
      height: '70%',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadFamilyMembers(+clientId);
        this.snackBar.open('Family member added successfully!', '', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      } else {
        this.snackBar.open('Failed to add family member.', '', {
          duration: 3000,
          panelClass: ['snack-error']
        });
      }
    });
  }

  openUpdateFamilyMemberDialog(familyMemberId: number, familyMember: any): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!clientId) {
      console.error('Client ID is missing!');
      return;
    }

    this.dialog.open(EditFamilyMemberComponent, {
      data: {
        clientId: +clientId,
        familyMember
      },
      width: '80%',
      height: '70%',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadFamilyMembers(+clientId); // Reload data
        this.snackBar.open('Family member updated successfully!', '', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      }
    });
  }

  onDeleteFamilyMember(familyMember: any): void {
    if (familyMember?.id) {
      this.openDeleteFamilyMemberDialog(familyMember.id, familyMember);
    } else {
      console.error('Family member ID is not available');
    }
  }

  openDeleteFamilyMemberDialog(familyMemberId: number, familyMemberData: any): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!clientId) {
      console.error('Client ID is missing!');
      return;
    }

    const dialogRef = this.dialog.open(DeleteFamilyMemberComponent, {
      width: '400px',
      disableClose: true,
      data: { familyMemberId, familyMemberData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If confirmed, delete the family member, passing both familyMemberId and clientId
        this.deleteFamilyMember(familyMemberId, +clientId);
        this.loadFamilyMembers(+clientId);
        this.snackBar.open('Family member deleted successfully!', '', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      } else {
        console.log('Family member deletion was cancelled');
      }
    });
  }

  deleteFamilyMember(familyMemberId: number, clientId: number): void {
    this.familyMemberService.deleteFamilyMember(familyMemberId, clientId).subscribe(
      response => {
        console.log('Family member deleted successfully:', response);
        // Optionally, handle UI updates after deletion
      },
      error => {
        console.error('Error deleting family member:', error);
      }
    );
  }
}
