import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DocumentType } from '../../../../shared/models/client';
import { ClientService } from '../../../../core/services/client.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-supporting-docs',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['./supporting-docs.component.scss']
})
export class SupportingDocsComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() formData = new EventEmitter<{ typeName: string; fileName: string; file: File }[]>();

  private clientService = inject(ClientService);
  private dialog = inject(MatDialog);

  documentTypes: DocumentType[] = [];
  uploadedDocuments: { typeName: string; fileName: string; file: File }[] = [];
  selectedDocumentTypeId: number | null = null;

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  ngAfterViewInit(): void {
    if (!this.fileInput) {
      console.error('fileInput is not defined');
    }
  }

  loadDocumentTypes() {
    this.clientService.getDocumentTypes().subscribe({
      next: (documentTypes: any) => {
        this.documentTypes = Array.isArray(documentTypes)
          ? documentTypes.filter(dt => dt.groupCode == 'IDPT')
          : [];
      },
      error: error => console.error('Error loading document types:', error)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const documentType = this.documentTypes.find(
        (type: DocumentType) => type.id === this.selectedDocumentTypeId
      );
      if (documentType) {
        this.uploadedDocuments.push({
          typeName: documentType.name,
          fileName: file.name,
          file,
        });
        this.formData.emit(this.uploadedDocuments);
      }
    }
  }

  viewDocument(document: { file: File }): void {
    const fileURL = URL.createObjectURL(document.file);
    window.open(fileURL, '_blank');
  }

  deleteDocument(document: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadedDocuments = this.uploadedDocuments.filter((doc) => doc !== document);
        this.formData.emit(this.uploadedDocuments); // Emit updated documents
      }
    });
  }

  reAttachDocument(document: any): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
      this.fileInput.nativeElement.onchange = (event: Event) => {
        this.onReattachFileSelected(event, document);
      };
    } else {
      console.error('fileInput is not available');
    }
  }

  onReattachFileSelected(event: Event, document: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFile = input.files[0];
      document.file = newFile;
      document.fileName = newFile.name;
      this.formData.emit(this.uploadedDocuments); 
    }
  }
}
