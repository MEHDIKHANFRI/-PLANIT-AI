
formulaire.addEventListener("submit" , e=>{
    e.preventDefault();
    if(validation.validate()){
        let projets = [];
        const data = localStorage.getItem("projets");
        if(data != null){
            projets = JSON.parse(data);
        }
        const projet = {
            id : projets.length + 1,
            nom : document.querySelector("#Nom").value.trim(),
            description : document.querySelector("#description").value.trim(),
            brief : document.querySelector("#Brief").value.trim(),
            duree: Number(document.querySelector("#duree").value),
            developpeurs : Number(document.querySelector("#developpeurs").value),
            technologies : document.querySelector("#technologies").value.trim(),
            difficulty : document.querySelector("#difficulty").value,
            tasks : []
        };
        
        projets.push(projet);
        localStorage.setItem("projets", JSON.stringify(projets));
        alert("Projet enregistré !");
        window.location.href = "index.html";
    }
});