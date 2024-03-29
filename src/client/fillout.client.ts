import axios, { AxiosResponse } from "axios";
import {
	FilloutFormResponses,
	FilloutQueryParams,
	QueryParams,
} from "../types";

const axiosInstance = axios.create({
	baseURL: "https://api.fillout.com",
});

const FORMS_ENDPOINT = "/v1/api/forms";

export const getFormResponses = async ({
	formId,
	query,
}: {
	formId: string;
	query: QueryParams;
}): Promise<FilloutFormResponses> => {
	const filloutQueryParams: FilloutQueryParams = {
		limit: query.limit,
		afterDate: query.afterDate,
		beforeDate: query.beforeDate,
		offset: query.offset,
		status: query.status,
		includeEditLink: query.includeEditLink,
		sort: query.sort,
	};

	const response: AxiosResponse<FilloutFormResponses> = await axiosInstance.get(
		`${FORMS_ENDPOINT}/${formId}/submissions`,
		{
			headers: { Authorization: `Bearer ${process.env.FILLOUT_API_KEY}` },
			params: filloutQueryParams,
		}
	);

	return response.data;
};
