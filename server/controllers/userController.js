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

      res.json({
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

const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.json({
            success: false,
            message: "Please provide all required fields",
         });
      }

      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
         return res.json({
            success: false,
            message: "Invalid email or password",
         });
      }

      const isPasswordCorrect = await bcrypt.compare(
         password,
         existingUser.password
      );
      if (!isPasswordCorrect) {
         return res.json({
            success: false,
            message: "Invalid email or password",
         });
      }

      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

      res.json({
         success: true,
         token,
         user: {
            name: existingUser.name,
         },
      });
   } catch (error) {
      console.error("Error logging in user:", error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

const userCredits = async (req, res) => {
   try {
      const { userId } = req.user;

      const user = await UserModel.findById(userId);
      if (!user) {
         return res.json({
            success: false,
            message: "User not found",
         });
      }

      res.json({
         success: true,
         creditBalance: user.creditBalance,
         user: {
            name: user.name,
         },
      });
   } catch (error) {
      console.error("Error fetching user credits:", error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

export { loginUser, registerUser, userCredits };
  