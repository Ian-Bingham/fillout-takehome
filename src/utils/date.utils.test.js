import { isDateValid } from "./date.utils";

describe("date.utils", () => {
	describe("isDateValid", () => {
		it("returns true for a valid date string", () => {
			const result1 = isDateValid("2024-03-13");

			expect(result1).toEqual(true);
		});

		it("returns false for an invalid date string", () => {
			const result1 = isDateValid("foo");

			expect(result1).toEqual(false);
		});
	});
});
