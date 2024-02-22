const pool = require("../utils/database");

// ordersController.js
const ordersController = {
  placeOrder: async (req, res) => {
    // Implement order placement logic
    try{
      const data = req.body;
      let {menu_id,user_id,quantity}= data;
      pool.execute(`
              INSERT INTO orders (menu_id,user_id,quantity,orderStatus)
              VALUES ('${menu_id}','${user_id}','${quantity}','${'Processing'}')
             `,(err,result)=>{
              if(err){
                  console.log(err);
                  res.status(400).send({message:'Error while creating the order item!'});
                  return;
              }
              let menuId = result.menu_id;
              console.log(menuId);
              res.send({messsage:'Order Created successfully!'});
             });
   
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
   
  },

  getOrders: async (req, res) => {
    try{
      pool.query(`SELECT * FROM orders 
      JOIN menu ON orders.menu_id = menu.menu_id 
      JOIN users ON users.user_id = orders.user_id
      `,(err,rows)=>{
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

  getUserOrders: async (req, res) => {
    try{
      let id = req.params.userId;
      if(!id){
          res.status(400).send({message:"ID not found!"});
          return;
      }
      pool.query(`SELECT * FROM orders
      JOIN menu ON orders.menu_id = menu.menu_id 
      WHERE user_id=? `,[id],(err,rows)=>{
          if(err){
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

  updateOrder: async (req, res) => {
    // Implement logic to update an order's status
    const order_id = req.params.orderId;
    try{
      const {status} = req.body;
      pool.query(`UPDATE orders
      SET orderStatus=?
      WHERE order_id=?`, [status,order_id], function(err, rows) {
      console.log(rows);
      if(err){
          console.log(err);
          res.status(400).send({message:'Error while Updating the orders!'});
          return;
      }
     res.status(200).send("success");
     
     
    
  })

     
  }catch(err){
      console.log(err);
      res.status(400).send({message:err.message});
  }
  }
};

module.exports = ordersController;
