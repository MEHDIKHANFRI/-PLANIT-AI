import "./dialog.js";
import { dragDrop } from "./drag&drop.js";
import { parametres } from "./settings.js";
import { afficherProjet } from "./dashboard.js";
async function MAIN() {
    try{
        parametres();
        if (document.querySelector("#projetsUtilisateur")) {
            afficherProjet();
        }
        if(document.querySelector("#validationForm")){
            await import ("./demo.js");
            await import ("./new-project.js");
        }

        if(document.querySelector("#aFaire")){
            await import ("./tasks.js");
            dragDrop();
        }
        
        
    } catch (error){
        alert("Impossible de charger les fonctionnalités de la page.")
    }
    
}

MAIN();