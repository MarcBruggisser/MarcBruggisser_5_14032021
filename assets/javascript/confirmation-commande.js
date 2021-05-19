    if (main.classList.contains("page-confirmation-commande")){

        /* On récupère dans le localStorage le montant total de la commande */
        let totalPrixCommande = parseFloat(localStorage.getItem("prix_total_commande")).toFixed(2).toString().replace('.',',');
        /* On récupère dans le localStorage le numéro de la commande */
        let idOrder = localStorage.getItem("numero_commande");
        let paragrapheIdCommandeEtPrixTotal = document.createElement("p");
        paragrapheIdCommandeEtPrixTotal.textContent = `Merci pour votre achat ! Votre numéro de commande est le ${idOrder} et le prix total est de ${totalPrixCommande} €. A très vite pour de nouveaux achats`

        /* On récupère le h1 de la page */
        let h1 = document.querySelector("h1");
        /* On place après ce h1 le paragraphe avec le total et l'id de la commande */
        h1.insertAdjacentElement("afterend", paragrapheIdCommandeEtPrixTotal);
        /* On supprime les informations du localStorage */
        localStorage.removeItem("prix_total_commande", "panier", "numero_commande");
        localStorage.removeItem("panier");
        localStorage.removeItem("numero_commande");
    }