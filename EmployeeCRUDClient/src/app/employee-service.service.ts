import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee, PaginatedResponse } from './employee';
import { Observable } from 'rxjs';

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

  getEmployees(pageIndex: number = 1, pageSize: number = 5): Observable<PaginatedResponse<Employee>> {
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

  searchEmployees(term: string, pageIndex: number = 1, pageSize: number = 5): Observable<PaginatedResponse<Employee>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('q', term);
    
    return this.httpClient.get<PaginatedResponse<Employee>>(`${this.baseURL}/search`, { params });
  }
}