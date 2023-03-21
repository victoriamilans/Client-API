import "express-async-errors";
import express, { Application } from "express";
import clientRoutes from "./routes/client.route";
import { handleErrors } from "./errors";

const app: Application = express();

app.use(express.json());

app.use("/client", clientRoutes);
app.use(handleErrors);

export default app;
