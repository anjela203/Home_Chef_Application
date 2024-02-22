const pool = require("../utils/database");

// menusController.js
const menusController = {
  getAllMenuItems: async (req, res) => {
    // Implement logic to retrieve menus
    try{
      pool.query(`SELECT * FROM menu`,(err,rows)=>{
          if(err){
              console.log(err);
              res.status(400).send({message:err.message});
              return;
          }
          console.log(rows);
          res.send(rows);

      })
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
    
  },

  getSingleMenuItem:async (req, res) => {
    // Implement logic to retrieve menus
    try{
      let id = req.params.id;
      if(!id){
          res.status(400).send({message:"ID not found!"});
          return;
      }
      pool.query(`SELECT * FROM menu
      WHERE menu_id=?`,[id],(err,rows)=>{
          if(err){
              res.status(400).send({message:err.message});
              return;
          }
          console.log(rows);
          let finalData = rows[0];

        res.send(finalData);
      })
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
 
  },

  addMenu: async (req, res) => {
    // Implement logic to add a new menu item
    try{
      const data = req.body;
      let {title,description,price,image}= data;
      pool.execute(`
              INSERT INTO menu (title,description,price,image)
              VALUES ('${title}','${description}','${price}','${image}')
             `,(err,result)=>{
              if(err){
                  console.log(err);
                  res.status(400).send({message:'Error while creating the menu item!'});
                  return;
              }
              let menuId = result.menu_id;
              console.log(menuId);
              res.send({messsage:'Menu Item Created successfully!'});
             });
   
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
   
  },

  updateMenu: async (req, res) => {
    // Implement logic to update a menu item
    try{
      const {title,description,price,image,menu_id} = req.body;
      pool.query(`UPDATE menu
      SET title=?,description=?,price=?,image=?
      WHERE menu_id=?`, [title,description,price,image,menu_id], function(err, rows) {
      console.log(rows);
      if(err){
          console.log(err);
          res.status(400).send({message:'Error while Updating the menu!'});
          return;
      }
     res.status(200).send("success");
     
     
    
  })

     
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }

  },

  deleteMenu: async (req, res) => {
    try{
      let id = req.params.id;
      console.log(id);
      if(id){
          pool.query(`DELETE FROM menu WHERE menu_id=?`,[id],(err,rows)=>{
              if(err){
                  console.log(err);
                  res.status(400).send({message:err.message});
                  return;
              }
              console.log(rows);
              res.send({message:"success"});
  
          })
      }else{
          res.status(400).send({message:"Not a valid id!"});
      }
      
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
  }
};

module.exports = menusController;
