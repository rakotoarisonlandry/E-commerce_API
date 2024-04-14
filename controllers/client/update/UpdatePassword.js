import { db } from "../../../config/bd.js";

export const updatePassword = (req, res) => {
  const q =
    "UPDATE user SET `password`=? WHERE `email`=?";

  const values = [req.body.password,req.body.email];

  db.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("password has been Updated! ");
  });
};
