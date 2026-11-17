export function parametres (){
    const input = document.querySelector("#token");
    const enrg = document.querySelector("#enregistrerBtn");

    input.value = sessionStorage.getItem("cleAPI");
    enrg.addEventListener("click", ()=>{
        sessionStorage.setItem("cleAPI", input.value.trim());
        document.querySelector("#settingDialogue").close();
    })
}