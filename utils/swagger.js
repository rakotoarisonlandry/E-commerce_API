/**
 * @swagger
 * components:
 *    schemas:
 *      product:
 *         type: object
 *         required:
 *            - NomPro
 *            - PrixInitial
 *            - img
 *            - desc
 *            - date
 *            - NomPro
 *
 *         properties:
 *            IdPro:
 *              type: int
 *              description: (identifiant) auto-Increment
 *            NomPro:
 *              type: string
 *              description: Nom de la produit 
 *            PrixInitial:
 *              type: int
 *              description: prix initiale de la produit  
 *            PrixFinale:
 *              type: int
 *              description: Prix Finale de la produit . NB= Prix finale == Prix initale au debut
 *            img:
 *              type: string
 *              description: image representation de la produit 
 *            desc:
 *              type: string
 *              description: description complete de la produit 
 *            date:
 *              type: datetime
 *              description: Date de publication de la produit 
 *            status:
 *              type: string
 *              description: Status actuelle de la produit 
 *            example:
 *              id: fdsfsd4
 *              title: dfsdakfhsfakha
 *
 */
