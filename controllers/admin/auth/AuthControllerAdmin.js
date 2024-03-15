import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../../config/bd.js";
export const register =  (req,res) =>{
    const q = "SELECT * FROM admin WHERE email =? OR AdminName =?";
    db.query(q, [req.body.email, req.body.AdminName], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("admin  already exixts!");
  
      //Hash the password   and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO admin(`AdminName`,`email`,`password`,`profile`) VALUES (?)";
      const values = [req.body.AdminName, req.body.email, hash,req.body.profile];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Admin has been create.");
      });
    });
}

export const login = (req,res) =>{
  const q = "SELECT * FROM admin WHERE AdminName=?";
  db.query(q, [req.body.AdminName], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Admin Not found !");

    //Check password
    const IsPassordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!IsPassordCorrect)
      return res.status(400).json("wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)  
      .json(data[0]);
  });
}

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None",  // Utilisez "None" pour permettre l'envoi du cookie dans des contextes tiers
    secure: true,     // Assurez-vous que le cookie est envoyé uniquement via HTTPS
  }).status(200).json("user has been logged out.");
};