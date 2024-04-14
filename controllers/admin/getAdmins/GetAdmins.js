import { db } from "../../../config/bd.js";

export const getAdmins = (req, res) => {
  const q = req.query.IdAdmin
    ? "SELECT * FROM admin WHERE IdAdmin=?"
    : "SELECT * FROM admin";
  db.query(q, [req.query.IdAdmin], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
