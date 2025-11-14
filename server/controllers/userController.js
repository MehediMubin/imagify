import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.json({
            success: false,
            message: "Please provide all required fields",
         });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
         name,
         email,
         password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      rse.json({
         success: true,
         token,
         user: {
            name: newUser.name,
         },
      });
   } catch (error) {
      console.error("Error registering user:", error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};
