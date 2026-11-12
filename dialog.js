const parametres = document.querySelectorAll(".parametres");
const dialogue = document.querySelector("#settingDialogue");
const fermer = document.querySelector("#fermer");
const anulerBTn = document.querySelector("#anulerBTn");


parametres.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        dialogue.showModal();
    });
});

fermer.addEventListener("click", () => {
    dialogue.close();
});

anulerBTn.addEventListener("click", () => {
    dialogue.close();
});