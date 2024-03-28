"use strict"

//Premiere validation du formulaire
let formulaire = document.getElementById('form1');
formulaire.addEventListener('submit', validerFormulaire);

//Enregistrer les données dans le localStorage
formulaire.addEventListener('submit', enregistrerDonnee);

//Récupération de tout les champs input
let prenom = document.getElementById('validationCustom01');
let nom = document.getElementById('validationCustom02');
let typeVehicule = document.getElementById('validationCustom03');
let couleur = document.getElementById('validationCustom04');
let grosseur = document.getElementById('customRange05')
let blnerreur = false;

//Remplir le champs couleur en fonction du type de véhicule choisi
typeVehicule.addEventListener('change', remplirCouleur);


//Deuxième vérification de chaque champs du formulaire après correction des erreurs 
let tableauInput = document.querySelectorAll('input[type = "text"]');

for(let i =0 ; i < tableauInput.length; i++){
    tableauInput[i].addEventListener('change', verifierCorrection)
}

typeVehicule.addEventListener('change', verifierCorrection);
couleur.addEventListener('change', verifierCorrection)


//--------------------------------------------LES FONCTIONS-------------------------------------------

//remplirCouleur sert à ajouter les couleurs de voiture selon le type de vehicule choisi par le client
function remplirCouleur(){
    let couleur1 = document.createElement('option')
    let couleur2 = document.createElement('option')
    let couleur3 = document.createElement('option')
    switch(typeVehicule.value){
        
        case "1":
            console.log(typeVehicule.value)
            while(couleur.options.length > 0){
                couleur.remove(0);
            }
           
            couleur1.textContent = "Bleu";
            couleur2.textContent = "Noir";
            couleur3.textContent = "Rouge";

            couleur.appendChild(couleur1);
            couleur.appendChild(couleur2);
            couleur.appendChild(couleur3);
            break;
        case "2":
            console.log(typeVehicule.value)
            while(couleur.options.length > 0){
                couleur.remove(0);
            }

            couleur1.textContent = "Orange";
            couleur2.textContent = "Marron";
            couleur3.textContent = "Moov";
           
            couleur.appendChild(couleur1);
            couleur.appendChild(couleur2);
            couleur.appendChild(couleur3);
            break;
        case "3":
            console.log(typeVehicule.value)
            while(couleur.options.length > 0){
                couleur.remove(0);
            }

            couleur1.textContent = "Verte";
            couleur2.textContent = "Blanche";
            couleur3.textContent = "Jaune";
           
            couleur.appendChild(couleur1);
            couleur.appendChild(couleur2);
            couleur.appendChild(couleur3);  
    }     
}

//Verififie si un champs du formulaire est vide, si oui elle le mets en rouge et affiche un message au client
function validerFormulaire(e){
    
    if(prenom.value == ""){
        blnerreur = true;
        prenom.style.borderColor = "red"
        const paragrapheErreur = document.createElement('p');
        paragrapheErreur.style.color = "red"
        paragrapheErreur.innerText = "Le prénom est obligatoire.";
        let champPrenom = document.getElementById('zonePrenom');
        champPrenom.append(paragrapheErreur);
       
    }
    if(nom.value == ""){
        blnerreur = true;
        nom.style.borderColor = "red"
        const paragrapheErreurNom = document.createElement('p');
        paragrapheErreurNom.style.color = "red"
        paragrapheErreurNom.innerText = "Le nom est obligatoire.";
        let champNom = document.getElementById('zoneNom');
        champNom.append(paragrapheErreurNom);
     
    }

    if(typeVehicule.value == ""){
        blnerreur = true;
        typeVehicule.style.borderColor = "red"
        const paragrapheErreurType = document.createElement('p');
        paragrapheErreurType.style.color = "red"
        paragrapheErreurType.innerText = "Veuillez choisir un Type de véhicule.";
        let champType = document.getElementById('zoneType');
        champType.append(paragrapheErreurType);
       
    }

    if(couleur.value == ""){
        blnerreur = true;
        couleur.style.borderColor = "red"
        const paragrapheErreurCouleur = document.createElement('p');
        paragrapheErreurCouleur.style.color = "red"
        paragrapheErreurCouleur.innerText = "Veuillez choisir une couleur.";
        let champCouleur = document.getElementById('zoneCouleur');
        champCouleur.append(paragrapheErreurCouleur);
      
    }

    if(blnerreur == true){
        e.preventDefault();
    }
  
}

//Verifie si un champs correctement remplir, si oui elle mets le champs en vert pour indiquer qu'il est bien remplir
function verifierCorrection(e){
    if(e.target.value != ""){
        blnerreur = false;
        e.target.style.borderColor = "green"
        if(e.target.parentNode.querySelector('p')){
            const refParagrapheSuivant = e.target.parentNode.querySelector('p')
            refParagrapheSuivant.remove() 
        }
    }
}

//Permet d'effectuer le stockage des informations entrées par le client dans la memoire local
function enregistrerDonnee(){
    if(blnerreur === false){
        //Stockage des données dans le locolstorage
     const ObjetJSON_index = {
        "Prenom" : prenom.value,
        "Nom" : nom.value,
        "Type de vehicule" : typeVehicule.options[typeVehicule.selectedIndex].textContent,
        "Couleur" : couleur.options[couleur.selectedIndex].textContent,
        "Grosseur des Roues" : grosseur.value
    }
    const strObjetJSON_index = JSON.stringify(ObjetJSON_index);
    localStorage.setItem("Premiere_page", strObjetJSON_index)
    }

     
}



