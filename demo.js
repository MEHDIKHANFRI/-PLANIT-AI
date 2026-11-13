const demoBTN = document.querySelector("#demoBtn");

demoBTN.addEventListener("click", async() =>{
    try{
        const response = await fetch("demo.json");
        if(!response.ok){
            throw new Error("Impossible de charger le fichier demo.");
        }
        const projet = await response.json();
        
        localStorage.setItem("demoProjet", JSON.stringify(projet));
        window.location.href = "project.html";
    } catch (error){
        alert("Une erreur est survenue lors du chargement du mode demo.");
    }
});