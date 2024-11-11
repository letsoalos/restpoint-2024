import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Client, FamilyMember, PaymentHistory, Status } from '../../../shared/models/client';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.scss'
})
export class ViewClientComponent implements OnInit {
  private clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);

  client?: Client;
  maritalStatus: Status | any;
  familyMembers: FamilyMember[] = [];
  paymentHistories: PaymentHistory[] = [];

  ngOnInit(): void {
    this.loadClientData();
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
    })
  }

  loadFamilyMembers(clientId: number): void {
    this.clientService.getFamilyMembersByClientId(clientId).subscribe({
      next: response => this.familyMembers = response.data,
      error: error => console.log(error)
    });
  }

  loadPaymentHistories(clientId: number): void {
    this.clientService.getPaymentHistoriesByClientId(clientId).subscribe({
      next: response => this.paymentHistories = response.data,
      error: error => console.log(error)
    })
  }

  loadMaritalStatus() {
    this.clientService.getMaritalStatus().subscribe({
      next: maritalStatus => this.maritalStatus = maritalStatus,
      error: error => console.log('Error fetching marital status:', error)
    })
  }

}
