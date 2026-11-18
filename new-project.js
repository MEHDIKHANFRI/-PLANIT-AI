import { formulaire,btnSubmit,validation } from "./validation.js";
import { prompt } from "./prompt.js";
import { callAI } from "./api.js";

formulaire.addEventListener("submit" , async e=>{
    e.preventDefault();
    if(!validation.validate()){
        return;
        }
        
        const projet = {
            nom : document.querySelector("#Nom").value.trim(),
            description : document.querySelector("#description").value.trim(),
            brief : document.querySelector("#Brief").value.trim(),
            duree: Number(document.querySelector("#duree").value),
            developpeurs : Number(document.querySelector("#developpeurs").value),
            technologies : document.querySelector("#technologies").value.trim(),
            difficulty : document.querySelector("#difficulty").value,
            tasks : []
        };
        
         btnSubmit.disabled = true;
         btnSubmit.textContent = "Generation en cours ...";
         try{
            const textePrompt = prompt(projet);
            const plan = await callAI(textePrompt);
            alert("Plan generer avec succés! ");
            console.log(plan);
            
         } catch (error){
            alert(error.message);
        }finally{
            btnSubmit.disabled = !validation.isValid();
            btnSubmit.textContent = "Générer le plan de développement" ;
        }
    
});