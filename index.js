// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Création de l'application Express
const app = express();
app.use(bodyParser.json());

// Stockage des annotations
const annotations = {};

// Route pour créer une annotation
app.post('/annotations', (req, res) => {
    const { annotationURI, resourceURI, content, format } = req.body;
    if (!annotationURI || !resourceURI || !content || !format) {
        return res.status(400).send('Tous les champs sont requis.');
    }
    if (annotations.hasOwnProperty(annotationURI)) {
        return res.status(409).send('Une annotation avec cet URI existe déjà.');
    }
    annotations[annotationURI] = { resourceURI, content, format };
    res.status(201).send('Annotation créée avec succès.');
  });
  

// Route pour récupérer une annotation
app.get('/annotations/:annotationURI', (req, res) => {
    const annotationURI = req.params.annotationURI;
    const annotation = annotations[annotationURI];
    if (!annotation) {
        return res.status(404).send('Annotation introuvable.');
    }
    res.json(annotation);
});

// Route pour récupérer toutes les annotations portant sur une ressource
app.get('/resources/:resourceURI/annotations', (req, res) => {
    const resourceURI = req.params.resourceURI;
    const resourceAnnotations = Object.values(annotations).filter(
        (annotation) => annotation.resourceURI === resourceURI
    );
    res.json(resourceAnnotations);
});

// Route pour récupérer toutes les annotations de notre serveur
app.get('/annotations', (req, res) => {
    const annotationsArray = Object.entries(annotations).map(([annotationURI, annotation]) => {
        return { annotationURI, ...annotation };
    });
    res.json(annotationsArray);
});
  

// Fonction pour importer des annotations d'un serveur tiers
async function importAnnotationsFromThirdPartyServer(serverURL) {
    // Utiliser "fetch" ou une autre bibliothèque pour récupérer les données à partir de serverURL
    // Ajouter les annotations importées à notre objet "annotations"
}

// Lignes pour servir le fichier client.html à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});