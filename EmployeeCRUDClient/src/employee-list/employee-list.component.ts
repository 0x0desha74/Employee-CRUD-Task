import { Component } from '@angular/core';
import { Employee } from '../app/employee';
import { EmployeeServiceService } from '../app/employee-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [  CommonModule],
  providers: [EmployeeServiceService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  constructor(
    private employeeService : EmployeeServiceService,
    private router : Router

  ){}

  employees : Employee[] = [];

ngOnInit():void{
  this.employeeService.getEmployees().subscribe(
    data =>{
      this.employees =data
    }
  )
}

updateEmployee(id: number) {
  this.router.navigate(["update-employee",id])
}


}
