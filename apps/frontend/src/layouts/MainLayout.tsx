import type { JSX } from "react";

import { styled } from "styled-system/jsx";

import { Contents } from "@/components/Contents";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

export function Layout(): JSX.Element {
	return (
		<>
			<SHeader>
				<Header></Header>
			</SHeader>
			<SBody>
				<SSideBar>
					<SideBar></SideBar>
				</SSideBar>
				<SContents>
					<Contents></Contents>
				</SContents>
			</SBody>
		</>
	);
}

const SHeader = styled("div", {
	base: {
		width: "full",
		height: "32px",
		boxShadow: "0px 4px 4px #aaa",
	},
});

const SBody = styled("div", {
	base: {
		width: "full",
		height: "calc(100vh - 32px)",
		display: "flex",
		flexDir: "row",
	},
});

const SSideBar = styled("div", {
	base: {
		borderRight: "1px solid #222",
		width: "1/3",
		height: "full",
	},
});

const SContents = styled("div", {
	base: {
		width: "full",
		height: "full",
	},
});
