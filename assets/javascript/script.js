/* Annonce des variables */
const main = document.querySelector('main');

/* On récupère les données de l'API */
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('http://localhost:3000/api/cameras',myInit)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data)
  
  /* Sur la page d'accueil on crée de nouveaux éléments HTML pour chaque objet présent dans la table des appareils photos de la base de données */
  if(main.classList.contains('liste-produits')){
    for (all of data) {
      let nouveauProduit = document.createElement("article");
      nouveauProduit.classList.add("article-produit");
      nouveauProduit.innerHTML = '<a href="pages/orinoco-page-produit.html?_id= ' + all['_id'] + '"><img src="' + all['imageUrl'] +' " alt=""><div class="description-produit"><h2>' + all['name'] + '</h2><p>' + all['description'] + '</p><strong>' + all['price'] + ' €' + '</strong></div></a>';
      document.querySelector(".liste-produits section").appendChild(nouveauProduit);  
    }
  }
  /* Sur la page produit, on affiche les informations relatives au produit sur lequel on a cliqué */
  if(main.classList.contains('page-produit')) {
    for (all of data) {
      if(window.location.href.includes(all['_id'])){
        /* On ajoute le h1 de la page qui prend le titre de l'objet */
        let nouvelH1 = document.createElement('h1');
        nouvelH1.textContent = all['name'];
        main.prepend(nouvelH1);
        /* On rajoute les infos complémentaires de la page qui prend le titre de l'objet */
        let nouveauProduit = document.createElement("article");
        nouveauProduit.innerHTML = '<img src="' + all['imageUrl'] +' " alt=""><div class="description-produit"><p>' + all['description'] + '</p><ul><li>' + all['lenses'] + '</ul><strong>' + all['price'] + ' €' + '</strong></div>';
        document.querySelector(".page-produit section").appendChild(nouveauProduit);  
      }
    }

    /* On récupère le bouton "Ajouter au panier" */
    let boutonAjouterAuPanier = document.querySelector('.ajout-panier');

    /* Si l'utilisateur appuie sur le bouton "Ajouter au panier", on le prévient que son produit a été ajouté */
    function messageAjoutPanier () {
      let messageAjout = document.createElement('p');
      messageAjout.textContent = 'Votre produit a été ajouté au panier !'
      boutonAjouterAuPanier.insertAdjacentElement('afterend', messageAjout);
    }
    boutonAjouterAuPanier.addEventListener("click", messageAjoutPanier)
  }

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

    /* Supprimer un produit du panier : */

    /* On récupère le bouton supprimer */
    let supprimerProduit = document.querySelector('.supprimer');
  
    function supprimerProduitDuPanier() {
      supprimerProduit.parentNode.parentNode.remove();
    }
    supprimerProduit.addEventListener("click", supprimerProduitDuPanier);
  }

})