import axios from "axios";
import FormData from "form-data";
import UserModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
   try {
      const { id } = req.user;
      const { prompt } = req.body;
      const user = await UserModel.findById(id);

      if (!user || !prompt) {
         return res.json({
            success: false,
            message: "Invalid user or prompt",
         });
      }

      if (user.creditBalance === 0 || UserModel.creditBalance < 0) {
         return res.json({
            success: false,
            message: "Insufficient credits",
            creditBalance: user.creditBalance,
         });
      }

      const formData = new FormData();
      formData.append("prompt", prompt);

      const { data } = await axios.post(
         "https://clipdrop-api.co/text-to-image/v1",
         formData,
         {
            headers: {
               "x-api-key": process.env.CLIPDROP_API,
            },
            responseType: "arraybuffer",
         }
      );

      const base64Image = Buffer.from(data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;

      user.creditBalance -= 1;
      await user.save();

      res.json({
         success: true,
         message: "Image generated successfully",
         image: resultImage,
         creditBalance: user.creditBalance,
      });
   } catch (error) {
      console.error("Error generating image:", error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};
