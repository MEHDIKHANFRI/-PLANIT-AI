import { actualiserCompteurs } from "./details.js";

export function dragDrop(){
    let taskGlisse = null;

    const cartes = document.querySelectorAll(".carte");
    const aFaire = document.querySelector("#aFaire");
    const enCours = document.querySelector("#encours");
    const terminer = document.querySelector("#terminer");

    const colonnes = [aFaire,enCours,terminer];
    for(const carte of cartes){
        carte.draggable = true;
        carte.addEventListener("dragstart", e=>{
            taskGlisse = carte;
        });
        carte.addEventListener("dragend", e=>{
            taskGlisse = null;
        })
    }
    for(const colonne of colonnes){
        colonne.addEventListener("dragover", e=>{
            e.preventDefault();
        })
        colonne.addEventListener("drop", e=>{
            e.preventDefault();
            
            let statut;
            if(colonne.id =="aFaire"){
                statut = "To Do";
            }else if (colonne.id == "encours"){
                statut = "In Progress"
            }else if(colonne.id == "terminer"){
                statut = "Done";
            }
            try{
                status(taskGlisse.dataset.id, statut);
                const target = e.target.closest(".carte");
                if(target != taskGlisse){
                    colonne.insertBefore(taskGlisse, target);
                }else if(!target){
                    colonne.appendChild(taskGlisse);
                }
                actualiserCompteurs();

            }catch (error){
                alert(error.message);
            }
        });
    }

}
function status(id , statut){
    const option = sessionStorage.getItem("optionAffichage");

    let projets = [];
    let projet;
    if(option=="demo"){
        projet = JSON.parse(localStorage.getItem("demoProjet"));
    }else{
        const idProjet = Number(sessionStorage.getItem("projetSelectionne"));

        projets = JSON.parse(localStorage.getItem("projetsUtilisateur") || "[]");
        for(const element of projets){
            if(element.id == idProjet){
                projet = element;
            }
        }
    }
    if(!projet){
        throw new Error("Projet introuvable.")
    }
    for(const task of projet.tasks){
        if(task.id == id){
            task.status = statut;
        }
    }
    if(option =="demo"){
        localStorage.setItem("demoProjet", JSON.stringify(projet));
    }else{
        localStorage.setItem("projetsUtilisateur",JSON.stringify(projets))
    }
}