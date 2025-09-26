import { useContext, type JSX } from "react";

import { Navigate } from "react-router-dom";

import { Contents } from "@/components/Contents";
import { Layout } from "@/layouts/MainLayout";
import { PostListProvider } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

export default function Main(): JSX.Element {
	const { userInfo } = useContext(UserContext);
	const loggedIn = userInfo.token !== "";

	console.log(loggedIn);

	return (
		<PostListProvider>
			{loggedIn ? (
				<Layout>
					<Contents />
				</Layout>
			) : (
				<Navigate replace to={"/"} />
			)}
		</PostListProvider>
	);
}
