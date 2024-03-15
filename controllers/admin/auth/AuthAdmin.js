import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register =  (req,res) =>{
    const q = "SELECT * FROM admin WHERE email =? OR AdminName =? ";
    db.query(q, [req.body.email, req.body.AdminName], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("admin  already exixts!");
  
      //Hash the password   and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO admin(`AdminName`,`email`,`password`) VALUES (?)";
      const values = [req.body.AdminName, req.body.email, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Admin has been create.");
      });
    });
}
