import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [showLogin, setShowLogin] = useState(false);
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [credit, setCredit] = useState(false);

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const loadCreditsData = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
            headers: {
               token,
            },
         });

         if (data.success) {
            setCredit(data.credits);
            setUser(data.user);
         }
      } catch (error) {
         console.error("Error fetching credit data:", error);
         toast.error("Failed to load credit data.");
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      setUser(null);
      setCredit(0);
      toast.success("Logged out successfully."); 
   }

   useEffect(() => {
      if (token) {
         loadCreditsData();
      }
   }, [token]);

   const value = {
      user,
      setUser,
      showLogin,
      setShowLogin,
      backendUrl,
      token,
      setToken,
      credit,
      setCredit,
      loadCreditsData,
      logout,
   };

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
