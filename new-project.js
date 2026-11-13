
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
         try{
            const response = await fetch ("ht",{
            
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projet)
            
         });
         if(!response.ok){
            throw new Error(""):
         }
        alert("Projet enregistré !");
        window.location.href = "index.html";
        } catch (error){
            alert(error.message);
        }finally{
            btnSubmit.disabled = !validation.isValid();
        }
    
});