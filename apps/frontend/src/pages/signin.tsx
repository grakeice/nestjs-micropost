import type { JSX } from "react";

import { SignIn as SignInComponent } from "@/components/SignIn";
import { AuthLayout } from "@/layouts/AuthLayout";

export default function SignIn(): JSX.Element {
	return (
		<AuthLayout>
			<SignInComponent />
		</AuthLayout>
	);
}
