export function afficherProjet(){

    const projets = JSON.parse(localStorage.getItem("projetsUtilisateur") || "[]");


    const aucunProjet = document.querySelector("#aucunProjet");
    const projetUtilisateur = document.querySelector("#projetsUtilisateur");

    if(projets.length == 0){
        aucunProjet.classList.remove("hidden");
        projetUtilisateur.classList.add("hidden");
        return;
    }
    
    const carteProjet = projetUtilisateur.firstElementChild;
    projetUtilisateur.innerHTML="";

    for(const projet of projets){

    const carte = carteProjet.cloneNode(true);// Chaque projet aura sa propre carte.


        let terminer = 0 ;

        for(const task of projet.tasks){
            if(task.status == "Done"){
                terminer++;
            }
        }
        const nom = carte.querySelector("#nomProjet");
        nom.textContent = projet.nom;

        const description = carte.querySelector("#descriptionProjet");
        description.textContent = projet.description;

        const total = carte.querySelector("#Total");
        total.textContent = projet.tasks.length;

        const terminee = carte.querySelector("#Terminees");
        terminee.textContent = terminer;

        const restantes = carte.querySelector("#Restantes");
        restantes.textContent = projet.tasks.length - terminer;


        
        for (const element of carte.querySelectorAll("[id]")) {
            element.removeAttribute("id");
        }// Eviter de répéter les mêmes IDs dans les cartes.

        projetUtilisateur.appendChild(carte);
        }

        aucunProjet.classList.add("hidden");
        projetUtilisateur.classList.remove ("hidden");
}

