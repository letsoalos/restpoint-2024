import { Component, AfterViewInit, ElementRef, ViewChild, inject, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class ConsentFormComponent implements OnInit, AfterViewInit {
  @Output() formData = new EventEmitter<any>();
  @ViewChild('pdfViewerContainer') pdfViewerContainer!: ElementRef;

  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  form: FormGroup | any;

  ngOnInit(): void {
    this.initializeForm();
    this.form.valueChanges.subscribe((value: any) => {
      this.formData.emit(value);
    });

    this.form.patchValue({ consent: true });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.pdfViewerContainer?.nativeElement) {
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

  initializeForm(): void {
    this.form = this.fb.group({
      consent: [false, [Validators.required]]
    });
  }
}
