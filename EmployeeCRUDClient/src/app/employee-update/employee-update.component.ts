import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [EmployeeServiceService],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();

  constructor(
    private activeRouter: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    console.log(this.id);
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      },
      error => {
        console.error('Error fetching employee:', error);
        alert('Failed to load employee data');
      }
    );
  }

  updateEmployeeData() {
    this.employeeService.updateEmployeeData(this.employee, this.id).subscribe(
      data => {
        alert("Employee updated successfully");
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error updating employee:', error);
        alert("Failed to update the Employee");
      }
    );
  }
}