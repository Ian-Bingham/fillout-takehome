import * as FilloutClient from "../client/fillout.client";
import {
	Filter,
	FilterMap,
	FormResponse,
	FilteredFormResponses,
	QueryParams,
} from "../types";
import { compareValues, getComparableValue } from "../utils/compare.utils";

export const getFilteredResponses = async ({
	formId,
	query,
}: {
	formId: string;
	query: QueryParams;
}): Promise<FilteredFormResponses> => {
	const data = await FilloutClient.getFormResponses({ formId, query });

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
		pageCount: Math.ceil(filteredResponses.length / (query.limit || 1)),
	};
};

export const filterResponses = ({
	response,
	filtersMap,
}: {
	response: FormResponse;
	filtersMap: FilterMap;
}): boolean => {
	// Check if there is at least one question id that matches a filter id.
	// If not, the FormResponse does not pass the filter.
	const questionIds = response.questions.map((question) => question.id);
	const filterIds = Object.keys(filtersMap);
	const hasValidFilterId = filterIds.some((filterId) =>
		questionIds.includes(filterId)
	);

	if (!hasValidFilterId) {
		return false;
	}

	// If the filter is applicable, loop through questions to compare its value against the filter
	for (const question of response.questions) {
		const filter = filtersMap[question.id];

		// Continue to the next question if the filter is not applicable to the current question
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

		// If the question does not pass the filter immediately return false for this FormResponse
		if (!comparison) {
			return false;
		}

		// Else, if it does pass the filter we continue to checking the next question since ALL filters must pass
	}

	// The FormResponse passes the filter once all questions are compared against all filters
	return true;
};
