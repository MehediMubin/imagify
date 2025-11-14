import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
   const { token } = req.headers;

   if (!token) {
      return res.json({
         success: false,
         message: "No authentication token, authorization denied",
      });
   }

   try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
   } catch (error) {
      console.error("Authentication middleware error:", error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

export default userAuth;
