import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Employee } from '../app/employee';
import { EmployeeServiceService } from '../app/employee-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ], 
  providers: [EmployeeServiceService],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeServiceService){}

  addEmployeeData() {
    if (!this.employee.firstName || !this.employee.lastName || !this.employee.email || !this.employee.position) {
      alert("Please fill out all fields.");
      return;
    }

    this.employeeService.addEmployee(this.employee).subscribe(
      data => {
        alert("Employee Created Successfully");
        this.employee = new Employee();
      },
      error => {
        alert("Failed to create employee");
      }
    );
  }    
}
