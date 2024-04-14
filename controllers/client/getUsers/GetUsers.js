import { db } from "../../../config/bd.js";

export const getUsers = (req, res) => {
  const q = req.query.IdUser
    ? "SELECT * FROM user WHERE IdUser=?"
    : "SELECT * FROM user";
  db.query(q, [req.query.IdUser], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
