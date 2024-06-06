import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent as ContactIndexComponent } from './Components/Contact/index/index.component';

const routes: Routes = [
  { path: '', component: ContactIndexComponent },
  { path: 'contacts', component: ContactIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
