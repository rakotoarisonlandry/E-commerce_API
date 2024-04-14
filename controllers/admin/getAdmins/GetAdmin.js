import { db } from "../../../config/bd.js";

export const getAdmin = (req, res) => {
  const q = "SELECT * FROM admin WHERE IdAdmin=?";
  db.query(q, [req.params.IdAdmin], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
