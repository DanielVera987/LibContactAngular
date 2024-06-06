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

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.loadDataInToTable();
  }

  private loadDataInToTable(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts
    });
  }
}
