const express = require('express');
const app = express();
const connection = require('./utils/database');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Example of importing routes (assuming you have these files)
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menus');
const orderRoutes = require('./routes/orders');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);

// Catch-all route for unhandled requests
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 3000;



async function initializeDb(){
        connection.execute(`CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL UNIQUE,
          role VARCHAR(255) NOT NULL
        )`,(err)=>{
        if(err)
        console.log(err);
      });

      connection.execute(`CREATE TABLE IF NOT EXISTS menu (
        menu_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DOUBLE NOT NULL
      )`,(err)=>{
      if(err)
      console.log(err);
    });

    connection.execute(`CREATE TABLE IF NOT EXISTS orders (
      order_id INT AUTO_INCREMENT PRIMARY KEY,
      menu_id INT NOT NULL,
      user_id INT NOT NULL,
      quantity INT NOT NULL,
      orderStatus VARCHAR(255) NOT NULL,
      FOREIGN KEY (menu_id) REFERENCES menu(menu_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`,(err)=>{
    if(err)
    console.log(err);
  });

  //creating default admin chef user
  let adminPassHash = bcrypt.hashSync ('admin@123', 8);
 connection.execute(`
  INSERT INTO users (username, email, password, role)
  SELECT * FROM (SELECT 'adminchef', 'admin@test.com', '${adminPassHash}', 'chef') AS tmp
  WHERE NOT EXISTS (
      SELECT username FROM users WHERE username = 'adminchef' AND email = 'admin@test.com'
  )
 `,(err)=>{
   if(err){
     console.log(err)
   }
 });


}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeDb();
});
