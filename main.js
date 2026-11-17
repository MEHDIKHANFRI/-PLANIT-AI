import "./dialog.js";
import { dragDrop } from "./drag&drop.js";
import { parametres } from "./settings.js";

async function MAIN() {
    try{
        if(document.querySelector("#validationForm")){
            await import ("./demo.js");
            await import ("./new-project.js");
        }

        const search = new URLSearchParams(window.location.search);
        if(document.querySelector("#aFaire")){
            if(search.get("mode") == "demo"){
            await import ("./tasks.js");
            dragDrop();
            }
        
        }
    } catch (error){
        alert("Impossible de charger les fonctionnalités de la page.")
    }
    
}
parametres();
MAIN();