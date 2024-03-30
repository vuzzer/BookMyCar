"use strict";
let champsCaracteristiques = document.querySelectorAll("input[type=text]");
let boutonSoumettre = document.getElementById("valider");
let formulaire = document.querySelector("form");
const REGEX_NOMBRE = /^\d+$/;
let validation = true;
let nombreDeSoumission = 0;
const typeVehicule = {
    ecologique: ['Vitres électriques', 'Filets dans le coffre', 'Batterie longue durée'],
    sport: ['Toit ouvrant', 'Mags', 'Vitres teintées', 'Système de son Bose', 'Aileron'],
    vus: ['Coffre électrique', 'Porte électrique']
}
let checkboxList = document.getElementById("checkbox-list");
const OPTION_MIN = 2;
const OPTION_MAX = 3;




formulaire.addEventListener("submit", validerFormulaire);
creerListeOptions()


// Appeler lors de la soumission du formulaire
function validerFormulaire(e) {
  let validation = true;
  for (const caracteristique of champsCaracteristiques) {
    validation = validation && REGEX_NOMBRE.test(caracteristique.value);
  }

  let options = document.querySelectorAll('input[type=checkbox]');
  let nbOptionCoche = 0; 
  for(let checkbox of options ){
    if(checkbox.checked){
      nbOptionCoche += 1;
    }
  }

  // Verification du nombre d'option coché
  if(nbOptionCoche >= OPTION_MIN && nbOptionCoche <= OPTION_MAX){
    validation = validation && true;
  } else{
    validation = validation && false;
  }

  // nombre de soumission est incrementé
  nombreDeSoumission += 1;

  // valeur saisir incorrect, la soumission est bloqué
  if (validation) {
    let objVehicule = {}

    // caractéristiques
    for (const caracteristique of champsCaracteristiques) {
      objVehicule[caracteristique.name] = caracteristique.value
    }

    // Options
    objVehicule['option'] = []
    for (const checkbox of options) {
      if(checkbox.checked){
        objVehicule['option'].push(checkbox.value)
      }
    }

    // stocker l'objet dans le localstorage
    let objVehiculeJSON = JSON.stringify(objVehicule);
    localStorage.setItem('vehicule', objVehiculeJSON);
  }else{
    e.preventDefault();

    // Les event sont ajouté lors de la premiere soumission
    if (nombreDeSoumission === 1) {
      for (const caracteristique of champsCaracteristiques) {
        verifierValeurCarac(caracteristique);
        caracteristique.addEventListener("input", validerChamp);
      }

      // Verifie le nombre d'option cochés
      verifierCheckbox()
      for (const checkbox of options) {
        checkbox.addEventListener("change", verifierCheckbox);
      }
    } 
  }
}

// Valide le champs de chaque caractéristiques
function validerChamp(e) {
  verifierValeurCarac(e.target);
}

// Verifie que chaque caractéristiques est entre 5 ou 15
function verifierValeurCarac(e) {
  if (REGEX_NOMBRE.test(e.value)) {
    let valeur = parseFloat(e.value);
    if (valeur >= 5 && valeur <= 15) {
      e.classList.remove("border-danger");

      // Ajout d'une bordure verte, lorsque border-sucess n'est pas present
      if (!e.classList.contains("border-success")) {
        if(document.getElementById(`text-${e.id}`) !== null){
          document.getElementById(`text-${e.id}`).remove();
        }
        e.classList.add("border-success");
      }
    } else {
      e.classList.remove("border-success");
      // Ajout d'une bordure verte, lorsque border-danger n'est pas present
      if (!e.classList.contains("border-danger")) {
        e.classList.add("border-danger");
      }

      // suppression du message d'erreur
      if (document.getElementById(`text-${e.id}`) === null) {
        let paragraphe = document.createElement("p");
        paragraphe.innerText = "La valeur doit être entre 5 et 15";
        paragraphe.classList.add("text-danger");
        paragraphe.setAttribute("id", `text-${e.id}`);
        e.after(paragraphe);
      }
    }
  } else {
    e.classList.remove("border-success");
    // Ajout d'une bordure verte, lorsque border-danger n'est pas present
    if (!e.classList.contains("border-danger")) {
      e.classList.add("border-danger");
    }

    // message d'erreur
    if (document.getElementById(`text-${e.id}`) === null) {
      let paragraphe = document.createElement("p");
      paragraphe.innerText = "La valeur doit être entre 5 et 15";
      paragraphe.classList.add("text-danger");
      paragraphe.setAttribute("id", `text-${e.id}`);
      e.after(paragraphe);
    }
  }

  // verifie la somme des caractéristiques
  calculerSommeDesCarac()

}

// Verifie la somme des caracteristiques doit etre 50
function calculerSommeDesCarac() {
  let somme = 0;
  for (const caracteristique of champsCaracteristiques) {
    let correct = REGEX_NOMBRE.test(caracteristique.value);
    if (correct) {
      let valeur = parseFloat(caracteristique.value);
      somme += valeur;
    }
  }

  if (somme !== 50) {
    if (document.getElementById(`text-somme`) === null) {
      let paragraphe = document.createElement("p");
      paragraphe.innerText = "La somme des caractéristiques doit faire 50";
      paragraphe.classList.add("text-danger");
      paragraphe.setAttribute("id", `text-somme`);
      boutonSoumettre.before(paragraphe);
    }
  } else{
    if (document.getElementById(`text-somme`) !== null) {
        document.getElementById(`text-somme`).remove()
      }
  }
}

// créer la liste des checkbox
function creerListeOptions(){
  let objInfoJSON = localStorage.getItem('info');
  let objInfo = JSON.parse(objInfoJSON);
  let option = objInfo["typeDeVehicule"];
  for(let index in typeVehicule[option]){
    let id = `${option}-${index}`
    let value = typeVehicule[option][index]
    creerUneOption(id, value)
  }
}

// créer une checkbox
function creerUneOption(id, value) {
  let column = document.createElement('div');
  column.setAttribute('class', 'col-12 col-md-3 mt-3 mt-md-0 mb-3');

  let formCheck = document.createElement('div');
  formCheck.setAttribute('class', 'form-check');

  let input = document.createElement('input')
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', id)
  input.setAttribute('id', id)
  input.setAttribute('value', value)
  input.setAttribute('class', 'form-check-input')

  let label = document.createElement('label')
  label.setAttribute('class', 'form-check-label')
  label.setAttribute('for', id)
  label.setAttribute('id', `text-${id}`)
  label.innerText = value

  formCheck.appendChild(input)
  formCheck.appendChild(label)
  column.appendChild(formCheck)


  checkboxList.append(column)
}


// Verifie que 2 ou 3 checkbox sont coché au max
function verifierCheckbox(){
  let options = document.querySelectorAll('input[type=checkbox]');
  let nbOptionCoche = 0; 
  for(let checkbox of options ){
    if(checkbox.checked){
      nbOptionCoche += 1;
    }
  }

  // Verification du nombre d'option coché
  if(nbOptionCoche >= OPTION_MIN && nbOptionCoche <= OPTION_MAX){
    if (document.getElementById(`text-option`) !== null){
      document.getElementById(`text-option`).remove()
    }

    for(let checkbox of options ){
      let message = document.getElementById(`text-${checkbox.id}`)
      if(message.classList.contains('text-danger')){
        message.classList.remove('text-danger');
      }
    }

  } 
  else{

    for(let checkbox of options ){
      // Les checkbox pas coché sont en rouge
      if(!checkbox.checked){
        let message = document.getElementById(`text-${checkbox.id}`)
        message.classList.add('text-danger');
      }
    }

    if (document.getElementById(`text-option`) === null){
      let paragraphe = document.createElement("p");
      paragraphe.innerText = "Cocher 2 ou 3 options";
      paragraphe.classList.add("text-danger");
      paragraphe.setAttribute("id", `text-option`);
      boutonSoumettre.before(paragraphe);
    }
  }
}
