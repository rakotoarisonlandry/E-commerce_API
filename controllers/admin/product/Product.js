import { db } from "../../../config/bd.js";
import { io } from "../../../config/socket.js";
import nodemailer from "nodemailer";
export const addPro = (req, res) => {
  const q = "SELECT * FROM product WHERE img = ?";
  db.query(q, [req.body.img], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Product already created!");

    const insertQuery =
      "INSERT INTO product (`NomPro`, `PrixInitial`,`PrixFinale`,`img`, `desc`, `date` ,`status`) VALUES (?)";
    const values = [
      req.body.NomPro,
      req.body.PrixInitial,
      req.body.PrixFinale,
      req.body.img,
      req.body.desc,
      req.body.date,
      req.body.status,
    ];

    db.query(insertQuery, [values], async (err, data) => {
      if (err) return res.status(500).json(err);

      // Envoi de la notification à tous les clients via Socket.IO
      io.emit("newProductNotification", {
        message:
          "Un nouveau produit est disponible. Venez le découvrir sur notre site.",
      });

      // Récupérer les adresses e-mail des clients depuis la base de données
      const getCustomersEmailQuery = "SELECT email FROM user";
      db.query(getCustomersEmailQuery, (err, customers) => {
        if (err) return res.status(500).json(err);

        // liste de destinataires
        const recipients = customers.map((customer) => customer.email);
        // Envoi d'e-mails simultanément
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "rakotorisonlandry@gmail.com",
            pass: "mpea dxeb unhw iewy ",
          },
        });

        const mailOptions = {
          from: "rakotorisonlandry@gmail.com",
          to: recipients.join(","),
          subject: "Nouveau produit disponible",
          html: "<p>Bonjour ! Un nouveau produit est disponible. Venez le découvrir sur <a href='https://www.DotAuction.com'>notre site</a>.</p>",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending emails:", error);
            return res.status(500).json("Failed to send emails.");
          } else {
            console.log("Emails sent:", info.response);
            return res
              .status(200)
              .json("Product has been created and emails have been sent!");
          }
        });
      });
    });
  });
};

export const getProds = (req, res) => {
  const q = req.query.IdPro
    ? "SELECT * FROM product WHERE IdPro=?"
    : "SELECT * FROM product";
  const queryParams = req.query.IdPro ? [req.query.IdPro] : [];

  db.query(q, queryParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    console.log("Product data:", data);
    return res.status(200).json(data);
  });
};

export const getProd = (req, res) => {
  const q = "SELECT * FROM product WHERE IdPro=?";
  db.query(q, [req.params.IdPro], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    console.log("Product data:", data[0]); // Affichage des données dans la console
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
