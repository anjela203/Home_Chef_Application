const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../utils/database');

// usersController.js
const usersController = {
  register: async (req, res) => {
    // Implement registration logic
    try{
      let {email,password,username}= req.body;
      let passwordHash = bcrypt.hashSync (password, 8);
      pool.execute(`SELECT * FROM users WHERE email=?`,[email],(err1,allUsers)=>{
        if(err1){
          console.log(err1);
          res.status(400).send({message:'Error while registering the user!'});
          return;
        }
        if(allUsers.length===0){
          let role = "resident";
          pool.execute(`
           INSERT INTO users (username, email, password, role)
           SELECT * FROM (SELECT '${username}', '${email}','${passwordHash}', '${role}') AS tmp
           WHERE NOT EXISTS (
               SELECT username FROM users WHERE username = '${username}' AND email = '${email}'
           )
          `,(err,result)=>{
           if(err){
               console.log(err);
               res.status(400).send({message:'Error while registering the user!'});
               return;
           }
           console.log(result);
           res.send({messsage:'User Registered successfully!'});
          });
        }else{
          res.status(400).send({message:'User already registered with this email!'});
          return;
        }
      })
   

  }catch(err){
      console.log(err);
      res.status(400).send(err);
  }
   
  },

  registerChef: async (req, res) => {
    // Implement registration logic
    try{
      let {email,password,username}= req.body;
      let passwordHash = bcrypt.hashSync (password, 8);
      pool.execute(`SELECT * FROM users WHERE email=?`,[email],(err1,allUsers)=>{
        if(err1){
          console.log(err1);
          res.status(400).send({message:'Error while registering the user!'});
          return;
        }
        if(allUsers.length===0){
          let role = "chef";
          pool.execute(`
           INSERT INTO users (username, email, password, role)
           SELECT * FROM (SELECT '${username}', '${email}','${passwordHash}', '${role}') AS tmp
           WHERE NOT EXISTS (
               SELECT username FROM users WHERE username = '${username}' AND email = '${email}'
           )
          `,(err,result)=>{
           if(err){
               console.log(err);
               res.status(400).send({message:'Error while registering the user!'});
               return;
           }
           console.log(result);
           res.send({messsage:'User Registered successfully!'});
          });
        }else{
          res.status(400).send({message:'User already registered with this email!'});
          return;
        }
      })
   
      

  }catch(err){
      console.log(err);
      res.status(400).send(err);
  }
   
  },

  login: async (req, res) => {
    // Implement login logic
    try{
      pool.query(`SELECT *
      FROM users
       WHERE users.email = ?`, [req.body.email], function(err, rows, fields) {
          console.log(rows);
          if(err){
              console.log(err);
              res.status(400).send({message:'Error while logging the user!'});
              return;
          }
          let user = rows[0];
          if(!req.body.password){
              res.status(400).send({message:'Password is required!'});
              return;
          }
          if(user){
              console.log(user);
              let passwordIsValid = bcrypt.compareSync (
                  req.body.password,
                  user.password
                );
          if (!passwordIsValid) {
              return res.status (401).send ({
                accessToken: null,
                message: 'Invalid Password!',
              });
            }
  
            let token = jwt.sign ({id: user.user_id}, "test-secret-key");
            res.send({
              id:user.user_id,
              email:user.email,
              username:user.username,
              role:user.role,
              token:token
            })
        
          }else{
              res.status(400).send({message:'User not found!'});
          }
        });
    
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
    
  },


  updateProfile: async (req, res) => {
      try{
        const {email,username,password,prevMail} = req.body;
        if(password){
          let passwordHash = bcrypt.hashSync(password,8);
          pool.query(`UPDATE users
          SET password=?
           WHERE users.email = ?`, [passwordHash,prevMail], function(err, rows, fields) {
              console.log(rows);
              if(err){
                  console.log(err);
                  res.status(400).send({message:'Error while logging the user!'});
                  return;
              }
             
            
          })
      }

        pool.query(`UPDATE users
            SET email=?,username=?
             WHERE users.email = ?`, [email,username,prevMail], function(err, rows, fields) {
                console.log(rows);
                if(err){
                    console.log(err);
                    res.status(400).send({message:'Error while Updating the user!'});
                    return;
                }
                res.status(200).send({message:'Updated Successfully!'});
              
            })
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message});
    }

  
  },

  getAnalytics:async (req,res)=>{
    let finalData = {};
    pool.query(`SELECT COUNT(*) AS total_users
    FROM users`, function(err, users) {
        //console.log(users);
        if(err){
            console.log(err);
            res.status(400).send({message:'Something went wrong!'});
            return;
        }
        //console.log(users);
        finalData.users = users[0].total_users;
        pool.query(`SELECT COUNT(*) AS total_orders
        FROM orders`, function(err, conferences) {
        //console.log(users);
        if(err){
            console.log(err);
            res.status(400).send({message:'Something went wrong!'});
            return;
        }

        finalData.orders = conferences[0].total_orders;
    
        pool.query(`SELECT COUNT(*) AS total_menus
        FROM menu`, function(err, assignments) {
        //console.log(users);
        if(err){
            console.log(err);
            res.status(400).send({message:'Something went wrong!'});
            return;
        }

        finalData.menus = assignments[0].total_menus;
        
        res.send(finalData);
    
    })

    })
       
      
    })
  }
};

module.exports = usersController;
