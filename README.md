Comment initialiser le projet "Piiquante" :

Création de dossier :

Tout d'abord, il faut créer un un dossier "images" dans le dossier backend. Sinon les images ne sont pas stockés.

Ensuite dans le dossier backend, vous devez créer un fichier ".env" avec la variable "PROJECT_MONGODB=", et vous devez ensuite mettre votre lien de connexion mongoDB. Exemple : mongodb+srv://"Votre pseudo":"Votre mot de passe"@"Votre cluster mongoDB".mongodb.net/?retryWrites=true&w=majority

Et veuillez également mettre la variable PORT=3000 dans le dossier ".env".

Installation des packages : 

Clique droit sur le dossier 'frontend' et 'Open with in intagrated terminal' et executez ces commandes:

npm install

npm run start

Cela lanceras le serveur Frontend.

Clique droit sur le dossier 'backend' et 'Open with in intagrated terminal' et executez ces commandes :


npm install --save express mongoose helmet mongoose-unique-validator bcrypt jsonwebtoken multer dotenv 



Une fois tout ceci installé, vous pouvez lancer la commande "npx nodemon server" avec le terminal sur le dossier 'backend', et veuillez verifier que votre serveur frontend est bien demarré.


Vous avez terminé l'installation du projet 'Piiquante'. Veillez à bien installer les packages listés ci-dessus et respecter les étapes, sans quoi le projet rencontreras des difficultés.


