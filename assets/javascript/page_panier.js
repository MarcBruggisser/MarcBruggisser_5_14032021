/* Sur la page panier */
if(main.classList.contains('page-panier')){
  
  
  /* Indiquer un message si le panier est vide : */
  
  /* On récupère l'élément section */
  let section = document.querySelector('section');
  /* On vérifie que l'élément ait des éléments enfants (retourne une valeur booléene) */
  let sectionHasChildren = section.hasChildNodes();
  /* Si le panier ne possède aucun produit, alors on n'indique au client que le panier n'en possède pas */
  if(sectionHasChildren === false){
    let paragrapheErreur = document.createElement("p");
    paragrapheErreur.classList.add('paragraphe-erreur');  
    paragrapheErreur.textContent = "Il n'y a pour l'instant aucun produit à l'intérieur de votre panier.";
    section.appendChild(paragrapheErreur);
  }

  /* Récupérer les données présentes à l'intérieur du localStorage */
  let panier = JSON.parse(localStorage.getItem("panier"));
  /* Pour chaque objet présentà l'intérieur du localStorage */
  for (all of panier){
    /* On crée un nouvel article */
    let newArticle = document.createElement("article");
    /* On crée une balise pour y stocker le nom de l'article */
    let nom = document.createElement("h2");
    /* On attribue la valeur de la propriété "name" de l'objet en tant que textContent de la balise que l'on vient de créer */
    nom.textContent = all.name;
    /* On place le titre à l'intérieur de notre article */
    newArticle.appendChild(nom);
    /* On crée un select HTML pour que l'utilisateur puisse choisir la quantité d'appareil qu'il veut */
    // document.createElement("select")
    /* On crée une balise pour y placer le prix */
    let prix = document.createElement("span");
    /* On attribue la valeur de la propriété "price" de l'objet en tant que textContent de la balise que l'on vient de créer */
    prix.textContent = all.price + " €";
    /* On place le titre à l'intérieur de notre article */
    newArticle.appendChild(prix);
    /* On place notre article à l'intérieur de notre section */
    section.appendChild(newArticle);
  }

  /* Supprimer un produit du panier : */

  /* On récupère le bouton supprimer */
  let supprimerProduit = document.querySelector('.supprimer');

  function supprimerProduitDuPanier() {
    supprimerProduit.parentNode.parentNode.remove();
  }
  supprimerProduit.addEventListener("click", supprimerProduitDuPanier);
}