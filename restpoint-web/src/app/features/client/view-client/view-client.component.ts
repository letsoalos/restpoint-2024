import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Client, FamilyMember, PaymentHistory, Status } from '../../../shared/models/client';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule
  ],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit, AfterViewInit {
  private clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);

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
    'lastName',
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
    this.loadMaritalStatus();
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

  loadMaritalStatus() {
    this.clientService.getMaritalStatus().subscribe({
      next: maritalStatus => this.maritalStatus = maritalStatus,
      error: error => console.log('Error fetching marital status:', error)
    });
  }
}
