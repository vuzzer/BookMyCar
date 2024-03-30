"use strict";
// Information du vehicule
let objVehiculeJSON = localStorage.getItem('vehicule');
let objVehicule = JSON.parse(objVehiculeJSON);

// Information personnel
let objInfoJSON = localStorage.getItem('info');
let objInfo = JSON.parse(objInfoJSON);

// DOM liste des caracteristique du vehicule
let caracteristiques = document.getElementById('caracteristiques').children;
let options = document.getElementById('option');

let nomComplet = document.getElementById('nom');
let typeDeVehicule = document.getElementById('typeDeVehicule');
let grosseur = document.getElementById('grosseur');
let couleur = document.getElementById('couleur')

let nomVehicule = {ecologique: 'Écologique', sport: 'Sport', vus: 'VUS'}

// Affichage des information personnel, le type, couleur et grosseur
nomComplet.textContent = nomComplet.textContent + ' ' + objInfo['prenom'] + ' ' + objInfo['nom']
typeDeVehicule.textContent = typeDeVehicule.textContent + ' ' + nomVehicule[objInfo['typeDeVehicule']]
grosseur.textContent = grosseur.textContent + ' ' + objInfo['grosseur']
couleur.textContent = couleur.textContent + ' ' + objInfo['couleur']

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





