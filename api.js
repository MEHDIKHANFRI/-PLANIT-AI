import { MODELE, API_URL } from "./ai.js"


export async function callAI(textePrompt){
    const cleAPI = sessionStorage.getItem("cleAPI");

    if(!cleAPI){
        throw new Error("Enregistrez votre clé API dans les paramètres.");
    }
    const response= await fetch(API_URL,{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "x-goog-api-key" : cleAPI
        },
        body : JSON.stringify({
            contents : [
                {
                    parts : [{ text : textePrompt}]
                }
            ],
            generationConfig : {
                responseMimeType: "application/json"
            }
        })  
    });
        if (!response.ok) {
            throw new Error("Impossible de générer le plan.");
            }
            const resultat = await response.json();
            const texte = resultat.candidates[0].content.parts[0].text;
    return JSON.parse(texte);
}