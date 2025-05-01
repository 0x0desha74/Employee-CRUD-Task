import { HttpClientModule } from '@angular/common/http'; 
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeCRUDClient';
  searchQuery: string = '';
  
  constructor(private router: Router) {}
  
  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/employees'], { 
        queryParams: { search: this.searchQuery }
      });
      this.searchQuery = '';
    }
  }
}