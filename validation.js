const formulaire = document.querySelector("#validationForm");
const btnSubmit = document.querySelector("#btnSubmit");

const validation = $(formulaire).parsley();

function verification (){
    const valide = validation.isValid();
    btnSubmit.disabled = !valide;
}
formulaire.addEventListener("input", verification);
formulaire.addEventListener("change", verification);

verification();