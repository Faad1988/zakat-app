const QuantiteEmises = document.querySelectorAll(".QuantiteEmise");
const kilos = document.querySelectorAll(".kg");
const buttons = document.querySelectorAll(".btn-reduct");
const table = document.querySelector(".table");
const rest = document.querySelector(".rest");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const container = button.closest(".al-fitr, .al-maal");
    if (!container) return;
    const table = container.querySelector(".table");
    if (table) {
      table.classList.toggle("active");
      button.textContent = table.classList.contains("active") ? "+" : "-";
    }
  });
});

QuantiteEmises.forEach((champ) => {
  champ.addEventListener("input", () => {
    const ligne = champ.closest("tr");
    if (!ligne) return;
    const kiloConv = ligne.querySelector(".kg");
    const resultatElem = ligne.querySelector(".resultat");
    const quantiteRequiseElem = ligne.querySelector(".QuantitéRequise");
    const quantiteRequise = parseFloat(quantiteRequiseElem.textContent) || 0;

    // Récupérer la valeur saisie
    const quantiteEmise = parseFloat(champ.value) || 0;

    if (isNaN(quantiteEmise) || quantiteEmise === 0) {
      const resultatElem = ligne.querySelector(".resultat");
      const kiloConv = ligne.querySelector(".kg");
      if (resultatElem) resultatElem.textContent = "";
      if (kiloConv) kiloConv.textContent = "";
      return;
    }

    // Calculer le nombre de personnes
    let nbPersonnes = 0;
    if (quantiteRequise > 0) {
      nbPersonnes = quantiteEmise / quantiteRequise;
    }

    if (quantiteRequise === 0) return;

    // Arrondir à l'unité inférieure (ou garder 2 décimales si tu préfères)
    const nbPersonnesEntier = Math.floor(nbPersonnes);

    // Afficher le résultat dans la cellule .resultat de la même ligne

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

    kiloConv.innerHTML = resultatKilo.toFixed(3);
  });
});
