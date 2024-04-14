import { db } from "../../../config/bd.js";

export const updateAdmin = (req, res) => {
  const AdminId = req.params.IdAdmin;

  const q =
    "UPDATE admin SET `AdminName`=?, `password`=? ,`profile`=? WHERE `IdAdmin`=?";

  const values = [req.body.AdminName, req.body.password, req.body.profile];

  db.query(q, [...values, AdminId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Admin has been Updated! ");
  });
};
