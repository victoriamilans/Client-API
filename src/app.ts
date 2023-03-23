import "express-async-errors";
import express, { Application } from "express";
import clientRoutes from "./routes/client.route";
import { handleErrors } from "./errors";
import loginRoute from "./routes/login.route";
import contactRoutes from "./routes/contact.route";

const app: Application = express();

app.use(express.json());

app.use("/client", clientRoutes);
app.use("/login", loginRoute);
app.use("/contact", contactRoutes);
app.use(handleErrors);

export default app;
