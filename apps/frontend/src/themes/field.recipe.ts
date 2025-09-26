import { fieldAnatomy } from "@ark-ui/react";
import { defineSlotRecipe } from "@pandacss/dev";

export const fieldStyles = defineSlotRecipe({
	slots: fieldAnatomy.keys(),
	className: "field",
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "2",
			p: "4",
			background: "white",
			w: "sm",
		},
		label: {
			fontSize: "md",
			color: "black",
			fontWeight: "normal",
		},
		input: {
			px: "3",
			py: "2",
			borderWidth: 1,
			borderColor: "gray.300",
			borderRadius: "md",
			fontSize: "md",
			outline: 0,
			_focus: {
				borderColor: "amber.400",
				boxShadow: "0 0 0 1px var(--colors-amber-400)",
			},
			transition: "all 0.2s",
		},
		helperText: {
			color: "gray.500",
			fontSize: "sm",
			mt: "1",
		},
		errorText: {
			color: "red.500",
			fontSize: "sm",
			mt: "1",
			fontWeight: "semibold",
		},
	},

});
