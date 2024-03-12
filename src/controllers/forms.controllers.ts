import { Request, Response } from "express";
import * as FormsService from "../services/forms.service";

export const getFilteredResponses = async (req: Request, res: Response) => {
	const response = await FormsService.getFilteredResponses({
		formId: req.params.formId,
		query: req.query,
	});

	res.send(response);
};
