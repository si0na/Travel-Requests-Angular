import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel Request';
  sidebarVisible = true; // ✅ Add this property to fix the error

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
