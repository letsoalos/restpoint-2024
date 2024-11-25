import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Branch, BurialSociety, Status } from '../../../shared/models/client';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    CommonModule,
    MatButton,
    FormsModule,
    MatIcon,
    MatDialogModule
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent implements OnInit {
  clientService = inject(ClientService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  burialSocieties: BurialSociety[] = [];
  clientStatuses: Status[] = [];
  branches: Branch[] = [];

  selectedBurialSocities: string[] = this.data.selectedBurialSocities;
  selectedclientStatuses: string[] = this.data.selectedclientStatuses;
  selectedBranches: string[] = this.data.selectedBranches;

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData() {
    this.loadBurialSocieties();
    this.loadClientStatuses();
    this.loadBranches();
  }

  loadBurialSocieties() {
    this.clientService.getBurialSocieties().subscribe({
      next: (burialSocieties) => this.burialSocieties = burialSocieties,
      error: (error) => console.error('Error loading burial societies:', error)
    });
  }

  loadBranches() {
    this.clientService.getBranchList().subscribe({
      next: (branches) => this.branches = branches,
      error: (error) => console.error('Error loding branches:', error)
    });
  }

  loadClientStatuses() {
    this.clientService.getStatuses().subscribe({
      next: (clientStatuses) => {
        this.clientStatuses = clientStatuses.filter(
          status => status.groupCode === 'CRGS'
        );
      },
      error: (error) => console.error('Error loading client status:', error)
    });
  }

  applyFilters() {
    this.dialogRef.close({
      selectedBurialSocities: this.selectedBurialSocities,
      selectedclientStatuses: this.selectedclientStatuses,
      selectedBranches: this.selectedBranches
    })
  }
}
