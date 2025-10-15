import type { ReactNode } from "react";

import { Container, Flex } from "@radix-ui/themes";

import { Header } from "@/components/Header";

interface MainLayoutProps {
	children?: ReactNode;
}

export function Layout({ children }: MainLayoutProps) {
	return (
		<Flex direction={"column"} height={"100dvh"} overflow={"hidden"}>
			<div className="grow-0">
				<Header />
			</div>
			<Container width={"100%"} height={"calc(100dvh - 4rem)"}>
				{children}
			</Container>
		</Flex>
	);
}
