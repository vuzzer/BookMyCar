"use strict";

let objVehiculeJSON = localStorage.getItem('vehicule');
let objVehicule = JSON.parse(objVehiculeJSON);
let caracteristiques = document.getElementById('caracteristiques').children;
let options = document.getElementById('option');

// affichage des caracteristiques
for(let caracteristique of caracteristiques){
    caracteristique.textContent = caracteristique.textContent + ' ' + objVehicule[caracteristique.id]
}

// affichage des options
for(let valeur of objVehicule['option']){
    let option = document.createElement('li');
    option.textContent = valeur;
    options.append(option);
}



