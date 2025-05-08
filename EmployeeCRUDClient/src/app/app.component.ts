import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from './employee-service.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet, 
    RouterModule, 
    FormsModule, 
    HttpClientModule,
    CommonModule
  ],
  providers: [EmployeeServiceService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeCRUDClient';
}