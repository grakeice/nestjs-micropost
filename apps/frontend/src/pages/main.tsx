import { useContext, useState, type JSX } from "react";

import { Flex, Separator } from "@radix-ui/themes";
import { Navigate } from "react-router-dom";

import { PostList } from "@/components/PostList";
import { SideBar } from "@/components/SideBar";
import { Layout } from "@/layouts/PostLayout";
import { PostListProvider } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";

export default function MainPage(): JSX.Element {
	const { userInfo } = useContext(UserContext);
	const loggedIn = userInfo.token !== "";
	const [page, setPage] = useState(1);

	// console.log(loggedIn);

	return (
		<PostListProvider>
			{loggedIn ? (
				<Layout>
					<Flex width={"100%"} height={"100%"} p={"2"}>
						<div className="h-full w-1/3 border-gray-900">
							<SideBar page={page} setPage={setPage} />
						</div>
						<Separator size={"4"} orientation={"vertical"} />
						<div className="h-full max-h-full w-full">
							<PostList page={page} setPage={setPage} />
						</div>
					</Flex>
				</Layout>
			) : (
				<Navigate replace to={"/"} />
			)}
		</PostListProvider>
	);
}
