import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
   const [state, setState] = useState("Sign In");
   const { setShowLogin } = useContext(AppContext);

   useEffect(() => {
      // Disable scrolling when the login form is open
      document.body.style.overflow = "hidden";
      return () => {
         // Re-enable scrolling when the login form is closed
         document.body.style.overflow = "auto";
      };
   }, []);

   return (
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
         <form className="relative bg-white p-10 rounded-xl text-slate-500">
            <h1 className="text-center text-2xl text-neutral-700 font-medium">
               {state}
            </h1>
            <p className="text-sm">
               Welcome back! Please{" "}
               {state === "Sign Up" ? "sign up" : "sign in"} to continue
            </p>

            {state === "Sign Up" && (
               <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                  <img src={assets.user_icon} alt="" />
                  <input
                     className="outline-none text-sm"
                     type="text"
                     placeholder="Full Name"
                     required
                  />
               </div>
            )}
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
               <img src={assets.email_icon} alt="" />
               <input
                  className="outline-none text-sm"
                  type="email"
                  placeholder="Email Address"
                  required
               />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
               <img src={assets.lock_icon} alt="" />
               <input
                  className="outline-none text-sm"
                  type="password"
                  placeholder="Password"
                  required
               />
            </div>

            <p className="text-sm text-blue-600 my-4 cursor-pointer">
               Forgot password?
            </p>
            <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer">
               {state === "Sign Up" ? "Create Account" : "Sign In"}
            </button>

            {state === "Sign Up" ? (
               <p className="mt-5 text-center">
                  Already have an account?{" "}
                  <span
                     onClick={() => setState("Sign In")}
                     className="text-blue-600 cursor-pointer"
                  >
                     Sign in
                  </span>
               </p>
            ) : (
               <p className="mt-5 text-center">
                  Don't have an account?{" "}
                  <span
                     onClick={() => setState("Sign Up")}
                     className="text-blue-600 cursor-pointer"
                  >
                     Sign up
                  </span>
               </p>
            )}

            <img
               onClick={() => setShowLogin(false)}
               src={assets.cross_icon}
               alt=""
               className="absolute top-5 right-5 cursor-pointer"
            />
         </form>
      </div>
   );
};

export default Login;
