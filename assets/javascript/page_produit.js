

if(main.classList.contains('page-produit')) {
  let urlApi = "http://localhost:3000/api/cameras/";
  let x = location.search;
  let searchParams = new URLSearchParams(x);
  let idProduit = searchParams.get("_id");
  urlApi = urlApi + idProduit;


  /* Récup l'id, la rajouter à la variable URL, mettre l'URL dans le fetch */
  /* Il faut que dans l'URL du fetch, il y ait l'id du produit */
  

    /* On récupère les données de l'API, API setParams (ou searchParams) pour récup l'id */
    var myHeaders = new Headers();
    
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    
    fetch(urlApi, myInit)
    .then(function(response) {
      return response.json();
    })

    /* L'API sert à aller plus vite, tu rentres dans l'URL du fetch, les paramètres créés pour l'API */
  
    .then(function(data) {
          /* On ajoute le h1 de la page qui prend le titre de l'objet */
          let nouvelH1 = document.createElement('h1');
          nouvelH1.textContent = data.name;
          main.prepend(nouvelH1);
          /* On rajoute les infos complémentaires de la page qui prend le titre de l'objet */
          let nouveauProduit = document.createElement("article");
          nouveauProduit.innerHTML = '<img src="' + data.imageUrl +' " alt=""><div class="description-produit"><p>' + data.description + '</p><strong>' + parseInt(data.price) / 1000 + ' €' + '</strong></div>';
          /* On place notre article produit sur la page */
          document.querySelector(".page-produit section").appendChild(nouveauProduit);
          /* On crée une balise HTML select dans lequelle on va placer nos options de lentilles */
          let choixLentilles = document.createElement("select");
          /* On récupère dans l'objet la propriété "Lentilles qui est un tableau" */
          let tableauDeLentilles = data.lenses;
          for (all of tableauDeLentilles){
            /* Pour chaque entrée dans le tableau on crée une balise "option" */
            let nouvelleLentille = document.createElement("option");
            /* Cette balise prend en texte la valeur de l'entrée */
            nouvelleLentille.textContent = all;
            /* Chaque balise option se greffe sur l'objet "select" */
            choixLentilles.appendChild(nouvelleLentille);
          }
          /* On place notre select de lentille dans l'article */
          document.querySelector(".description-produit p").insertAdjacentElement("afterend", choixLentilles);
        
          
        /* On récupère le bouton "Ajouter au panier" */
        let boutonAjouterAuPanier = document.querySelector('.ajout-panier');
      
        /* Quand un élément est ajouté au panier */
        function ajoutPanier () {
          
          /* Si l'utilisateur appuie sur le bouton "Ajouter au panier", on le prévient que son produit a été ajouté */

          /* On commence par vérifier s'il y a déjà un paragraphe enfant direct du main */
          let paragraphe = main.querySelector("main > p");
          /* S'il n'a pas déjà cliqué au moins une fois sur le bouton "Ajouter au panier", alors on crée d'abord un nouveau paragraphe */
          if(paragraphe === null){
            let messageAjout = document.createElement('p');
            /* On lui attribue le texte que l'on veut */
            messageAjout.textContent = 'Votre produit a été ajouté au panier !';
            /* On place le paragraphe derrière le bouton d'ajout au panier */
            boutonAjouterAuPanier.insertAdjacentElement('afterend', messageAjout);
          }
  



      
          /* On récupère le contenu du localStorage que l'on place à l'intérieur d'une variable (produits)*/
          let panier = null;
          panier = JSON.parse(localStorage.getItem("panier"));
          /* Le contenu du localStorage est désormais contenu dans notre tableau produits. Si le localStorage est vide, alors on crée un tableau dans lequel on va ajouter l'objet */
          if(panier === null){
            panier = [];
            panier.push(data);
          } 
          /* Si à l'inverse le contenu du localStorage n'est pas vide, alors on vérifie que le produit n'y soit pas déjà présent */
          else if(panier != null){
            /* On le vérifie sur toutes les entrées du tableau */
            for (all of panier){
              let test = panier.some(all => all.name === data.name);
              /* Si le produit n'est pas déjà présent à l'intérieur du tableau, alors on l'y ajoute */
              if(test === false){
                panier.push(data);
              }
            }
          }
      
          /* On renvoie ensuite notre tableau dans le localStorage */
          localStorage.setItem("panier", JSON.stringify(panier));
        }
        boutonAjouterAuPanier.addEventListener("click", ajoutPanier);
    })
}