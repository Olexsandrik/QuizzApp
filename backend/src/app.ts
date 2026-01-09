import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./routes/route.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/users", router);
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" });
});

export default app;
