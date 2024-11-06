import { Component, AfterViewInit, ElementRef, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

declare var PDFViewerApplication: any;

@Component({
  selector: 'app-consent-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckbox
  ],
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.scss']
})
export class ConsentFormComponent implements AfterViewInit {
  @ViewChild('pdfViewerContainer') pdfViewerContainer!: ElementRef;
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.pdfViewerContainer && this.pdfViewerContainer.nativeElement) {

        const iframe: HTMLIFrameElement = document.createElement('iframe');
        iframe.src = './assets/docs/ConsentForm.pdf';
        iframe.width = '85%';
        iframe.height = '300vh';
        iframe.style.border = 'none';
        iframe.style.display = 'block';
        iframe.style.margin = 'auto';

        this.pdfViewerContainer.nativeElement.appendChild(iframe);

        iframe.onload = () => {
          if (iframe.contentWindow) {
            try {
              PDFViewerApplication.initialize({});
            } catch (error) {
              console.error('Error initializing the PDF viewer: ', error);
            }
          }
        };

      } else {
        console.error('pdfViewerContainer is not available.');
      }
    }, 0);
  }
}
