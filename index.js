// var express = require('express');
// var app = express();

// const port = process.env.PORT || 3000;

// app.get("/toto", function(req,res){ 
//     res.send("Salut toto")
// } );

// app.listen(port, function(){
//     console.log('Serveur listening on port : ' + port); 
// });



const express = require('express');
const path = require('path'); // module pour manipuler les chemins de fichiers

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les données POST du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route pour servir le fichier client.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client.html'));
});

// Route pour recevoir les données du formulaire en méthode POST
app.post('/annotation', function(req, res) {
    const newAnnotation = {
        title: req.body.title,
        content: req.body.content,
        format: req.body.format
    };
    // Code pour ajouter la nouvelle annotation dans la liste des annotations
    // à écrire selon comment cette liste est implémentée
});

app.listen(port, function() {
    console.log('Serveur listening on port : ' + port);
});
