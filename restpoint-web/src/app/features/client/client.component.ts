import { jsPDF } from 'jspdf';
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
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';

const logoBase64 = "./assets/images/logo.jpeg";

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
    MatDividerModule
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
    this.populateTable();
  }

  populateTable() {
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
      case 'In Progress':
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
      height: '85%',
      disableClose: true
    });
  }

  openFiltersDialog() {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      width: '130%',
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

  downloadClientProfile(id: number) {
    this.clientService.getClient(id).subscribe({
      next: (client) => {
        const doc = new jsPDF();
        const formattedDateOfBirth = client.dateOfBirth ? new Date(client.dateOfBirth).toISOString().split('T')[0] : 'N/A';

        // Add logo to the left
        doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30);

        // Add business address to the right
        doc.setFontSize(12);
        doc.setFont("Aptos", "normal");
        doc.setTextColor(0);
        const businessAddress = [
          "Demo Funerals",
          "1234 Main Street",
          "Polokwane",
          "2195",
          "Phone: +27 (15) 123-4567",
          "Email: contact@funeralpolicy.com"
        ];
        let addressYPosition = 15; // Initial y position for the address text
        businessAddress.forEach((line) => {
          doc.text(line, 140, addressYPosition); // x = 150 to align text on the right
          addressYPosition += 5; // Adjust line spacing as needed
        });

        // Adjusted horizontal line closer to address
        doc.line(10, 45, 200, 45);

        // Client Profile Title
        doc.setFontSize(18);
        doc.setFont("Aptos", "bold");
        doc.text("Client Profile", 20, 55);

        // Basic Information Section
        doc.setFontSize(16);
        doc.setFont("Aptos", "bold");
        doc.text("Basic Information", 20, 75);

        doc.setFontSize(12);
        doc.setFont("Aptos", "normal");
        doc.text(`Reference Number: ${client.referenceNumber}`, 20, 85);
        doc.text(`Full Name: ${client.firstName} ${client.lastName}`, 20, 95);
        doc.text(`Date of Birth: ${formattedDateOfBirth}`, 20, 105);
        doc.text(`Age: ${client.age}`, 20, 115);
        doc.text(`Gender: ${client.gender}`, 20, 125);
        doc.text(`Phone Number: ${client.phoneNumber}`, 20, 135);

        // Address Section
        doc.setFontSize(16);
        doc.setFont("Aptos", "bold");
        doc.text("Address", 20, 155);

        doc.setFontSize(12);
        doc.setFont("Aptos", "normal");
        doc.text(`Street: ${client.streetName}`, 20, 165);
        doc.text(`Suburb: ${client.suburb}`, 20, 175);
        doc.text(`City: ${client.city}`, 20, 185);
        doc.text(`City: ${client.postalCode}`, 20, 195);

        // Status Section
        doc.setFontSize(16);
        doc.setFont("Aptos", "bold");
        doc.text("Status", 20, 215);

        doc.setFontSize(12);
        doc.setFont("Aptos", "normal");
        doc.text(`Status: ${client.status}`, 20, 225);

        // Footer with a line above it
        doc.line(10, 280, 200, 280); // Footer separator line
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Funeral Policy Management System", 20, 290);
        doc.text(`Page 1 of 1`, 180, 290);

        // Save the PDF
        doc.save(`${client.firstName}_${client.lastName}_profile.pdf`);
      },
      error: (error) => console.log('Error fetching client profile for download', error)
    });
  }

}

