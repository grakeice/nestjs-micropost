import type { JSX } from "react";

import { Field } from "@ark-ui/react";
import { fieldStyles } from "styled-system/recipes";

const fieldClass = fieldStyles();

export default function SignUp(): JSX.Element {
	return (
		<div>
			<Field.Root className={fieldClass.root}>
				<Field.Label className={fieldClass.label}>Label</Field.Label>
				<Field.Input />
				<Field.HelperText>Some additional Info</Field.HelperText>
				<Field.ErrorText>Error Info</Field.ErrorText>
			</Field.Root>
		</div>
	);
}
