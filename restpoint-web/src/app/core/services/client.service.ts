import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BurialSociety, Client, ClientTitle, EthnicityGroup, Gender, Status } from '../../shared/models/client';
import { Pagination } from '../../shared/models/pagination';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getClients(burialSocieties?: string[], clientStatues?: string[]) {
    let params = new HttpParams();

    if (burialSocieties && burialSocieties.length > 0) {
      params = params.append('burialSocieties', burialSocieties.join(','));
    }

    if (clientStatues && clientStatues.length > 0) {
      params = params.append('clientStatues', clientStatues.join(','));
    }

    return this.http.get<Pagination<Client>>(this.baseUrl + 'clients', { params });
  }

  getGenderList() {
    return this.http.get<Gender>(this.baseUrl + 'genders/gender-list');
  }

  getDocumentTypes() {
    return this.http.get<DocumentType[]>(this.baseUrl + 'documenttypes/document-types');
  }

  getStatuses() {
    return this.http.get<Status[]>(this.baseUrl + 'statuses/status-list');
  }

  getTitles() {
    return this.http.get<ClientTitle>(this.baseUrl + 'titles/title-list');
  }

  getEthnicityGroups() {
    return this.http.get<EthnicityGroup>(this.baseUrl + 'ethnicitygroupes/ethnicity-groups');
  }

  getBurialSocieties() {
    return this.http.get<BurialSociety[]>(this.baseUrl + 'burialsocieties/burial-societies');
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + `clients/${id}`);
  }

  updateClient(id: number, data: any) {
    return this.http.put<Client>(this.baseUrl + `clients/${id}`, data);
  }
}
