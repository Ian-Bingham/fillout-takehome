import { Request, Response } from "express";
import * as FormsService from "../services/forms.service";
import { PathParams, QueryParams } from "../types";

export const getFilteredResponses = async (
	req: Request<PathParams, {}, {}, QueryParams>,
	res: Response
): Promise<void> => {
	const response = await FormsService.getFilteredResponses({
		formId: req.params.formId,
		query: req.query,
	});

	res.send(response);
};
