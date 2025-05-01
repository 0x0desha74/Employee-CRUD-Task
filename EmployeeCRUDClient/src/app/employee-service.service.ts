import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  baseURL = "https://localhost:7248/api/employees"

  constructor(private httpClient: HttpClient) { }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }


getEmployees():Observable<Employee[]>{
  return this.httpClient.get<Employee[]>(`${this.baseURL}`);
}
}
