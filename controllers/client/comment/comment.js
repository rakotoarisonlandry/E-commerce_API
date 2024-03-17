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
      "INSERT INTO comment (`montant`, `currentDate`, `IdUser`) VALUES (?)";

    const values = [req.body.montant, req.body.currentDate, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("comment has been created !");
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

export const getOneComment = (req, res) => {
  const q =
    "SELECT p.id , `username` , `title` ,`desc`, p.img,u.img AS userImg ,`cat` , `date` FROM user u JOIN posts p ON u.id= p.userId WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
