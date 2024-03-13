import { getComparableValue, compareValues } from "./compare.utils";

describe("compare.utils", () => {
	describe("getComparableValue", () => {
		it("returns the original value if it's a number", () => {
			const result = getComparableValue(5);

			expect(result).toEqual(5);
		});

		it("returns the original value if it's a regular string", () => {
			const result = getComparableValue("foo");

			expect(result).toEqual("foo");
		});

		it("returns a date object if it's a valid date string", () => {
			const result = getComparableValue("2024-03-13");
			const expected = new Date("2024-03-13");

			expect(result).toBeInstanceOf(Date);
			expect(result.getTime()).toBe(expected.getTime());
		});
	});

	describe("compareValues", () => {
		it("compares Date values correctly - equals", () => {
			const result = compareValues({
				value1: new Date("2024-03-13"),
				value2: new Date("2024-03-13"),
				operation: "equals",
			});

			expect(result).toEqual(true);
		});

		it("compares Date values correctly - does_not_equal", () => {
			const result = compareValues({
				value1: new Date("2024-03-13"),
				value2: new Date("2000-01-01"),
				operation: "does_not_equal",
			});

			expect(result).toEqual(true);
		});

		it("compares Date values correctly - greater_than", () => {
			const result = compareValues({
				value1: new Date("2024-03-13"),
				value2: new Date("2000-01-01"),
				operation: "greater_than",
			});

			expect(result).toEqual(true);
		});

		it("compares Date values correctly - less_than", () => {
			const result = compareValues({
				value1: new Date("2000-01-01"),
				value2: new Date("2024-03-13"),
				operation: "less_than",
			});

			expect(result).toEqual(true);
		});

		it("compares primitive values (string and number) correctly - equals", () => {
			const result = compareValues({
				value1: "foo",
				value2: "foo",
				operation: "equals",
			});

			expect(result).toEqual(true);
		});

		it("compares primitive values (string and number) correctly - does_not_equal", () => {
			const result = compareValues({
				value1: "foo",
				value2: "bar",
				operation: "does_not_equal",
			});

			expect(result).toEqual(true);
		});

		it("compares primitive values (string and number) correctly - greater_than", () => {
			const result = compareValues({
				value1: "z",
				value2: "a",
				operation: "greater_than",
			});

			expect(result).toEqual(true);
		});

		it("compares primitive values (string and number) correctly - less_than", () => {
			const result = compareValues({
				value1: "a",
				value2: "z",
				operation: "less_than",
			});

			expect(result).toEqual(true);
		});
	});
});
