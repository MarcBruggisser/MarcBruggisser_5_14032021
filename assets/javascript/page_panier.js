/* Sur la page panier */
if(main.classList.contains('page-panier')){

  function creerParagrapheErreur() {
    let paragrapheErreur = document.createElement("p");
    paragrapheErreur.classList.add('paragraphe-erreur');  
    paragrapheErreur.textContent = "Il n'y a pour l'instant aucun produit à l'intérieur de votre panier.";
    section.appendChild(paragrapheErreur);
  }

  /* Si la section ne contient pas de produit, alors on empêche l'envoie du formulaire */
  function empecherEnvoiFormulaire() {
    let boutonFormulaireEnvoi = document.querySelector(".submit");
    let inputsFormulaire = document.querySelectorAll("form input");
    for (all of inputsFormulaire) {
      all.style.background = "#C0C0C0";
      all.setAttribute("disabled", "disabled");
    }
    boutonFormulaireEnvoi.addEventListener("click", function (event){
      event.preventDefault();
    });
  }

  /* On récupère l'élément section */
  let section = document.querySelector('section');
  
  /* Récupérer les données présentes à l'intérieur du localStorage */
  let panier = JSON.parse(localStorage.getItem("panier"));

  /* Si il y a des valeurs à l'intérieur du panier : pour chaque objet présent à l'intérieur du localStorage */
  if(panier != null){
    for (all of panier){
      /* On crée un nouvel article */
      let newArticle = document.createElement("article");
      /* On crée une balise pour y stocker le nom de l'article */
      newArticle.innerHTML = `<h2>${all.name}</h2><span class="montant">${all.price} €</span><input class="quantite" type="number" value="1" /><span class="total">${all.price} €</span><button class="supprimer">Supprimer</button>`;
      /* On crée un select HTML pour que l'utilisateur puisse choisir la quantité d'appareil qu'il veut */
      // document.createElement("select")

      /* On place notre article à l'intérieur de notre section */
      section.appendChild(newArticle);
    }
  }
  /* A l'inverse, si le panier est vide, on indique un message à l'utilisateur + on bloque l'envoie du formulaire */
  else {
    creerParagrapheErreur();
    empecherEnvoiFormulaire();
  }
  
  /* Modifier le prix d'une ligne si on augmente la quantité du produit voulu : */
  let quantite = document.querySelectorAll(".quantite");
  for (all of quantite){
    all.addEventListener("click", function(e){
      /* On récupère la valeur de l'input */
      let valeurInput = e.target.value;
      /* On récupère le span indiquant le total */
      let spanMontantArticle = e.target.parentNode.querySelector(".montant");
      /* On récupère le textContent de ce span */
      let spanValeurMontantArticle = spanMontantArticle.textContent.slice(0, -2);
      let montantTotalArticle = parseInt(spanValeurMontantArticle) * valeurInput;
      let spanTotalArticle = e.target.parentNode.querySelector(".total");
      spanTotalArticle.textContent = montantTotalArticle + " €";
    });
  }

  /* Supprimer un produit du panier : */

  /* On récupère les boutons supprimer */
  let supprimerProduit = document.querySelectorAll('.supprimer');

  for (all of supprimerProduit){
    all.addEventListener("click", function(e){
      /* On supprime le produit du localStorage pour ne pas qu'il soit réaffiché si l'utilisateur rafraîchit la page */

      /* On récupère le nom du produit dans la balise article */
      let titreArticle = e.target.parentNode.querySelector("h2").textContent;
      /* On boucle sur les entrées du tableau panier */
      for(all of panier){
        /* Si la valeur de la variable titreArticle (récupérée plus haut) match celle d'un élément du tableau, alors : */
        if(titreArticle === all.name){
          /* On retire uniquement cette entrée du tableau */
          panier.splice(all, 1);
          /* On envoie la nouvelle valeur du tableau dans le localStorage (pour ne pas que le produit se réaffiche au moment d'actualiser la page) */
          localStorage.setItem("panier", JSON.stringify(panier));
          /* Si le panier est vide, alors on supprime le panier stocké dans le localStorage + on indique à l'utilisateur sur la page que son panier est vide */
          if(panier.length === 0){
            localStorage.removeItem("panier");
            creerParagrapheErreur();
            empecherEnvoiFormulaire();
          }
        }
      }

      
      /* On supprime l'article produit de la page panier */
      e.target.parentNode.remove();
    });
  }

  
}