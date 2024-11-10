import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DocumentType } from '../../../../shared/models/client';
import { ClientService } from '../../../../core/services/client.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supporting-docs',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['./supporting-docs.component.scss']
})
export class SupportingDocsComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private clientService = inject(ClientService);

  documentTypes: DocumentType[] = [];
  uploadedDocuments: { typeName: string; fileName: string; file: File }[] = [];
  selectedDocumentTypeId: number | null = null;

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  ngAfterViewInit(): void {
    // Verify if file input is defined after view initializes
    if (!this.fileInput) {
      console.error('fileInput is not defined');
    }
  }

  loadDocumentTypes() {
    this.clientService.getDocumentTypes().subscribe({
      next: (documentTypes: any) => this.documentTypes = documentTypes as DocumentType[],
      error: error => console.log(error)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const documentType = this.documentTypes.find((type: DocumentType) =>
        type.id === this.selectedDocumentTypeId
      );
      if (documentType) {
        this.uploadedDocuments.push({
          typeName: documentType.name,
          fileName: file.name,
          file,
        });
      }
    }
  }

  uploadDocuments(): void {
    if (this.uploadedDocuments.length === 0) {
      console.log('No document selected for upload.');
      return;
    }

    const documentToUpload = this.uploadedDocuments[0];
    const formData = new FormData();
    formData.append('file', documentToUpload.file);
    formData.append('typeName', documentToUpload.typeName);

    // this.clientService.uploadDocument(formData).subscribe({
    //   next: response => {
    //     console.log('Upload successful:', response);
    //     // Optionally, remove the uploaded document from the list or update the UI as needed
    //   },
    //   error: error => console.error('Upload failed:', error)
    // });
  }

  viewDocument(document: { file: File }): void {
    const fileURL = URL.createObjectURL(document.file);
    window.open(fileURL, '_blank');
  }

  deleteDocument(document: any): void {
    this.uploadedDocuments = this.uploadedDocuments.filter((doc) => doc !== document);
  }

  reAttachDocument(document: any): void {
    // Check if fileInput is defined
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
      this.fileInput.nativeElement.onchange = (event: Event) => {
        this.onReattachFileSelected(event, document); // Pass both event and document
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
    }
  }
}
