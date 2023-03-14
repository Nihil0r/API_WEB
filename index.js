const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Initialisation de la liste d'annotations
const annotations = [];

// Parser les données POST envoyées par le formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route pour récupérer la liste d'annotations
app.get('/annotations', (req, res) => {
  res.json(annotations);
});

// Route pour créer une nouvelle annotation
app.post('/annotations', (req, res) => {
  // Générer un nouvel identifiant unique
  const uri = uuid.v4();

  // Récupérer les données du formulaire
  const title = req.body.title;
  const content = req.body.content;
  const format = req.body.format;

  // Créer une nouvelle annotation
  const annotation = {
    uri,
    title,
    content,
    format,
    created_at: new Date()
  };

  // Ajouter l'annotation à la liste
  annotations.push(annotation);

  // Retourner la nouvelle annotation
  res.json(annotation);
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
