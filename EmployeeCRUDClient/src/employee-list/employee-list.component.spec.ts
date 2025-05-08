import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EmployeeServiceService } from '../app/employee-service.service';
import { of } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: EmployeeServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        EmployeeListComponent
      ],
      providers: [EmployeeServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeServiceService);
    
    // Mock the employee service response
    spyOn(employeeService, 'getEmployees').and.returnValue(
      of({
        pageIndex: 1,
        pageSize: 5,
        count: 10,
        data: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', position: 'Developer' }
        ]
      })
    );
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load employees on init', () => {
    expect(employeeService.getEmployees).toHaveBeenCalled();
    expect(component.employees.length).toBe(1);
    expect(component.totalItems).toBe(10);
  });
  
  it('should calculate pages correctly', () => {
    component.totalItems = 10;
    component.itemsPerPage = 5;
    component.calculatePages();
    expect(component.pages.length).toBe(2);
    expect(component.pages).toEqual([1, 2]);
  });
  
  it('should navigate to update employee', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.updateEmployee(1);
    expect(routerSpy).toHaveBeenCalledWith(['update-employee', 1]);
  });
  
  it('should navigate to view employee', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.viewEmployee(1);
    expect(routerSpy).toHaveBeenCalledWith(['view-employee', 1]);
  });
});