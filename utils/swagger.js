/**
 * @swagger
 * components:
 *    schemas:
 *      
 *      product:
 *         type: object
 *         required:
 *            - NomPro
 *            - PrixInitial
 *            - img
 *            - desc
 *            - date
 *
 *         properties:
 *            IdPro:
 *              type: integer
 *              description: Identifiant auto-incrémenté
 *            NomPro:
 *              type: string
 *              description: Nom du produit
 *            PrixInitial:
 *              type: integer
 *              description: Prix initial du produit
 *            PrixFinale:
 *              type: integer
 *              description: Prix final du produit (Note= Le prix final est égal au prix initial au début)
 *            img:
 *              type: string
 *              description: Représentation image du produit
 *            desc:
 *              type: string
 *              description: Description complète du produit
 *            date:
 *              type: string
 *              format: date-time
 *              description: Date de publication du produit
 *            status:
 *              type: string
 *              description: Statut actuel du produit
 *         example:
 *            IdPro: 1
 *            NomPro: "Nom du produit"
 *            PrixInitial: 100
 *            PrixFinale: 100
 *            img: "http://example.com/image.jpg"
 *            desc: "Description du produit"
 *            date: "2024-04-23T12:00:00Z"
 *            status: "disponible"
 *
 *      comment:
 *         type: object
 *         required:
 *            - montant
 *            - currentDate
 *            - IdUser
 *            - IdPro
 *
 *         properties:
 *            IdComment:
 *              type: integer
 *              description: Identifiant auto-incrémenté du commentaire
 *            montant:
 *              type: integer
 *              description: Montant du commentaire
 *            currentDate:
 *              type: string
 *              format: date-time
 *              description: Date du commentaire
 *            IdUser:
 *              type: integer
 *              description: ID de l'utilisateur qui a fait le commentaire
 *            IdPro:
 *              type: integer
 *              description: ID du produit concerné par le commentaire
 *         example:
 *            IdComment: 1
 *            montant: 50
 *            currentDate: "2024-04-23T12:00:00Z"
 *            IdUser: 1
 *            IdPro: 1
 *      
 *      admin:
 *         type: object
 *         required:
 *            - AdminName
 *            - email
 *            - password
 *            - profile
 *         properties:
 *            IdAdmin:
 *              type: integer
 *              description: Identifiant auto-incrémenté de l'administrateur
 *            AdminName:
 *              type: string
 *              description: Nom de l'administrateur
 *            email:
 *              type: string
 *              format: email
 *              description: Adresse e-mail de l'administrateur
 *            password:
 *              type: string
 *              description: Mot de passe de l'administrateur (hashé)
 *            profile:
 *              type: string
 *              description: Profil de l'administrateur
 *         example:
 *            IdAdmin: 1
 *            AdminName: "Landry"
 *            email: "admin@example.com"
 *            password: "Password"
 *            profile: "profil.img"
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Enregistre un nouvel administrateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin'
 *     responses:
 *       200:
 *         description: L'administrateur a été créé avec succès.
 *       409:
 *         description: L'administrateur existe déjà.
 *       500:
 *         description: Erreur serveur lors de la création de l'administrateur.
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Connecte un administrateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie. Le token d'accès a été envoyé dans les cookies.
 *       400:
 *         description: Mot de passe ou nom d'utilisateur incorrect.
 *       404:
 *         description: Administrateur non trouvé.
 *       500:
 *         description: Erreur serveur lors de la connexion de l'administrateur.
 */

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Déconnecte un administrateur
 *     responses:
 *       200:
 *         description: L'administrateur a été déconnecté avec succès.
 *       500:
 *         description: Erreur serveur lors de la déconnexion de l'administrateur.
 */

/**
 * @swagger
 * /admin/{IdAdmin}:
 *   get:
 *     summary: Récupère un administrateur par son ID
 *     parameters:
 *       - in: path
 *         name: IdAdmin
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'administrateur à récupérer
 *     responses:
 *       200:
 *         description: Administrateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/admin'
 *       500:
 *         description: Erreur serveur lors de la récupération de l'administrateur
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Récupère la liste de tous les administrateurs
 *     responses:
 *       200:
 *         description: Liste de tous les administrateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/admin'
 *       500:
 *         description: Erreur serveur lors de la récupération des administrateurs
 */

/**
 * @swagger
 * /admin/{IdAdmin}:
 *   put:
 *     summary: Met à jour un administrateur par son ID
 *     parameters:
 *       - in: path
 *         name: IdAdmin
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'administrateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin'
 *     responses:
 *       200:
 *         description: L'administrateur a été mis à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour de l'administrateur
 */


/**
 * @swagger
 * /user/comment:
 *   post:
 *     summary: Ajoute un nouveau commentaire
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comment'
 *     responses:
 *       200:
 *         description: Le commentaire a été créé avec succès et le prix du produit a été mis à jour si nécessaire
 *       400:
 *         description: Informations utilisateur invalides dans le token
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Token non valide
 *       500:
 *         description: Erreur serveur lors de la création du commentaire ou de la mise à jour du prix du produit
 */

/**
 * @swagger
 * /user/comment:
 *   get:
 *     summary: Récupère la liste de tous les commentaires
 *     responses:
 *       200:
 *         description: Liste de tous les commentaires récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 *       500:
 *         description: Erreur serveur lors de la récupération des commentaires
 */

/**
 * @swagger
 * /admin/comment/{IdComment}:
 *   get:
 *     summary: Récupère un commentaire par son ID
 *     parameters:
 *       - in: path
 *         name: IdComment
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du commentaire à récupérer
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       500:
 *         description: Erreur serveur lors de la récupération du commentaire
 */


/**
 * @swagger
 * /admin/product:
 *   get:
 *     summary: Retourne la liste des produits
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/product'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /admin/product:
 *   post:
 *     summary: Ajoute un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Le produit a été créé et les e-mails ont été envoyés
 *       409:
 *         description: Le produit existe déjà
 *       500:
 *         description: Erreur serveur lors de la création du produit ou de l'envoi d'e-mails
 */

/**
 * @swagger
 * /admin/product/{IdPro}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     parameters:
 *       - in: path
 *         name: IdPro
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit à récupérer
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *       500:
 *         description: Erreur serveur lors de la récupération du produit
 */

/**
 * @swagger
 * /admin/product/{IdPro}:
 *   delete:
 *     summary: Supprime un produit par son ID
 *     parameters:
 *       - in: path
 *         name: IdPro
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit à supprimer
 *     responses:
 *       200:
 *         description: Le produit a été supprimé avec succès
 *       403:
 *         description: Vous ne pouvez supprimer que votre propre produit
 */

/**
 * @swagger
 * /admin/product/{IdPro}:
 *   put:
 *     summary: Met à jour un produit par son ID
 *     parameters:
 *       - in: path
 *         name: IdPro
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Le produit a été mis à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour du produit
 */

