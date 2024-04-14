import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../../config/bd.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const SALT_ROUNDS = 10;

export const register = (req, res) => {
  const { email, AdminName, password, profile } = req.body;

  const q = "SELECT * FROM admin WHERE email = ? OR AdminName = ?";
  db.query(q, [email, AdminName], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Admin already exists!");

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery = "INSERT INTO admin (`AdminName`, `email`, `password`, `profile`) VALUES (?)";
    const values = [AdminName, email, hash, profile];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Admin has been created.");
    });
  });
};

export const login = (req, res) => {
  const { AdminName, password } = req.body;

  const q = "SELECT * FROM admin WHERE AdminName = ?";
  db.query(q, [AdminName], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("Admin not found!");

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password or username.");

    const token = jwt.sign({ id: data[0].id }, JWT_SECRET);
    const { password: _, ...other } = data[0];

    res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  }).status(200).json("User has been logged out.");
};
