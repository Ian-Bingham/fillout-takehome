import axios from "axios";
import { ParsedQs } from "qs";

const axiosInstance = axios.create({
	baseURL: "https://api.fillout.com",
});

const FORMS_ENDPOINT = "/v1/api/forms";

export const getResponses = async ({
	formId,
	query,
}: {
	formId: string;
	query: ParsedQs;
}) => {
	const { data } = await axiosInstance.get(
		`${FORMS_ENDPOINT}/${formId}/submissions`,
		{
			headers: { Authorization: `Bearer ${process.env.FILLOUT_API_KEY}` },
			params: query,
		}
	);

	return data;
};
