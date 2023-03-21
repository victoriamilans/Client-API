import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleError } from "./errors";

const app = express();

app.use(express.json());

app.use(handleError);

export default app;
