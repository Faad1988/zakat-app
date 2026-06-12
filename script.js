const QuantiteEmises = document.querySelectorAll(".QuantiteEmise");
const kilos = document.querySelectorAll(".kg");
const buttons = document.querySelectorAll(".btn-reduct");
const table = document.querySelector(".table");
const rest = document.querySelector(".rest");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const conteneur = button.closest(".al-fitr");
    const reduire = conteneur.querySelector(".btn-reduct");
    table.classList.toggle("active");
    if (!table) {
      rest.classList.add("activ");
    }
  });
});

QuantiteEmises.forEach((champ) => {
  champ.addEventListener("input", () => {
    const ligne = champ.closest("tr");
    if (!ligne) return;

    const quantiteRequiseElem = ligne.querySelector(".QuantitéRequise");
    const quantiteRequise = parseFloat(quantiteRequiseElem.textContent) || 0;

    // Récupérer la valeur saisie
    const quantiteEmise = parseFloat(champ.value) || 0;

    // Calculer le nombre de personnes
    let nbPersonnes = 0;
    if (quantiteRequise > 0) {
      nbPersonnes = quantiteEmise / quantiteRequise;
    }

    if (quantiteRequise === 0) return;

    // Arrondir à l'unité inférieure (ou garder 2 décimales si tu préfères)
    const nbPersonnesEntier = Math.floor(nbPersonnes);

    // Afficher le résultat dans la cellule .resultat de la même ligne
    const resultatElem = ligne.querySelector(".resultat");
    if (resultatElem) {
      resultatElem.textContent = nbPersonnesEntier;

      if (nbPersonnesEntier < 1) {
        resultatElem.textContent = "quantité insuffisante";
        resultatElem.style.fontSize = "16px";
      } else {
        resultatElem.textContent = nbPersonnesEntier;
        resultatElem.style.fontSize = "";
      }
    }

    const convKggr = (quantiteEmise) => quantiteEmise / 1000;
    const resultatKilo = convKggr(quantiteEmise);

    const kiloConv = ligne.querySelector(".kg");

    kiloConv.innerHTML = resultatKilo.toFixed(3);
  });
});
