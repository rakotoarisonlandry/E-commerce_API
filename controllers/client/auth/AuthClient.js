import { db } from "../../../bd";

export const register = (req,res) =>{
    const q = "SELECT * FROM user u "
    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User  already exixts!");
    
        //Hash the password   and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const q = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];
    
        db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("User has been create.");
        });
      });
}
export const login= (req,res) =>{

}
export const logout = (req,res) =>{

}