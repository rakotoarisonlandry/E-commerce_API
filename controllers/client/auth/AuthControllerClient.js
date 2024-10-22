import { db } from "../../../config/bd.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  // Check if required fields are present in the request body
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.userName ||
    !req.body.numTelephone ||
    !req.body.password ||
    !req.body.profile
  ) {
    return res.status(400).json("Missing required fields.");
  }

  const q =
    "SELECT * FROM user WHERE email = ? OR (name = ? AND userName = ? AND numTelephone=?)";
  db.query(
    q,
    [req.body.email, req.body.name, req.body.userName, req.body.numTelephone],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists!");

      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const insertQuery =
        "INSERT INTO user(`name`, `userName`, `email`, `password`, `profile`, `numTelephone`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.userName,
        req.body.email,
        hash,
        req.body.profile,
        req.body.numTelephone,
      ];

      db.query(insertQuery, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been created.");
      });
    }
  );
};
export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Vérifier le mot de passe
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong password or username");

      // Vérifier si l'identifiant de l'utilisateur est accessible
      if (!data[0].IdUser) {
        console.error("User id not found:", data[0]);
        return res.status(500).json("User id not found!");
      }
      
      const token = jwt.sign({ id: data[0].IdUser }, "jwtkey");
      
      // Debug: Log token and other data if needed
      console.log("Generated token:", token);
      console.log("Other user data:", data[0]);
      
      const { password, ...other } = data[0];
      
      res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({token,user:other});
    });
  };

  export const logout = (req, res) => {
    res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "None", 
      secure: true,
    })
    .status(200)
    .json("user has been logged out.");
  };
  export const checkUserByEmail = (req, res) => {
    const { email } = req.body;
  
    const q = "SELECT name, userName, email FROM user WHERE email = ?";
    db.query(q, [email], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userInfo = { name: results[0].name, userName: results[0].userName, email: results[0].email };
      res.status(200).json({ message: 'User found', user: userInfo });
    });
  };

  export const sendVerificationCode = (req, res) => {
    const { email } = req.body;
  
    // Générer un code aléatoire à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000);
  
    // Enregistrer le code dans la base de données de l'utilisateur
    const updateQuery = "UPDATE user SET resetCode = ? WHERE email = ?";
    db.query(updateQuery, [code, email], (updateError, updateResults) => {
      if (updateError) {
        console.error(updateError);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // Envoyer l'email avec le code de vérification
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'zmcracky@gmail.com', // Remplacez par votre adresse email Gmail
          pass: '' // Remplacez par le mot de passe de votre compte Gmail
        }
      });
  
      transporter.sendMail({
        from: 'zmcracky@gmail.com',
        to: email,
        subject: 'Code de vérification',
        text: `Votre code de vérification est : ${code}`
      });
  
      res.status(200).json({ message: 'Code envoyé avec succès' });
    }); 
  };