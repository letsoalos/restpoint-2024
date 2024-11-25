import { jsPDF } from 'jspdf';
import * as Papa from 'papaparse';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { Client, FamilyMember, PaymentHistory } from '../../shared/models/client';
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
import { Observable, map, catchError, of, forkJoin, switchMap, Subject, takeUntil } from 'rxjs';

const logoBase64 = "./assets/images/logo.jpg";

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
    RouterLink,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  client: Client[] = [];
  familyMembers: FamilyMember[] = [];
  paymentHistory: PaymentHistory[] = [];

  selectedBurialSocieties: string[] = [];
  selectedclientStatues: string[] = [];
  selectedBranches: string[] = [];
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

  ngOnInit(): void {
    this.populateTable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  populateTable() {
    this.clientService.getClients().pipe(
      map(res => res.data),
      catchError(error => {
        console.error(error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource<Client>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadFamilyMembers(clientId: number): Observable<FamilyMember[]> {
    return this.clientService.getFamilyMembersByClientId(clientId).pipe(
      map((res) => {
        if (res && Array.isArray(res.data)) {
          return res.data;
        } else {
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching family members:', error);
        return of([]);
      })
    );
  }

  loadPaymentHistories(clientId: number): Observable<PaymentHistory[]> {
    return this.clientService.getPaymentHistoriesByClientId(clientId).pipe(
      map((res) => {
        if (Array.isArray(res.data)) {
          return res.data; // Return the array if it's valid
        } else {
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching payment history:', error);
        return of([]);
      })
    );
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
        selectedclientStatues: this.selectedclientStatues,
        selectedBranches: this.selectedBranches
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.selectedBurialSocieties = result.selectedBurialSocities || [];
          this.selectedclientStatues = result.selectedclientStatuses || [];
          this.selectedBranches = result.selectedBranches || [];

          this.applyFilter();

          this.clientService.getClients(this.selectedBurialSocieties, this.selectedclientStatues, this.selectedBranches).subscribe({
            next: (response) => {
              const allClients = response.data;

              this.dataSource.data = allClients.filter(client => {
                const hasBurialSocietyFilter = this.selectedBurialSocieties.length > 0;
                const hasStatusFilter = this.selectedclientStatues.length > 0;
                const hastBranchesFilter = this.selectedBranches.length > 0;

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

                const matchesBranches = client.branch &&
                  this.selectedBranches.some(branch =>
                    branch.trim().toLowerCase() === client.branch.trim().toLowerCase()
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
                else if (hastBranchesFilter) {
                  return matchesBranches;
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
        this.loadFamilyMembers(id).subscribe({
          next: (familyMembers: any[]) => {
            this.loadPaymentHistories(id).subscribe({
              next: (paymentHistory) => {
                const doc = new jsPDF();
                const formattedDateOfBirth = client.dateOfBirth
                  ? new Date(client.dateOfBirth).toISOString().split('T')[0]
                  : 'N/A';

                const systemName = "Rest Point";
                const today = new Date();
                const printedDate = today.toISOString().split('T')[0];
                const footerLineY = doc.internal.pageSize.height - 20;
                const usablePageHeight = doc.internal.pageSize.height - 40;

                // Footer function
                const addFooter = () => {
                  const totalPages = doc.getNumberOfPages();
                  for (let page = 1; page <= totalPages; page++) {
                    doc.setPage(page);

                    // Draw line above footer
                    doc.line(10, footerLineY - 5, 200, footerLineY - 5);

                    // Add printed date and system name
                    doc.setFontSize(10);
                    doc.setFont("Helvetica", "normal");
                    doc.text(
                      `Printed Date: ${printedDate} | ${systemName}`,
                      10,
                      footerLineY
                    );
                  }
                };

                let yPosition = 70;

                // Header: Logo and Business Address
                doc.addImage(logoBase64, "PNG", 10, 10, 30, 30);
                const businessAddress = [
                  "Demo Funerals",
                  "1234 Main Street",
                  "Polokwane",
                  "2195",
                  "Phone: +27 (15) 123-4567",
                  "Email: contact@funeralpolicy.com",
                ];
                doc.setFontSize(12);
                doc.setFont("Helvetica", "normal");
                businessAddress.forEach((line, index) => {
                  doc.text(line, 200, 15 + index * 5, { align: "right" });
                });

                // Divider Line
                doc.line(10, 45, 200, 45);

                // Title
                doc.setFontSize(18);
                doc.setFont("Helvetica", "bold");
                doc.text("Client Profile", 105, 55, { align: "center" });

                // Section: Basic Information
                yPosition = this.addSection(doc, "Basic Information", yPosition);
                const basicInfo = [
                  `Reference Number: ${client.referenceNumber}`,
                  `Full Name: ${client.firstName} ${client.lastName}`,
                  `Date of Birth: ${formattedDateOfBirth}`,
                  `Age: ${client.age}`,
                  `Gender: ${client.gender}`,
                  `Phone Number: ${client.phoneNumber}`,
                ];
                yPosition = this.addContent(doc, basicInfo, yPosition, usablePageHeight, () => {
                  doc.addPage();
                  yPosition = 20;
                });

                // Section: Address
                yPosition = this.addSection(doc, "Address", yPosition + 10);
                const addressInfo = [
                  `Street: ${client.streetName}`,
                  `Suburb: ${client.suburb}`,
                  `City: ${client.city}`,
                  `Postal Code: ${client.postalCode}`,
                ];
                yPosition = this.addContent(doc, addressInfo, yPosition, usablePageHeight, () => {
                  doc.addPage();
                  yPosition = 20;
                });

                // Section: Family Members
                yPosition = this.addSection(doc, "Family Members", yPosition + 10);
                familyMembers.forEach((member) => {
                  if (yPosition + 10 > usablePageHeight) {
                    doc.addPage();
                    yPosition = 20;
                  }
                  doc.setFontSize(12);
                  doc.setFont("Helvetica", "normal");
                  doc.text(
                    `${member.firstName} ${member.lastName} - ${member.relationship}`,
                    25,
                    yPosition
                  );
                  yPosition += 10;
                });

                // Section: Payment History
                yPosition = this.addSection(doc, "Payment History", yPosition + 10);
                paymentHistory.forEach((payment) => {
                  if (yPosition + 10 > usablePageHeight) {
                    doc.addPage();
                    yPosition = 20;
                  }

                  // Format the amount to include ZAR currency
                  const formattedAmount = `R ${payment.totalAmountPaid.toFixed(2)}`;

                  // Extract the date part from paymentDate
                  const formattedDate = new Date(payment.paymentDate).toISOString().split('T')[0];

                  // Set consistent font size and style
                  doc.setFontSize(12);
                  doc.setFont("Helvetica", "normal");

                  // Add payment details
                  doc.text(`Amount Paid: ${formattedAmount}`, 25, yPosition);
                  doc.text(`Date: ${formattedDate}`, 120, yPosition);

                  yPosition += 10; // Adjust vertical spacing
                });

                // Add footer to all pages
                addFooter();

                // Save the document
                //doc.save(`${client.firstName}_${client.lastName}_Profile.pdf`);
                doc.save(`${client.firstName}_${client.lastName}_${client.referenceNumber}_Profile.pdf`);
              },
              error: (error) =>
                console.error("Error loading payment history:", error),
            });
          },
          error: (error) =>
            console.error("Error loading family members:", error),
        });
      },
      error: (error) => console.error("Error loading client:", error),
    });
  }

  downloadClientProfileAsCSV(id: number): void {
    this.clientService.getClient(id).pipe(
      switchMap(client =>
        forkJoin({
          familyMembers: this.loadFamilyMembers(id),
          paymentHistory: this.loadPaymentHistories(id),
          client: of(client),
        })
      )
    ).subscribe({
      next: ({ client, familyMembers, paymentHistory }) => {
        const data = [];

        // Add Basic Info to CSV
        data.push({
          Section: 'Basic Information',
          'Reference Number': client.referenceNumber,
          'Full Name': `${client.firstName} ${client.lastName}`,
          'Date of Birth': client.dateOfBirth ? new Date(client.dateOfBirth).toISOString().split('T')[0] : 'N/A',
          Age: client.age,
          Gender: client.gender,
          'Phone Number': client.phoneNumber,
          Street: client.streetName || 'N/A',
          Suburb: client.suburb || 'N/A',
          City: client.city || 'N/A',
          'Postal Code': client.postalCode || 'N/A'
        });

        // Add Family Members to CSV
        familyMembers.forEach((member: any) => {
          data.push({
            Section: 'Family Member',
            'Reference Number': '',
            'Full Name': `${member.firstName} ${member.lastName}`,
            'Date of Birth': member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().split('T')[0] : 'N/A',
            Age: member.age || 'N/A',
            Gender: member.gender || 'N/A',
            'Phone Number': member.phoneNumber || 'N/A',
            Street: member.address?.street || 'N/A',
            Suburb: member.address?.suburb || 'N/A',
            City: member.address?.city || 'N/A',
            'Postal Code': member.address?.postalCode || 'N/A',
            'Family Member Relationship': member.relationship || 'N/A',
            'Payment Amount': '',
            'Payment Date': ''
          });
        });

        // Add Payment History to CSV
        const handleEmptyFields = (field: any) => {
          return field === '' ? 'N/A' : field;
        };

        paymentHistory.forEach((payment: any) => {
          data.push({
            Section: 'Payment History',
            'Reference Number': payment.referenceNumber || 'N/A',
            'Full Name': handleEmptyFields(''),
            'Date of Birth': handleEmptyFields(''),
            Age: handleEmptyFields(''),
            Gender: handleEmptyFields(''),
            'Phone Number': handleEmptyFields(''),
            Street: handleEmptyFields(''),
            Suburb: handleEmptyFields(''),
            City: handleEmptyFields(''),
            'Postal Code': handleEmptyFields(''),
            'Family Member Name': handleEmptyFields(''),
            'Family Member Relationship': handleEmptyFields(''),
            'Payment Amount': payment.totalAmountPaid || 'N/A',
            'Payment Date': payment.paymentDate
              ? new Date(payment.paymentDate).toISOString().split('T')[0]
              : 'N/A'
          });
        });

        // Convert data to CSV and trigger download
        const csv = Papa.unparse(data, {
          header: true, // Ensure headers are included
          columns: [
            'Section',
            'Reference Number',
            'Full Name',
            'Date of Birth',
            'Age',
            'Gender',
            'Phone Number',
            'Street',
            'Suburb',
            'City',
            'Postal Code',
            'Family Member Name',
            'Family Member Relationship',
            'Payment Amount',
            'Payment Date',
          ],
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const filename = `${client.firstName}_${client.lastName}_Profile.csv`;
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      },
      error: (error) => console.error('Error downloading client profile:', error),
    });
  }

  /**
   * Add a section header with a background.
   */
  private addSection(doc: jsPDF, title: string, y: number): number {
    doc.setFillColor(220, 220, 220);
    doc.rect(10, y, 190, 10, 'F'); // Filled rectangle for section header
    doc.setFontSize(14);
    doc.setFont('Helvetica', 'bold');
    doc.text(title, 15, y + 7);
    return y + 15; // Return new y-position
  }

  /**
   * Add content lines to the PDF.
   */
  private addContent(doc: jsPDF, lines: string[], y: number, usablePageHeight: number, p0: () => void): number {
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    lines.forEach((line) => {
      doc.text(line, 25, y);
      y += 10;
    });
    return y;
  }

}
