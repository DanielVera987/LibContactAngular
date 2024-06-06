import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/Models/contact.model';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  contact? : any;
  contactId?: number;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadDataInToTable();
  }

  private loadDataInToTable(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(contact => {
        this.contact = contact
      });
    }
  }
}
