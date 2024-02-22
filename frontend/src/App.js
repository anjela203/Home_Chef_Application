// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import ViewMenu from './pages/ViewMenu';
import Payment from './pages/PaymentPage';
import Contact from './pages/Contact';
import About from './pages/About';



const isAuthenticated = () => {
  let isToken = false;
  let user = JSON.parse(localStorage.getItem('HomeChefUser'));
  isToken = user && user.token;

  return isToken;
};

const isChef = () => {
  let isChef = false;
  let user = JSON.parse(localStorage.getItem('HomeChefUser'));
  isChef = user && user.token && user.role==="chef";

  return isChef;
};



export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


export const ChefRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isChef()  ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/menu/:id" component={ViewMenu} />
          <Route path="/menu" component={MenuPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/payment/:id" component={Payment} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
         
          {/* Add other routes here */}
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
