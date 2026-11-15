import "./dialog.js";

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
            }
        }
    } catch (error){
        alert("Impossible de charger les fonctionnalités de la page.")
    }
    
}
MAIN();