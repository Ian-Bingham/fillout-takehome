import * as FilloutClient from "../client/fillout.client";
import {
	Filter,
	FilterMap,
	FormResponse,
	FilloutFormSubmission,
	QueryParams,
} from "../types";

export const getFilteredResponses = async ({
	formId,
	query,
}: {
	formId: string;
	query: QueryParams;
}): Promise<FilloutFormSubmission> => {
	const data = await FilloutClient.getSubmissions({ formId, query });

	if (!query.filters) {
		return data;
	}

	const { responses }: { responses: FormResponse[] } = data;

	const filters = JSON.parse(query.filters as string) as Filter[];
	const filtersMap = filters.reduce((acc: FilterMap, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});

	const filteredResponses = responses.filter((response) =>
		filterResponses({ response, filtersMap })
	);

	return {
		responses: filteredResponses,
		totalResponses: filteredResponses.length,
		pageCount: query.limit
			? Math.ceil(filteredResponses.length / query.limit)
			: 1,
	};
};

const filterResponses = ({
	response,
	filtersMap,
}: {
	response: FormResponse;
	filtersMap: FilterMap;
}): boolean => {
	for (const question of response.questions) {
		const filter = filtersMap[question.id];

		if (!filter) {
			continue;
		}

		switch (filter.condition) {
			case "equals": {
				if (question.value !== filter.value) {
					return false;
				}

				break;
			}

			case "does_not_equal": {
				if (question.value === filter.value) {
					return false;
				}

				break;
			}

			case "greater_than": {
				if (question.value <= filter.value) {
					return false;
				}

				break;
			}

			case "less_than": {
				if (question.value >= filter.value) {
					return false;
				}

				break;
			}

			default: {
				break;
			}
		}
	}

	return true;
};
