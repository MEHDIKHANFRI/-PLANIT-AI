export function actualiserCompteurs() {
    const aFaire = document.querySelectorAll("#aFaire .carte").length;
    const enCours = document.querySelectorAll("#encours .carte").length;
    const terminer = document.querySelectorAll("#terminer .carte").length;

    const totalTask = document.querySelector("#totalTask");
    totalTask.textContent = aFaire + enCours + terminer;

    const faireTask = document.querySelector("#faireTask");
    faireTask.textContent = aFaire;

    const enCoursTask = document.querySelector("#enCoursTask");
    enCoursTask.textContent = enCours;

    const terminerTask = document.querySelector("#terminerTask");
    terminerTask.textContent = terminer;
}