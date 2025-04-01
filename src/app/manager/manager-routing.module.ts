import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component'; 
const routes: Routes = [
  { path: '', component: ManagerRequestsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
