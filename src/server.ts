import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/mongoDb";
import app from "./config/app";

dotenv.config();


const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

startServer();
