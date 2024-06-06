import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/Models/contact.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(contacts: Contact[], page: number = 0): Contact[] {
    return contacts.slice(page, page + 15);
  }
}
