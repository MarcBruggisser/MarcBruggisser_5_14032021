/* Sur la page panier */
if(main.classList.contains('page-panier')){

  let boutonFormulaireEnvoi = document.querySelector(".submit");
  let inputsFormulaire = document.querySelectorAll("form input.champ");

  function creerParagrapheErreur() {
    let paragrapheErreur = document.createElement("p");
    paragrapheErreur.classList.add('paragraphe-erreur');  
    paragrapheErreur.textContent = "Il n'y a pour l'instant aucun produit à l'intérieur de votre panier.";
    section.appendChild(paragrapheErreur);
  }

  /* Si la section ne contient pas de produit, alors on empêche l'envoie du formulaire */
  function empecherEnvoiFormulaire() {
    
    for (all of inputsFormulaire) {
      all.style.background = "#C0C0C0";
      all.setAttribute("disabled", "disabled");
    }
    boutonFormulaireEnvoi.addEventListener("click", function (event){
      event.preventDefault();
    });
  }

  /* On récupère l'élément section contenant l'ensemble de notre panier */
  let section = document.querySelector('section.wrapper');
  /* On récupère l'élément section faisant le total de notre commande */
  let totalSection = document.querySelector("section.total-prix");
  
  /* Récupérer les données présentes à l'intérieur du localStorage */
  let panier = JSON.parse(localStorage.getItem("panier"));

  /* Si le panier est vide : */
  if(panier === null){
    creerParagrapheErreur();
    empecherEnvoiFormulaire();
  }

  /* Si il y a des valeurs à l'intérieur du panier :  */
  if(panier != null){
    /* Pour chaque objet présent à l'intérieur du localStorage */
    for (all of panier){
      /* On crée un nouvel article */
      let newArticle = document.createElement("article");
      /* On crée une balise pour y stocker les propriétés de l'article */
      newArticle.innerHTML = `<img src="${all.imageUrl}"/><h2>${all.name}</h2><span class="montant">${all.price} €</span><input class="quantite" type="number" min="1" value="1" /><span class="total">${all.price} €</span><button class="supprimer">Supprimer</button>`;
      /* On place notre article à l'intérieur de notre section */
      section.appendChild(newArticle);
    }
    /* Afficher le prix total de la commande quand on arrive sur la page panier */
    let totalParagraphe = document.createElement("p");
    let spanTotalArticle = document.querySelectorAll(".total");
    let prixTotalCommande = 0;
    for(all of spanTotalArticle){
      prixTotalCommande += parseInt(all.textContent.slice(0, -2));
    }
    localStorage.setItem("prix_total_commande", prixTotalCommande);
    totalParagraphe.textContent = "Total de votre commande : " + prixTotalCommande + " €";
    totalSection.appendChild(totalParagraphe);

    /* Pour que l'utilisateur puisse passer sa commande, on s'assure que tous les champs du formulaire soient remplis : */
    boutonFormulaireEnvoi.addEventListener("click", function(event){
      event.preventDefault();
      
      
      /* On récupère les valeurs du formulaire */
      let valeursFormulaire = [];
      /* Pour tous les inputs du formulaire */
      for(all of inputsFormulaire){
        let valeur = all.value;
        valeursFormulaire.push(valeur);
      }

      /* Inititallement le formulaire possède une valeur true */
      let formulaireValide = true;

      const regex = /\d/;

      /* Sur les champs prénom, nom et ville, on applique le même test : si la string rentrée contient moins de 4 caractères et contient des valeurs numériques, alors le formulaire n'est plus valide */
      if(valeursFormulaire[0].length < 3 || regex.test(valeursFormulaire[0]) === true || valeursFormulaire[1].length < 3 || regex.test(valeursFormulaire[1]) === true || valeursFormulaire[3].length < 3 || regex.test(valeursFormulaire[3]) === true){
        formulaireValide = false;
      }

      /* Sur le champ adresse postale, on vérifie qu'il y ait au moins 5 caractères */
      if(valeursFormulaire[2] < 6){
        formulaireValide = false;
      }

      /* Sur le champ mail, on vérifie la présence d'un arobase, d'un point et un minimum de 10 caractères */
      if(!valeursFormulaire[4].includes("@") || !valeursFormulaire[4].includes(".") || valeursFormulaire[4].length < 10 ){
        formulaireValide = false;
      }

      /* Si le formulaire est toujours valide, alors on passe à la suite des actions : */
      if(formulaireValide === true){
        /* On crée l'objet contact */
        let contact = {firstName :  valeursFormulaire[0],
        lastName : valeursFormulaire[1],
        address : valeursFormulaire[2],
        city : valeursFormulaire[3],
        email : valeursFormulaire[4],
        };

        /* On crée l'objet informationCommande */
        let informationsCommande = { contact : contact, 
          products : panier,
        };

        fetch("http://localhost:3000/api/cameras/order", {method: "POST", headers: {"Content-Type": "application/json"}, body : JSON.stringify(informationsCommande), })
        .then(async (response) => {
          try{
            let contenu = await response.json();
            localStorage.setItem("numero_commande", contenu.orderId);
            location.assign("orinoco-page-confirmation-commande.html");
          } catch(e) {
            console.log(e);
          }
        })
      }

    })
    
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
        /* On multiplie la quantité choisi dans l'input par le prix de l'objet */
        let montantTotalArticle = parseInt(spanValeurMontantArticle) * valeurInput;
        /* On récupère le span affiché le montant total de cet article */
        let spanTotalArticle = e.target.parentNode.querySelector(".total");
        /* On place dans son textContent la nouvelle valeur du montant total lié au produit */
        spanTotalArticle.textContent = montantTotalArticle + " €";
      });
    }
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
            localStorage.removeItem("prix_total_commande");
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