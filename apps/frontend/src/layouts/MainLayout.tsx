import type { JSX, ReactNode } from "react";

import { Container } from "@radix-ui/themes";

import { Header } from "@/components/Header";

interface AuthLayoutProps {
	children?: ReactNode;
}

export function Layout({ children }: AuthLayoutProps): JSX.Element {
	return (
		<>
			<Header />
			<Container>{children}</Container>
		</>
	);
}
