import "./dialog.js";

async function MAIN() {
    try{
        if(document.querySelector("#validationForm")){
            await import ("./demo.js");
            await import ("./new-project.js");
        }

        if(document.querySelector("#aFaire")){
            await import ("./tasks.js");
        }
    } catch (error){
        alert("Impossible de charger les fonctionnalités de la page.")
    }
    
}
MAIN();