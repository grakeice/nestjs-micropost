import type { JSX } from "react";

import { Field } from "@ark-ui/react";
import { fieldStyles } from "styled-system/recipes";

interface InputProps {
	labelText?: string;
	helperText?: string;
	errorText?: string;
}

export function Input({ ...props }: InputProps): JSX.Element {
	const { labelText, helperText, errorText } = props;
	const fieldClass = fieldStyles();

	return (
		<Field.Root className={fieldClass.root}>
			{labelText ?? (
				<Field.Label className={fieldClass.label}>
					{labelText}
				</Field.Label>
			)}
			<Field.Input className={fieldClass.input} />
			{helperText ?? (
				<Field.HelperText className={fieldClass.helperText}>
					{helperText}
				</Field.HelperText>
			)}
			{errorText ?? (
				<Field.ErrorText className={fieldClass.errorText}>
					{errorText}
				</Field.ErrorText>
			)}
		</Field.Root>
	);
}
