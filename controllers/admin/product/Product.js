import { db } from "../../../config/bd.js";

export const addPro = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");
  const q = "SELECT * FROM product WHERE  img =? ";
  db.query(q, [req.body.img], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("product  already created!");
    const q =
      "INSERT INTO product (`NomPro`, `PrixInitial`,`PrixFinale`,`img`, `desc`, `date` ) VALUES (?)";
    const values = [
      req.body.NomPro,
      req.body.PrixInitial,
      req.body.PrixFinale,
      req.body.img,
      req.body.desc,
      req.body.date,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Product has been created !");
    });
  });
};

export const getProds = (req, res) => {
  const q = req.query.IdPro
    ? "SELECT * FROM product WHERE IdPro=?"
    : "SELECT * FROM product";
  db.query(q, [req.query.IdPro], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getProd = (req, res) => {
  const q = "SELECT * FROM product WHERE IdPro=?";
  db.query(q, [req.params.IdPro], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const deletePro = (req, res) => {
  const postId = req.params.IdPro;
  const q = "DELETE FROM product WHERE `IdPro`=?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post");
    return res.json("product has been deleted!");
  });
};

export const updatePro = (req, res) => {
  const postId = req.params.IdPro;

  const q =
    "UPDATE product SET `NomPro`=?, `PrixInitial`=?, `PrixFinale`=?, `img`=?, `desc`=?, `date`=? WHERE `IdPro`=?";

  const values = [
    req.body.NomPro,
    req.body.PrixInitial,
    req.body.PrixFinale,
    req.body.img,
    req.body.desc,
    req.body.date,
  ];

  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Product has been Updated! ");
  });
};
