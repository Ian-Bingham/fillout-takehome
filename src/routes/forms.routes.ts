import * as FormsController from "../controllers/forms.controllers";

const express = require("express");
const router = express.Router();

router.get("/:formId/filteredResponses", FormsController.getFilteredResponses);

export { router };
