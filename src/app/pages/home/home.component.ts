import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']).then(success => {
      if (success) {
        // Navigation réussie
        console.log('Successfully logged in');
      } else {
        // Échec de la navigation
        console.log('Error logged in');
      }
    });
  }

}
