import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeServiceService],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent {
  id!: number;
  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      },
      error => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}