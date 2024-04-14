import { db } from "../../../config/bd.js";

export const updateUser = (req, res) => {
  const UserId = req.params.IdUser;

  const q =
    "UPDATE user SET `name`=?, `userName`=?, `profile`=? WHERE `IdUser`=?";

  const values = [req.body.name, req.body.userName, req.body.profile];

  db.query(q, [...values, UserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("User has been Updated! ");
  });
};
