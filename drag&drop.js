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
            
            const targetCarte = e.target.closest(".carte");
            if(targetCarte != taskGlisse){
                colonne.insertBefore(taskGlisse,targetCarte);
            }else{
                colonne.appendChild(taskGlisse);
            }
            actualiserCompteurs();
        });
    }

}