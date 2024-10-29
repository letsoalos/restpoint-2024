import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Client } from './shared/models/client';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  title = 'restpoint';
  clients: Client[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Client>>(this.baseUrl + 'clients').subscribe({
      next: response => this.clients = response.data,
      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }

}
