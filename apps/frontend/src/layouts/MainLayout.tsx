import type { ReactNode } from "react";

import { Flex } from "@radix-ui/themes";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

interface MainLayoutProps {
	children?: ReactNode;
}

export function Layout({ children }: MainLayoutProps) {
	return (
		<Flex direction={"column"} height={"100dvh"}>
			<div className="h-10 w-full grow-0">
				<Header />
			</div>
			<div className="flex h-full w-full grow flex-row">
				<div className="h-full w-1/3 border-r border-gray-900">
					<SideBar />
				</div>
				<div className="h-full w-full">{children}</div>
			</div>
		</Flex>
	);
}
