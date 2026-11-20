export async function dialogueTask(){
    const dialogue = document.querySelector("#taskDialogue");
    const fermer = document.querySelector("#fermerTask")

    fermer.addEventListener("click" , e=>{
        dialogue.close();
    })

}