import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/Models/contact.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(contacts: Contact[], page: number = 0, search: string = ''): Contact[] {
    if (search.length === 0) {
      return contacts.slice(page, page + 15);
    }

    const filteredContacts = contacts.filter(contact => contact.name.includes(search));
    return filteredContacts.slice(page, page + 15);
  }
}
