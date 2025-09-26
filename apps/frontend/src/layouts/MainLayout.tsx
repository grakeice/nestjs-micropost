import type { ReactNode } from "react";

import { Container, Flex, Separator } from "@radix-ui/themes";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

interface MainLayoutProps {
	children?: ReactNode;
}

export function Layout({ children }: MainLayoutProps) {
	return (
		<Flex direction={"column"} height={"100dvh"}>
			<div className="grow-0">
				<Header />
			</div>
			<Container height={"100%"} width={"100%"}>
				<Flex height={"100%"} width={"100%"} p={"4"}>
					<div className="h-full w-1/3 border-gray-900">
						<SideBar />
					</div>
					<Separator size={"4"} orientation={"vertical"} />
					<div className="h-full w-full">{children}</div>
				</Flex>
			</Container>
		</Flex>
	);
}
