import { Component, OnInit } from '@angular/core';
import { Employee, PaginatedResponse } from '../app/employee';
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
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  pages: number[] = [];
  
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  isLoading: boolean = false;

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.searchEmployees();
    });
    
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.searchEmployees();
      }
    });
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees(this.currentPage, this.itemsPerPage).subscribe(
      (response: PaginatedResponse<Employee>) => {
        this.employees = response.data;
        this.totalItems = response.count;
        this.currentPage = response.pageIndex;
        this.itemsPerPage = response.pageSize;
        this.calculatePages();
        this.isLoading = false;
      },
      error => {
        console.error('Error loading employees:', error);
        alert('Failed to load employees');
        this.isLoading = false;
      }
    );
  }
  
  searchEmployees() {
    if (!this.searchTerm.trim()) {
      this.loadEmployees();
      return;
    }
    
    this.isLoading = true;
    this.employeeService.searchEmployees(this.searchTerm, this.currentPage, this.itemsPerPage).subscribe(
      (response: PaginatedResponse<Employee>) => {
        this.employees = response.data;
        this.totalItems = response.count;
        this.currentPage = response.pageIndex;
        this.itemsPerPage = response.pageSize;
        this.calculatePages();
        this.isLoading = false;
      },
      error => {
        console.error('Error searching employees:', error);
        this.isLoading = false;
      }
    );
  }
  
  calculatePages() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({length: pageCount}, (_, i) => i + 1);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length && page !== this.currentPage) {
      this.currentPage = page;
      if (this.searchTerm.trim()) {
        this.searchEmployees();
      } else {
        this.loadEmployees();
      }
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.searchTerm.trim()) {
        this.searchEmployees();
      } else {
        this.loadEmployees();
      }
    }
  }
  
  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      if (this.searchTerm.trim()) {
        this.searchEmployees();
      } else {
        this.loadEmployees();
      }
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
          this.loadEmployees();
        },
        error => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      );
    }
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadEmployees();
  }
}