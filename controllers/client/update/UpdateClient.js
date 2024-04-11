import { db } from "../../../config/bd.js";

export const updateUser = (req, res) => {
  const postId = req.params.IdUser;

  const q =
    "UPDATE user SET `name`=?, `firstName`=?, `profile`=? WHERE `IdUser`=?";

  const values = [req.body.name, req.body.firstName, req.body.profile];

  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("User has been Updated! ");
  });
};
