import { db } from "../../../config/bd.js";

export const register = (req, res) => {
  const q = "SELECT * FROM user WHERE email =? OR (name =? AND firstName =?)";
  db.query(
    q,
    [req.body.email, req.body.name, req.body.firstName],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exixts!");

      //Hash the password   and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO user(`name`,`firstName`,`email`,`password`,`profile`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.firstName,
        req.body.email,
        hash,
        req.body.profile,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been create.");
      });
    }
  );
};
export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE name=? AND firstName=?";
  db.query(q, [req.body.name, req.body.firstName], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Vérifier le mot de passe
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None",  // Utilisez "None" pour permettre l'envoi du cookie dans des contextes tiers
    secure: true,     // Assurez-vous que le cookie est envoyé uniquement via HTTPS
  }).status(200).json("user has been logged out.");
};