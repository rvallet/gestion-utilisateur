import { Adresse } from './adresse.model';

export interface User {
  login: string;
  motDePasse?: string;
  nom?: string;
  prenom?: string;
  adresses?: Adresse[];
}
