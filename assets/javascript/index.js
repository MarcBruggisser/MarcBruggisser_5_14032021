/* Sur la page d'accueil on crée de nouveaux éléments HTML pour chaque objet présent dans la table des appareils photos de la base de données */
if(main.classList.contains('liste-produits')){
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
      for (all of data) {
        let nouveauProduit = document.createElement("article");
        nouveauProduit.classList.add("article-produit");
        nouveauProduit.innerHTML = '<a href="pages/orinoco-page-produit.html?_id=' + all._id +'"><img src="' + all.imageUrl +' " alt=""><div class="description-produit"><h2>' + all.name + '</h2><p>' + all.description + '</p><strong>' + parseInt(all.price) / 1000 + ' €' + '</strong></div></a>';
        document.querySelector(".liste-produits section").appendChild(nouveauProduit);  
      }
    })
  }