import { NextFunction, Request, Response } from "express";
import * as FormRoutes from "./src/routes/forms.routes";

require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

app.use("/v1/api/forms", FormRoutes.router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error("error: ", err.stack);
	res
		.status(res.statusCode || 500)
		.json({ message: err.message, stack: err.stack });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
