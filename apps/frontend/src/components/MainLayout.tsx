import type { JSX } from "react";

import { styled } from "styled-system/jsx";

import { Contents } from "./Contents";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

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
		border: "2px solid red",
	},
});

const SBody = styled("div", {
	base: {
		width: "full",
		height: "calc(100vh - 32px)",
		border: "2px solid green",
		display: "flex",
		flexDir: "row",
	},
});

const SSideBar = styled("div", {
	base: {
		border: "2px solid blue",
		width: "1/3",
		height: "full",
	},
});

const SContents = styled("div", {
	base: {
		border: "2px solid #FF00FF",
		width: "full",
		height: "full",
	},
});
