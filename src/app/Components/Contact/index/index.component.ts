import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Models/contact.model';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-contact-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  contacts: Contact[] = [];
  page: number = 0;
  search: string = '';

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.loadDataInToTable();
  }

  nextPage() {
    this.page += 10;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 10;
    }
  }

  onSearchContact(search: string) {
    this.page = 0;
    this.search = search;
  }

  deleteContact(id: number): void {
    this.contactService.deleteEContact(id).subscribe(response => {
      this.contacts = this.contacts.filter(contact => contact.id != id);
    });
  }

  private loadDataInToTable(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts
    });
  }
}
