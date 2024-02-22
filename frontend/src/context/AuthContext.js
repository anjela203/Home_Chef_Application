// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import UserServices from '../services/user.services';
import { getErrorMessage } from '../utils/getError';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('HomeChefUser')));

  const login = async (userData) => {
    try{
        let response = await UserServices.loginUser(userData);
        if(response.status===200){
            setUser(response.data);
            localStorage.setItem('HomeChefUser',JSON.stringify(response.data))
            toast.success("Logged in Successfully!");
        }
       
    }catch(err){
        console.log(err);
        toast.error(getErrorMessage(err));
    }
    
  };

  const logout = () => {
    localStorage.removeItem('HomeChefUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
