import * as FilloutClient from "../client/fillout.client";
import {
	Filter,
	FilterMap,
	FormResponse,
	FilloutFormSubmission,
	QueryParams,
} from "../types";
import { compareValues, getComparableValue } from "../utils/compare.utils";

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

	const filters = JSON.parse(query.filters as string) as Filter[];
	const filtersMap = filters.reduce((acc: FilterMap, curr) => {
		acc[curr.id] = curr;
		return acc;
	}, {});

	const filteredResponses = data.responses.filter((response) =>
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

		const questionValue = getComparableValue(question.value);
		const filterValue = getComparableValue(filter.value);

		const comparison = compareValues({
			value1: questionValue,
			value2: filterValue,
			operation: filter.condition,
		});

		if (!comparison) {
			return false;
		}
	}

	return true;
};
