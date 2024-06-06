import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent as ContactIndexComponent } from './Components/Contact/index/index.component';
import { CreateComponent as FormComponent } from './Components/Contact/form/form.component';

const routes: Routes = [
  { path: '', component: ContactIndexComponent },
  { path: 'contacts', component: ContactIndexComponent },
  { path: 'contact/create', component: FormComponent },
  { path: 'contact/:id/edit', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
