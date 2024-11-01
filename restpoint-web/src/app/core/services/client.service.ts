import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../../shared/models/client';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);

  getClients() {
    return this.http.get<Pagination<Client>>(this.baseUrl + 'clients')
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }
}
