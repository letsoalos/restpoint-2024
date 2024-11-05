import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../shared/models/client';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditClientComponent } from './edit-client/edit-client.component';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadge } from '@angular/material/badge';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    MatDialogModule,
    MatFormFieldModule,
    RouterLink,
    MatMenuModule,
    MatDividerModule,
    MatBadge,
    MatButton
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  client: Client[] = [];
  selectedBurialSocieties: string[] = [];
  selectedclientStatues: string[] = [];
  searchInput: string = '';

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'streetName',
    'suburb',
    'phoneNumber',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  getStatusIconColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Pending':
        return 'status-pending';
      case 'Inactive':
        return 'status-inactive';
      default:
        return 'status-default';
    }
  }

  applyFilter(event?: Event): void {
    const filterValue = (event?.target as HTMLInputElement)?.value || this.searchInput;

    this.searchInput = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: any) {
    this.dialog.open(EditClientComponent, {
      data,
      width: '130%',
      height: '80%',
      disableClose: true
    });
  }

  openFiltersDialog() {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      width: '165%',
      height: '80%',
      disableClose: true,
      data: {
        selectedBurialSocieties: this.selectedBurialSocieties,
        selectedclientStatues: this.selectedclientStatues
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.selectedBurialSocieties = result.selectedBurialSocities || [];
          this.selectedclientStatues = result.selectedclientStatuses || [];

          this.applyFilter();

          this.clientService.getClients(this.selectedBurialSocieties, this.selectedclientStatues).subscribe({
            next: (response) => {
              const allClients = response.data;

              this.dataSource.data = allClients.filter(client => {
                const hasBurialSocietyFilter = this.selectedBurialSocieties.length > 0;
                const hasStatusFilter = this.selectedclientStatues.length > 0;

                // Check if the client matches any selected burial society
                const matchesBurialSociety = client.burialSociety &&
                  this.selectedBurialSocieties.some(society =>
                    society.trim().toLowerCase() === client.burialSociety.trim().toLowerCase()
                  );

                // Check if the client matches any selected status
                const matchesClientStatus = client.status &&
                  this.selectedclientStatues.some(status =>
                    status.trim().toLowerCase() === client.status.trim().toLowerCase()
                  );

                // Apply the filtering logic based on which filters are selected
                if (hasBurialSocietyFilter && hasStatusFilter) {
                  return matchesBurialSociety && matchesClientStatus;
                }
                else if (hasBurialSocietyFilter) {
                  return matchesBurialSociety;
                }
                else if (hasStatusFilter) {
                  return matchesClientStatus;
                }
                else {
                  return true;
                }
              });
              this.applyFilter();
            },

            error: error => console.log('Error fetching clients:', error)
          });
        }
      }
    });
  }
}

