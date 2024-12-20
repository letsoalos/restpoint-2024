import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BurialSociety, Client, Title, EthnicityGroup, FamilyMember, Gender, MaritalStatus, PaymentHistory, Status, Branch } from '../../shared/models/client';
import { Pagination } from '../../shared/models/pagination';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getClients(burialSocieties?: string[], clientStatues?: string[], branches?: string[]) {
    let params = new HttpParams();

    if (burialSocieties && burialSocieties.length > 0) {
      params = params.append('burialSocieties', burialSocieties.join(','));
    }

    if (clientStatues && clientStatues.length > 0) {
      params = params.append('clientStatues', clientStatues.join(','));
    }

    if (branches && branches.length > 0) {
      params = params.append('branches', branches.join(','));
    }

    return this.http.get<Pagination<Client>>(this.baseUrl + 'clients', { params });
  }

  getFamilyMembersByClientId(clientId: number): Observable<Pagination<FamilyMember>> {
    const params = new HttpParams().set('clientId', clientId.toString());
    return this.http.get<Pagination<FamilyMember>>(`${this.baseUrl}familymembers/family-members`, { params });
  }

  getPaymentHistoriesByClientId(clientId: number): Observable<Pagination<PaymentHistory>> {
    const params = new HttpParams().set('clientId', clientId.toString());
    return this.http.get<Pagination<PaymentHistory>>(`${this.baseUrl}paymenthistories/payment-histories`, { params });
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

  getMaritalStatus() {
    return this.http.get<MaritalStatus>(this.baseUrl + 'maritalstatus/marital-statuses');
  }

  getTitles() {
    return this.http.get<Title>(this.baseUrl + 'titles/title-list');
  }

  getEthnicityGroups() {
    return this.http.get<EthnicityGroup>(this.baseUrl + 'ethnicitygroupes/ethnicity-groups');
  }

  getBurialSocieties() {
    return this.http.get<BurialSociety[]>(this.baseUrl + 'burialsocieties/burial-societies');
  }

  getBranchList() {
    return this.http.get<Branch[]>(this.baseUrl + 'branch/branch-list');
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + `clients/${id}`);
  }

  updateClient(id: number, data: any) {
    return this.http.put<Client>(this.baseUrl + `clients/${id}`, data);
  }

  saveClient(data: any) {
    return this.http.post<Client>(this.baseUrl + `clients`, data);
  }

}
