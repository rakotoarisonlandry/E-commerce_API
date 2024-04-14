import { db } from "../../../config/bd.js";
import jwt from "jsonwebtoken";

export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Vérifier si userInfo contient l'IdUser
    if (!userInfo || !userInfo.id) {
      console.log("Invalid user information in token:", userInfo);
      return res.status(400).json("Invalid user information in token!");
    }

    const q =
      "INSERT INTO comment (`montant`, `currentDate`, `IdUser` , `Idpro`) VALUES (?)";

    const values = [
      req.body.montant,
      req.body.currentDate,
      userInfo.id,
      req.body.IdPro,
    ];

    db.query(q, [values], (err, data) => {  
      if (err) return res.status(500).json(err);

      const updatePro = "UPDATE product SET prixFinale = ? WHERE IdPro = ? AND ? > prixFinale"
      db.query(updatePro, [req.body.montant, req.body.IdPro, req.body.montant], (updateErr, updateResult) => {
        if (updateErr) return res.status(500).json(updateErr);
        return res.json("Comment has been created and product price updated if necessary.");
      });
    });
  });
};

export const getAllComments = (req, res) => {
  const q = req.query.IdComment
    ? "SELECT * FROM comment WHERE IdComment=?"
    : "SELECT * FROM comment";

  db.query(q, [req.query.IdComment], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

//pour les historiques dans l'admin
export const getOneComment = (req, res) => {
  const q =
    "SELECT u.`name`, u.`userName`,u.`numTelephone`, nt.`NomPro`,  nt.`desc`, nt.`date`, u.`profile`, c.`currentDate` " +
    "FROM user u " +
    "JOIN comment c ON u.IdUser = c.IdUser " +
    "JOIN product nt ON nt.IdPro = c.IdPro " +
    "WHERE c.IdComment = ?";
  db.query(q, [req.params.IdComment], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
