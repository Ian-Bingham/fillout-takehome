import { ParsedQs } from "qs";
import * as FilloutClient from "../client/fillout.client";

export const getFilteredResponses = async ({
	formId,
	query,
}: {
	formId: string;
	query: ParsedQs;
}) => {
	return FilloutClient.getResponses({ formId, query });
};
