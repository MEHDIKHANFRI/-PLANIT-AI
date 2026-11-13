const donneDemo = localStorage.getItem("demoProjet");

try{
    const projet = JSON.parse(donneDemo);

    for( const task of projet.tasks){
        let ligne;

        if(task.status === "To Do"){
            ligne = document.querySelector("#aFaire");
        }else if(task.status === "In Progress"){
            ligne = document.querySelector("#encours");
        }else if(task.status === "Done"){
            ligne = document.querySelector("#terminer");
        }

        const div = document.createElement("div");
        div.className = "bg-white rounded-[10px] p-3 mt-4";

        const titre = document.createElement("h3");
        titre.className = "font-bold text-black";
        titre.textContent = task.title;

        const description = document.createElement("p");
        description.className = "text-gray-500 mt-2";
        description.textContent = task.description;
        div.append(titre, description);
        ligne.appendChild(div);

    };
} catch(error) {
    alert("Impossible d'afficher les données du mode demo.");
};