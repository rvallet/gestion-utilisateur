# Introduction : GestionUtilisateur

Ce projet Angular est une application de gestion des utilisateurs, permettant de créer, lire, mettre à jour et supprimer des utilisateurs.  
Il utilise Angular Material pour l'interface utilisateur et un service RESTful pour la gestion des données.  
Cette application permet de tester l'API ms-user et de mettre en pratique l'utilisation de ce microservice.

## Table des matières
- [Serveur de développement](#serveur-de-développement)
- [Build](#build)
- [Déploiement](#déploiement)
- [Licences](#licences)

## Serveur de développement
Pour exécuter l'application en mode développement, assurez-vous d'avoir installé les dépendances nécessaires. Vous pouvez le faire en exécutant la commande suivante dans le répertoire du projet :

```bash
npm clean-install
```
Ensuite, vous pouvez démarrer le serveur de développement avec la commande suivante :

```bash
ng serve
```

Et ouvrez votre navigateur à l'adresse `http://localhost:4200/`.

## Build

Pour construire le projet, exécutez la commande suivante en précisant l'environnement (production ou développement) :

```bash
ng build --configuration production
```

Cette commande va compiler l'application et placer les fichiers générés dans le répertoire `dist/`. Vous pouvez ensuite déployer ces fichiers sur un serveur web.

## Déploiement

Pour déployer l'application, vous pouvez utiliser un serveur web comme Nginx ou Apache.
Assurez-vous que les fichiers générés par la commande de build sont copiés dans le répertoire racine de votre serveur web.

pour Nginx, vous pouvez utiliser la configuration suivante :

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        root /path/to/your/dist/directory;
        try_files $uri $uri/ /index.html;
    }
}
```
Pour charger la configuration, placez ce fichier dans le répertoire de configuration de Nginx (généralement `/etc/nginx/sites-available/`) et créez un lien symbolique vers le répertoire `sites-enabled` :

```bash
sudo ln -s /etc/nginx/sites-available/your_config_file /etc/nginx/sites-enabled/ # Crée un lien symbolique
sudo nginx -t # Pour tester la configuration
sudo systemctl reload nginx # Recharge la configuration de Nginx
```

Une fois que la configuration est en place, vous pouvez redémarrer Nginx pour appliquer les changements :

```bash
sudo systemctl reload nginx # Recharge la configuration de Nginx
sudo systemctl restart nginx # Redémarre Nginx
```

Lorsque vous accédez à `http://your_domain.com`, l'application Angular devrait être servie correctement. 
Par la suite, vous n'aurez plus qu'à mettre à jour les fichiers dans le répertoire `dist/` pour déployer de nouvelles versions de l'application.
Nginx servira automatiquement les fichiers statiques de l'application Angular sans nécessiter de redémarrage du serveur.

## Licences
Ce projet est sous licence MIT. Vous pouvez consulter le fichier `LICENSE` pour plus de détails.

