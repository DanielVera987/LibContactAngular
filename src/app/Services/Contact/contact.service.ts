import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/Models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = "http://127.0.0.1:8000/api"

  constructor(private http : HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.API_URL}/contact`);
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API_URL}/contact/${id}`);
  }

  createContact(data: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.API_URL}/contact`, data);
  }

  updateContact(id: number, data: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.API_URL}/contact/${id}`, data);
  }

  deleteEContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/contact/${id}`);
  }
}
