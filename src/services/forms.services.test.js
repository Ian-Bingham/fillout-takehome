import { filterResponses, getFilteredResponses } from "./forms.service";

import * as FilloutClient from "../client/fillout.client";

jest.mock("../client/fillout.client", () => ({
	getFormResponses: jest.fn(),
}));

describe("forms.service", () => {
	describe("getFilteredResponses", () => {
		it("returns the Fillout response if there are no filters", async () => {
			const FilloutResponse = {
				responses: [
					{
						questions: [
							{
								id: 1,
								name: "name",
								type: "type",
								value: "foo",
							},
						],
					},
				],
				totalResponses: 1,
				pageCount: 1,
			};

			FilloutClient.getFormResponses.mockReturnValueOnce(FilloutResponse);

			const result = await getFilteredResponses({ formId: 1, query: {} });

			expect(result).toEqual(FilloutResponse);
		});

		it("returns the filtered responses", async () => {
			const FilloutResponse = {
				responses: [
					{
						questions: [
							{
								id: 1,
								name: "name",
								type: "type",
								value: "foo",
							},
						],
					},
					{
						questions: [
							{
								id: 1,
								name: "name2",
								type: "type2",
								value: "bar",
							},
						],
					},
				],
				totalResponses: 1,
				pageCount: 1,
			};

			FilloutClient.getFormResponses.mockReturnValueOnce(FilloutResponse);

			const result = await getFilteredResponses({
				formId: 1,
				query: {
					filters: JSON.stringify([
						{
							id: 1,
							value: "bar",
							condition: "equals",
						},
					]),
				},
			});

			expect(result).toEqual({
				responses: [
					{
						questions: [
							{
								id: 1,
								name: "name2",
								type: "type2",
								value: "bar",
							},
						],
					},
				],
				totalResponses: 1,
				pageCount: 1,
			});
		});
	});

	describe("filterResponses", () => {
		it("returns true for a response with a single filter", () => {
			const response = {
				questions: [
					{
						id: 1,
						name: "name",
						type: "type",
						value: "foo",
					},
					{
						id: 2,
						name: "name2",
						type: "type2",
						value: "foo2",
					},
				],
			};

			const filtersMap = {
				2: {
					id: 2,
					value: "foo2",
					condition: "equals",
				},
			};

			const result = filterResponses({ response, filtersMap });

			expect(result).toEqual(true);
		});

		it("returns true for a response with multiple filters", () => {
			const response = {
				questions: [
					{
						id: 1,
						name: "name",
						type: "type",
						value: "foo",
					},
					{
						id: 2,
						name: "name2",
						type: "type2",
						value: "foo2",
					},
				],
			};

			const filtersMap = {
				1: {
					id: 1,
					value: "foo",
					condition: "equals",
				},
				2: {
					id: 2,
					value: "foo2",
					condition: "equals",
				},
			};

			const result = filterResponses({ response, filtersMap });

			expect(result).toEqual(true);
		});

		it("returns false for a response with a single filter", () => {
			const response = {
				questions: [
					{
						id: 1,
						name: "name",
						type: "type",
						value: "foo",
					},
				],
			};

			const filtersMap = {
				1: {
					id: 1,
					value: "bar",
					condition: "equals",
				},
			};

			const result = filterResponses({ response, filtersMap });

			expect(result).toEqual(false);
		});

		it("returns false for a response if at least one filter does not pass", () => {
			const response = {
				questions: [
					{
						id: 1,
						name: "name",
						type: "type",
						value: "foo",
					},
					{
						id: 2,
						name: "name2",
						type: "type2",
						value: "foo2",
					},
				],
			};

			const filtersMap = {
				1: {
					id: 1,
					value: "foo",
					condition: "equals",
				},
				2: {
					id: 2,
					value: "bar",
					condition: "equals",
				},
			};

			const result = filterResponses({ response, filtersMap });

			expect(result).toEqual(false);
		});
	});
});
