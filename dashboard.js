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

    const carte = carteProjet.cloneNode(true);// Chaque projet nouvelle carte.


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

        const ouvrir = carte.querySelector("#Ouvrirbtn");
        ouvrir.addEventListener("click", e =>{
            sessionStorage.setItem("optionAffichage" , "projet");
            sessionStorage.setItem("projetSelectionne", projet.id);
        });

        let progres = 0;
        if(projet.tasks.length > 0){
            progres = Math.round((terminer/projet.tasks.length)*100);
        }
        const width = carte.querySelector(".progress");
        width.style.width = progres + "%";
        width.title = progres + "%";
        

        const suprimer = carte.querySelector("#Supprimer");
        suprimer.addEventListener("click", e =>{
            const confirmation = confirm("Voulez-vous supprimer ce projet ?");
            if(!confirmation){
                return;
            }

            const position = projets.indexOf(projet);
            projets.splice(position, 1);
            localStorage.setItem("projetsUtilisateur", JSON.stringify(projets));

            window.location.reload();
        })

        projetUtilisateur.appendChild(carte);
        }

        aucunProjet.classList.add("hidden");
        projetUtilisateur.classList.remove ("hidden");
    }