import type { ReactNode } from "react";

import { Container, Flex, Separator } from "@radix-ui/themes";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

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
				<Flex width={"100%"} height={"100%"} p={"2"}>
					<div className="h-full w-1/3 border-gray-900">
						<SideBar />
					</div>
					<Separator size={"4"} orientation={"vertical"} />
					<div className="h-full max-h-full w-full">{children}</div>
				</Flex>
			</Container>
		</Flex>
	);
}
