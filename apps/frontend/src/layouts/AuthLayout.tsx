import type { JSX, ReactNode } from "react";

interface AuthLayoutProps {
	children?: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
	return <div>{children}</div>;
}
