import type { Request, Response } from "express";
import express from "express";
import router from "./routes/route.js";

const app = express();

app.use(express.json());

app.use("/users", router);
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" });
});

export default app;
