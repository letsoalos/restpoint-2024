import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FamilyMember, Relationship } from '../../shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);


  getgetFamilyMembers() {
    return this.http.get<FamilyMember[]>(this.baseUrl + 'familymembers/family-members');
  }

  getRelationships() {
    return this.http.get<Relationship>(this.baseUrl + 'relationships/relationship-list');
  }

  getFamilyMember(id: number) {
    return this.http.get<FamilyMember>(this.baseUrl + `familymembers/${id}`);
  }

  updateFamilyMember(id: number, data: any) {
    return this.http.put<FamilyMember>(this.baseUrl + `familymembers/${id}`, data);
  }

  deleteFamilyMember(id: number, data: any) {
    return this.http.put<FamilyMember>(this.baseUrl + `familymembers/${id}/delete`, {});
  }

  saveFamilyMember(data: any) {
    return this.http.post<FamilyMember>(this.baseUrl + `familymembers`, data);
  }

}
