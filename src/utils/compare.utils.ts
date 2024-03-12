import { FilterConditions } from "../types";
import { isDateValid } from "./date.utils";

export const getComparableValue = (value: number | string) => {
	if (typeof value === "string") {
		if (isDateValid(value)) {
			return new Date(value);
		}
	}

	return value;
};

export const compareValues = ({
	value1,
	value2,
	operation,
}: {
	value1: number | string | Date;
	value2: number | string | Date;
	operation: FilterConditions;
}): boolean => {
	if (value1 instanceof Date && value2 instanceof Date) {
		switch (operation) {
			case "equals":
				return value1.getTime() === value2.getTime();
			case "does_not_equal":
				return value1.getTime() !== value2.getTime();
			case "greater_than":
				return value1.getTime() > value2.getTime();
			case "less_than":
				return value1.getTime() < value2.getTime();
			default:
				return false;
		}
	}

	switch (operation) {
		case "equals":
			return value1 === value2;
		case "does_not_equal":
			return value1 !== value2;
		case "greater_than":
			return value1 > value2;
		case "less_than":
			return value1 < value2;
		default:
			return false;
	}
};
