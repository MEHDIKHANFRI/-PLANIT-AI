import { actualiserCompteurs } from "./details.js";

const donneDemo = localStorage.getItem("demoProjet");

try{
    let projet;
    const option = sessionStorage.getItem("optionAffichage");

    if(option=="demo"){
        projet = JSON.parse(localStorage.getItem("demoProjet"));
    } else if (option == "projet"){
        const id = Number(sessionStorage.getItem("projetSelectionne"));

        const projets = JSON.parse(localStorage.getItem("projetsUtilisateur") || "[]")
        for(const element of projets){
            if(element.id == id){
                projet = element;
                break;
            }
        }
    }
    if(!projet){
        throw new Error("Selectionnez un projet depuis le dashboard.");
    }

        let aFaire = 0;
        let enCours = 0;
        let terminer = 0;

    for( const task of projet.tasks){
        let ligne;
    
        if(task.status === "To Do"){
            ligne = document.querySelector("#aFaire");
            aFaire++;
        }else if(task.status === "In Progress"){
            ligne = document.querySelector("#encours");
            enCours++;
        }else if(task.status === "Done"){
            ligne = document.querySelector("#terminer");
            terminer++;
        }

        const div = document.createElement("div");
        div.className = "carte bg-white rounded-[10px] p-3 mt-4";

        const titre = document.createElement("h3");
        titre.className = "font-bold text-black";
        titre.textContent = task.title;

        const description = document.createElement("p");
        description.className = "text-gray-500 mt-2";
        description.textContent = task.description;
        div.append(titre, description);
        ligne.appendChild(div);

    };
    actualiserCompteurs();
    
        const totalTask =document.querySelector("#totalTask");
        totalTask.textContent=projet.tasks.length;
        const faireTask = document.querySelector("#faireTask");
        faireTask.textContent = aFaire;
        const enCoursTask = document.querySelector("#enCoursTask");
        enCoursTask.textContent = enCours;
        const terminerTask = document.querySelector("#terminerTask");
        terminerTask.textContent = terminer;
} catch(error) {
    alert(error.message);
}