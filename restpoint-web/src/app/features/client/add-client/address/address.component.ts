import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  @Output() formData = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  form: FormGroup | any;

  ngOnInit(): void {
    this.initializeForm();
    this.form.valueChanges.subscribe((value: any) => {
      this.formData.emit(value);
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      streetName: [''],
      suburb: [''],
      city: [''],
      postalCode: [''],
      phoneNumber: [''],
      altNumber: [''],
      email: ['']
    });
  }

}
