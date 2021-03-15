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
  }

})