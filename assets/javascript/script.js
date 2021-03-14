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
  // for (all of data) {
  //   let nouvelProduit = document.createElement("article");
  //   nouvelProduit.style.backgroundColor = "red";
  //   nouvelProduit.style.height = "200px";
  //   nouvelProduit.style.marginBottom = "20px";
  //   document.querySelector(".liste-produits").appendChild(nouvelArticle);
  // }
})


