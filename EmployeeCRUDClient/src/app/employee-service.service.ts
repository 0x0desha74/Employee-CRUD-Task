import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

// Define the paginated response interface
export interface PaginatedResponse<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
 
  baseURL = "https://localhost:7248/api/employees";

  constructor(private httpClient: HttpClient) { }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  // Updated to handle pagination params
  getEmployees(pageIndex: number = 0, pageSize: number = 5): Observable<PaginatedResponse<Employee>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
      
    return this.httpClient.get<PaginatedResponse<Employee>>(`${this.baseURL}`, { params });
  }

  updateEmployeeData(employee: Employee, id: number): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  // Updated to handle pagination with search
  searchEmployees(term: string, pageIndex: number = 0, pageSize: number = 5): Observable<PaginatedResponse<Employee>> {
    let params = new HttpParams()
      .set('searchTerm', term)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
      
    return this.httpClient.get<PaginatedResponse<Employee>>(`${this.baseURL}/search`, { params });
  }
}