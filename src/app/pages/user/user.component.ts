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
    MatDialogTitle
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
    this.userService.updateUser(this.user).subscribe(
      () => {
        this.message = 'Données mises à jour.';
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      () => {
        this.message = 'Erreur lors de la mise à jour.';
      }
    );
  }

  deleteUser() {
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

  changePassword() {
    if (this.user && this.user.login && this.user.motDePasse) {
      this.userService.changePassword(this.user).subscribe(
        () => {
          this.message = 'Mot de passe mis à jour.';
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        () => {
          this.message = 'Erreur lors de la mise à jour du mot de passe.';
        }
      );
    } else {
      this.message = 'Veuillez renseigner le mot de passe actuel.';
    }
  }

}
