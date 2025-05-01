import { Component } from '@angular/core';
import { Employee } from '../app/employee';
import { EmployeeServiceService } from '../app/employee-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EmployeeServiceService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  // All employees from the server
  allEmployees: Employee[] = [];
  // Filtered employees (based on search)
  employees: Employee[] = [];
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  pages: number[] = [];
  
  // Search variables
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit():void {
    this.loadEmployees();
    
    // Set up search with debounce
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Reset to first page on search
      this.filterEmployees();
    });
    
    // Check for search query from URL parameters
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.filterEmployees();
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.allEmployees = data;
        this.totalItems = data.length;
        this.calculatePages();
        this.filterEmployees();
      },
      error => {
        console.error('Error loading employees:', error);
        alert('Failed to load employees');
      }
    );
  }
  
  calculatePages() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({length: pageCount}, (_, i) => i + 1);
  }
  
  filterEmployees() {
    // First apply search filter if any
    let filtered = this.allEmployees;
    if (this.searchTerm) {
      this.searchTerm = this.searchTerm.toLowerCase();
      filtered = this.allEmployees.filter(emp => 
        emp.firstName.toLowerCase().includes(this.searchTerm) ||
        emp.lastName.toLowerCase().includes(this.searchTerm) ||
        emp.email.toLowerCase().includes(this.searchTerm) ||
        emp.position.toLowerCase().includes(this.searchTerm)
      );
    }
    
    // Then apply pagination
    this.totalItems = filtered.length;
    this.calculatePages();
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.employees = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.filterEmployees();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterEmployees();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.filterEmployees();
    }
  }
  
  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  updateEmployee(id: number) {
    this.router.navigate(["update-employee", id]);
  }

  viewEmployee(id: number) {
    this.router.navigate(["view-employee", id]);
  }
  
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          alert('Employee deleted successfully');
          this.loadEmployees(); // Reload the employee list
        },
        error => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      );
    }
  }
}