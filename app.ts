import * as FormRoutes from "./src/routes/forms.routes";

require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

app.use("/v1/api/forms", FormRoutes.router);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
