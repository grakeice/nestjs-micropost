import { useContext, type JSX } from "react";

import { Navigate } from "react-router-dom";

import { PostList } from "@/components/PostList";
import { Layout } from "@/layouts/MainLayout";
import { PostListProvider } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

export default function MainPage(): JSX.Element {
	const { userInfo } = useContext(UserContext);
	const loggedIn = userInfo.token !== "";

	// console.log(loggedIn);

	return (
		<PostListProvider>
			{loggedIn ? (
				<Layout>
					<PostList />
				</Layout>
			) : (
				<Navigate replace to={"/"} />
			)}
		</PostListProvider>
	);
}
