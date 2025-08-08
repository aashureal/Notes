import mongoose from "mongoose";

export const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected To Database");
    })
    .catch((err) => {
      console.log(err);
    });
};
