const jwt = require("jsonwebtoken");
const pool = require("../utils/database.js");


//cathing expired token error

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
  
}


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, 'test-secret-key', (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};


isChef = async (req, res, next) => {
  try{
    console.log(req.userId);
    let id = req.userId;
   
    pool.query(`SELECT user_id,role FROM users
        WHERE user_id=?`,[id],(err,row)=>{
            if(err){
                console.log(err)
                res.status(400).send({message:'Failed to find user!'});
                return;
            }
            if(row[0].role==='chef'){
                next();
                return;
            }

            res.status(403).send({ message: "Require Chef Role!" });
            return;
        })


  
  }catch(err){
    console.log(err);
    res.status(500).send({ message: err });
      
  }
 
};





const authJwt = {
  verifyToken,
  isChef
};
module.exports = authJwt;
