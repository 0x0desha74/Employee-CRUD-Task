import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-update',
  imports: [FormsModule],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {

  id!: number;
  employee: Employee = new Employee();

  constructor(
    private activeRouter: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    console.log(this.id);
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      })
  }

  updateEmployeeData() {
this.employeeService.updateEmployeeData(this.employee,this.id).subscribe(
  data =>{
  alert("Employee updated successfully");
  this.router.navigate(['/']);
},
error =>{
  alert("Failed to update the Employee");
})
  }

}
