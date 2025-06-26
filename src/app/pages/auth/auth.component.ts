import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  isCreating: boolean = false;
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.message = '';
    this.userService.login(this.login, this.password).subscribe(
      user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/user']);
      },
      err => {
        this.message = 'Identifiants incorrects.';
      }
    );
  }

  onRegister() {
    this.message = '';
    const newUser = {
      login: this.login,
      motDePasse: this.password,
      nom: this.nom,
      prenom: this.prenom,
      adresses: [] // À adapter selon votre modèle
    };
    this.userService.register(newUser).subscribe(
      res => {
        this.message = 'Compte créé, connectez-vous.';
        this.isCreating = false;
      },
      err => {
        this.message = 'Erreur lors de la création.';
      }
    );
  }

  resetMessage() {
    this.message = '';
  }

}
