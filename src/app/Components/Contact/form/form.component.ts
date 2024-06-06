import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class CreateComponent implements OnInit {
  formContact: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    last_name: new FormControl('', [Validators.required]),
    company: new FormControl('')
  });
  contactId?: number;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadDataContactForm();
  }

  saveContact(): void {
    if (this.contactId) {
      this.contactService.updateContact(this.contactId, this.formContact.value).subscribe(contact => {
        this.router.navigateByUrl('/');
      });
    } else {
      this.contactService.createContact(this.formContact.value).subscribe(contact => {
        this.router.navigateByUrl('/');
      });
    }
  }

  hasError(field: string): boolean {
    const errorsObject = this.formContact.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if (errors.length && (this.formContact.get(field)?.touched || this.formContact.get(field)?.dirty)) {
      return true;
    }

    return false;
  }

  getCurrentError(field: string): string {
    const errorsObject = this.formContact.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if (!errors)
      return '';

    return errors[0];
  }

  getFormTitle(): string {
    return this.contactId ? 'Editar contacto' : 'Nuevo contacto';
  }

  private loadDataContactForm() : void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(contact => this.formContact.patchValue(contact));
    }
  }
}
