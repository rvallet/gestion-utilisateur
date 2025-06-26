import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {User} from "../../models/user.model";
import {Adresse} from "../../models/adresse.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogTitle} from "@angular/material/dialog";
import {ChangePasswordRequest} from "../../models/change-password-request.model";
import {MessageComponent} from "../../shared/message/message.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDialogTitle,
    MessageComponent
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('slideFadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  newAddress: Adresse = {};
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  passwordError: string = '';
  passwordSuccess: string = '';
  section: string = 'personnel';

  // Critères de mot de passe
  passwordCriteria = {
    length: false,
    lowercase: false,
    uppercase: false,
    special: false,
  };

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const storedUserJson: string | null = localStorage.getItem('user');
    if (storedUserJson) {
      try {
        this.user = JSON.parse(storedUserJson);
      } catch (e) {
        console.error('Erreur parsing user', e);
        // si erreur, garder user initial
      }
    }
  }

  updateUser(): any {
    this.message = ''; // reset message
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.message = 'Données mises à jour.';
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      error: () => {
        this.message = 'Erreur lors de la mise à jour.';
      }
    });
  }

  deleteUser() {
    this.message = ''; // reset message
    if (this.user && this.user.login) {
      this.userService.deleteUser(this.user.login).subscribe(
        () => {
          localStorage.removeItem('user');
          // Rediriger vers l'accueil ou login
          window.location.href = '/';
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  addAddress() {
    if (this.user && this.user.adresses) {
      const address = {
        ...this.newAddress,
        principale: this.user.adresses.length === 0 // première adresse par défaut
      };
      this.user.adresses.push(address);
      // reset
      this.newAddress = {
        numero: '',
        rue: '',
        codePostal: '',
        ville: '',
        pays: '',
        principale: false
      };
    }
  }

  removeAddress(index: number) {
    this.message = ''; // reset message
    if (this.user?.adresses) {
      this.user.adresses.splice(index, 1);
      this.updateUser();
    }
  }

  setDefaultAddress(index: number) {
    if (this.user?.adresses) {
      this.user.adresses.forEach((addr, i) => addr.principale = (i === index));
      this.updateUser();
    }
  }

  changePassword(): void {
    // Réinitialisation des messages
    this.passwordError = '';
    this.passwordSuccess = '';
    this.message = '';
    // Vérification des champs
    if (!this.user || !this.user.login) {
      this.passwordError = 'Veuillez vous reconnecter.';
      return;
    }
    if (!this.newPassword || !this.confirmPassword) {
      this.passwordError = 'Veuillez remplir tous les champs.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Préparation de la requête
    const request: ChangePasswordRequest = {
      login: this.user.login,
      newPassword: this.newPassword
    };

    // Si regex de mot de passe est définie, l'ajouter à la requête
    this.userService.changePassword(request).subscribe({
      next: () => {
        this.passwordSuccess = 'Mot de passe modifié avec succès.';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (error) => {
        //console.error('Erreur changement mot de passe', error);
        this.passwordError = error?.error || error.error?.message || 'Erreur lors du changement de mot de passe.';
      }
    });

  }

  validatePassword() {
    const pw: string = this.newPassword;

    this.passwordCriteria.length = pw.length >= 8;
    this.passwordCriteria.lowercase = /[a-z]/.test(pw);
    this.passwordCriteria.uppercase = /[A-Z]/.test(pw);
    this.passwordCriteria.special = /[@$!%*?&]/.test(pw);
  }

  isPasswordValid() {
    return Object.values(this.passwordCriteria).every(v => v);
  }

  selectSection(sec: string) {
    this.message = '';
    this.section = sec;
  }

}
