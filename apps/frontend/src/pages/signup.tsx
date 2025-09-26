import type { JSX } from "react";

import { Field } from "@ark-ui/react";
import { Container, VStack } from "styled-system/jsx";
import { fieldStyles } from "styled-system/recipes";

export default function SignUp(): JSX.Element {
	const fieldClass = fieldStyles();
	return (
		<Container>
			<VStack>
				<Field.Root className={fieldClass.root}>
					<Field.Label className={fieldClass.label}>
						ユーザー名
					</Field.Label>
					<Field.Input className={fieldClass.input} />
				</Field.Root>
				<Field.Root className={fieldClass.root}>
					<Field.Label className={fieldClass.label}>
						email
					</Field.Label>
					<Field.Input className={fieldClass.input} />
				</Field.Root>
				<Field.Root className={fieldClass.root}>
					<Field.Label className={fieldClass.label}>
						パスワード
					</Field.Label>
					<Field.Input className={fieldClass.input} />
				</Field.Root>
			</VStack>
		</Container>
	);
}
