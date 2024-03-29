interface BaseFormQuestion {
	id: string;
	value: number | string;
}

export interface FormQuestion extends BaseFormQuestion {
	name: string;
	type: string;
}

// for the purpose of this exercise our business logic is only concerned with response.questions
// so I've opted out of fully typing the strucuture of a Fillout Response object
export interface FormResponse {
	questions: FormQuestion[];
	[key: string]: any;
}

export interface FilloutFormResponses {
	responses: FormResponse[];
	totalResponses: number;
	pageCount: number;
}

export interface FilteredFormResponses extends FilloutFormResponses {}

export type FilterConditions =
	| "equals"
	| "does_not_equal"
	| "greater_than"
	| "less_than";

export interface Filter extends BaseFormQuestion {
	condition: FilterConditions;
}

export interface FilterMap {
	[filterId: string]: Filter;
}

export interface FilloutQueryParams {
	limit?: number;
	afterDate?: string;
	beforeDate?: string;
	offset?: number;
	status?: "in_progress" | "finished";
	includeEditLink?: boolean;
	sort?: "asc" | "desc";
}

export interface QueryParams extends FilloutQueryParams {
	filters?: string;
}

export interface PathParams {
	formId: string;
}
