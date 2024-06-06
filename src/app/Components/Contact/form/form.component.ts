import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class CreateComponent implements OnInit {
  formContact: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    last_name: ['', [Validators.required]],
    company: [''],
    phones: this.fb.array([
      this.fb.group({
        phone: ['', [Validators.required]]
      })
    ]),
    emails: this.fb.array([
      this.fb.group({
        email: ['', [Validators.required]]
      })
    ]),
    addresses: this.fb.array([
      this.fb.group({
        street: ['', [Validators.required]],
        between_streets: [''],
        zip: [''],
        city: [''],
        num_ext: [''],
        num_int: [''],
        state: [''],
      })
    ])
  });
  contactId?: number;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fb: FormBuilder
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

  get phones() {
    return this.formContact.get('phones') as FormArray;
  }

  get emails() {
    return this.formContact.get('emails') as FormArray;
  }

  get addresses() {
    return this.formContact.get('addresses') as FormArray;
  }

  addPhone() {
    this.phones.push(
      this.fb.group({
        phone: ['', [Validators.required]]
      })
    );
  }

  addEmail() {
    this.emails.push(
      this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      })
    );
  }

  addAddress() {
    this.addresses.push(
      this.fb.group({
        street: ['', [Validators.required]],
        between_streets: [''],
        zip: [''],
        city: [''],
        num_ext: [''],
        num_int: [''],
        state: [''],
      })
    );
  }

  deletePhone(i: number) {
    this.phones.removeAt(i);
  }

  deleteEmail(i: number) {
    this.emails.removeAt(i);
  }

  deleteAddress(i: number) {
    this.addresses.removeAt(i);
  }

  private loadDataContactForm() : void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe(contact => {
        if (contact.phones?.length && contact.phones.length >= 2) {
          for(let i = 1; i <= contact.phones.length - 1; i++) {
            this.addPhone();
          }
        }

        if (contact.emails?.length && contact.emails.length >= 2) {
          for(let i = 1; i <= contact.emails.length - 1; i++) {
            this.addEmail();
          }
        }

        if (contact.addresses?.length && contact.addresses.length >= 2) {
          for(let i = 1; i <= contact.addresses.length - 1; i++) {
            this.addAddress();
          }
        }

        this.formContact.patchValue(contact)
      });
    }
  }
}
