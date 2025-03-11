import express, { Application, RequestHandler } from "express";
import cors from "cors";
import router from "./router";
import notFound from "./middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api/v1", router);
app.use(notFound);

export default app;
