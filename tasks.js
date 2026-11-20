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

    const supprimerTask = document.querySelector("#SuprimerTask");

    supprimerTask.addEventListener("click", e=> {
        if (!confirm("Voulez-vous supprimer cette tâche ?")) {
            return;
        }

        const idTask = document.querySelector("#taskId").textContent;
        let projets = [];
        let projetREF;

        if (option === "demo") {
            projetREF = JSON.parse(localStorage.getItem("demoProjet"));
        } else {
            projets = JSON.parse(localStorage.getItem("projetsUtilisateur") || "[]");

            for (const element of projets) {
                if (element.id === projet.id) {
                    projetREF = element;
                }
            }
        }
        for (let i = 0; i < projetREF.tasks.length; i++) {
            if (projetREF.tasks[i].id === idTask) {
                projetREF.tasks.splice(i, 1);
                break;
            }
        }
        for (const task of projetREF.tasks) {
            const position = task.dependencies.indexOf(idTask);
            if (position !== -1) {
                task.dependencies.splice(position, 1);
            }
        }
        if (option === "demo") {
            localStorage.setItem("demoProjet", JSON.stringify(projetREF));
        } else {
            localStorage.setItem("projetsUtilisateur", JSON.stringify(projets));
        }

        window.location.reload();
    });

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
        div.dataset.id = task.id;

        const titre = document.createElement("h3");
        titre.className = "font-bold text-black";
        titre.textContent = task.title;

        const description = document.createElement("p");
        description.className = "text-gray-500 mt-2";
        description.textContent = task.description;
        div.append(titre, description);
        ligne.appendChild(div);


        div.addEventListener("click", e => {
            const taskTitre = document.querySelector("#taskTitre");
            taskTitre.textContent = task.title;
            const taskDescription = document.querySelector("#taskDescription")
            taskDescription.textContent = task.description
            const taskId = document.querySelector("#taskId")
            taskId.textContent = task.id
            const taskPriorite = document.querySelector("#taskPriorite")
            taskPriorite.textContent= task.priority;
            const taskImportance = document.querySelector("#taskImportance");
            taskImportance.textContent=task.importance;
            const taskTaille = document.querySelector("#taskTaille")
            taskTaille.textContent = task.size;
            const taskDeadline = document.querySelector("#taskDeadline")
            taskDeadline.textContent= task.deadline;

            let statut = "To Do";
            if(div.parentElement.id == "encours"){
                statut = "In Progress";
            }else if(div.parentElement.id == "terminer"){
                statut = "Done";
            }
            const taskStatut = document.querySelector("#taskStatut");
            taskStatut.textContent= statut;

            const taskDialogue = document.querySelector("#taskDialogue");
            taskDialogue.showModal();
        })

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