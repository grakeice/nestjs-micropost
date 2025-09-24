import { fieldAnatomy } from "@ark-ui/react";
import { defineSlotRecipe } from "@pandacss/dev";

export const fieldStyles = defineSlotRecipe({
	slots: fieldAnatomy.keys(),
	className: "field",
	base: {
		label: {
			fontSize: "2xl",
			color: "amber.400",
		},
	},
});
