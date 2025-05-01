import { Routes } from '@angular/router';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'addEmployee', component: EmployeeCreateComponent },
  { path: '', component: EmployeeListComponent },
  { path: 'update-employee/:id', component: EmployeeUpdateComponent },

];
