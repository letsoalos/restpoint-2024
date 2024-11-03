import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BurialSociety, Client, Gender } from '../../shared/models/client';
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

  getGenderList() {
    return this.http.get<Gender>(this.baseUrl + 'genders/gender-list')
  }

  getDocumentTypes() {
    return this.http.get<DocumentType[]>(this.baseUrl + 'documenttypes/document-types')
  }

  getBurialSocieties() {
    return this.http.get<BurialSociety[]>(this.baseUrl + 'burialsocieties/burial-societies')
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + `clients/${id}`);
  }

  updateClient(id: number, data: any) {
    return this.http.put<Client>(this.baseUrl + `clients/${id}`, data);
  }
}
